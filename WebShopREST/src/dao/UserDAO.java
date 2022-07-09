package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.ObjectOutputStream;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import beans.SportsFacility;
import beans.User;
import beans.SportsFacility.Content;
import beans.User.CustumerType;
import beans.User.Gender;
import beans.User.Role;
import dto.UserDTO;

/***
 * <p>Klasa namenjena da u�ita korisnike iz fajla i pru�a operacije nad njima (poput pretrage).
 * Korisnici se nalaze u fajlu WebContent/users.txt u obliku: <br>
 * firstName;lastName;email;username;password</p>
 * <p><b>NAPOMENA:</b> Lozinke se u praksi <b>nikada</b> ne snimaju u �istu tekstualnom obliku.</p>
 * @author Lazar
 *
 */
public class UserDAO {
	private Map<String, User> users = new HashMap<>();
	public HashMap<String, SportsFacility> facilities = new HashMap<String, SportsFacility>();
	
	
	public UserDAO() {
		
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public UserDAO(String contextPath) {
		loadUsers(contextPath);
	}
	
	/**
	 * Vra�a korisnika za prosle�eno korisni�ko ime i �ifru. Vra�a null ako korisnik ne postoji
	 * @param username
	 * @param password
	 * @return
	 */
	public User find(String username, String password) {
		if (!users.containsKey(username)) {
			return null;
		}
		User user = users.get(username);
		if (!user.getPassword().equals(password)) {
			return null;
		}
		return user;
	}
	
	public User findByUsername(String username) {
		if (!users.containsKey(username)) {
			return null;
		}
		User user = users.get(username);
		return user;
	}
	
	
	public Collection<User> findAll() {
		return users.values();
	}
	
	
	
	public List<User> getTrainers(){
		List<User> trainers = new ArrayList<>();
		List<User> usersAll = new ArrayList<User>(users.values());
		for (int i=0; i<usersAll.size();i++) {
			if (usersAll.get(i).getRole().equals(Role.TRAINER)) {
				trainers.add(usersAll.get(i));
			}
		}
		return trainers;	
	}
	
	public boolean postojiKorisnickoIme(String korisnickoIme) {
		return users.containsKey(korisnickoIme);
	}
	
	public User save(User user) {
		users.put(user.getUsername(), user);
		return user;
	}
	
	public UserDTO save(UserDTO user) {
		users.put(user.username, new User(user.username, user.password, user.firstName, user.lastName, user.gender, user.birthDate, null, Role.CUSTUMER, null, null, null, 0, CustumerType.BRONZE, false));
		return user;
	}
	
	public UserDTO saveMenager(UserDTO user) {
		SportsFacility sportFacylity= new SportsFacility();
		users.put(user.username, new User(user.username, user.password, user.firstName, user.lastName, user.gender, user.birthDate, null, Role.MENAGER, null,null, null, -1, CustumerType.GOLD, false));
		return user;
	}
	
	
	public User update(String username, User user) {
		User userToUpdate = this.findByUsername(username);
		if( userToUpdate== null) {
			return this.save(userToUpdate);
		}
		return userToUpdate;
	}
	
	public void delete(String username) {
		this.users.remove(username);
	}
	
	public List<User> nadjiSlobodneMenadzere() {
		List<User> ret = new ArrayList<User>();
		for(User korisnik : users.values()) {
			String username = korisnik.getUsername();
			
			if(korisnik.getRole().equals(Role.MENAGER) && korisnik.getSportsFacility() == null) {
				ret.add(korisnik);
			}
		}
		System.out.println(ret.size());
		return ret;
	}
	
	
	
	private void loadUsers(String contextPath) {
		BufferedReader in = null;
		SportsFacilityDAO sportsFacilityDAO = new SportsFacilityDAO(contextPath);
		try {
			File file = new File(contextPath + "/users.txt");
			in = new BufferedReader(new FileReader(file));
			String line, username="",password="", firstName="", lastName="", facilityMenager="";
			Gender gender;
			Date birthDate;
			//TrainingHistory trainingHistory;
			Role role;
			//Dues dues;
			//SportsFacility sportsFacility;
			StringTokenizer st;
			//SportsFacility visistedFacolity;
			double collectedPoints=0;
			CustumerType customerType;
			boolean logickiObrisan = false;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					 username = st.nextToken().trim();
					 password = st.nextToken().trim();
					 firstName = st.nextToken().trim();
					 lastName = st.nextToken().trim();
					 gender=Gender.valueOf(st.nextToken().trim());
					 birthDate = new java.sql.Date(
		                     ((java.util.Date) new SimpleDateFormat("dd.MM.yyyy.").parse(st.nextToken().trim())).getTime());
					 role=Role.valueOf(st.nextToken().trim());
					 collectedPoints = Double.parseDouble(st.nextToken().trim());
					 customerType=CustumerType.valueOf(st.nextToken().trim());
					 facilityMenager=st.nextToken().trim();
					 logickiObrisan = Boolean.parseBoolean(st.nextToken().trim());
					 
					 if (role.equals(Role.MENAGER)) {
						 SportsFacility sf= sportsFacilityDAO.findFacilitiy(facilityMenager);
						 users.put(username, new User(username, password, firstName, lastName, gender, birthDate, null, role, null, sf, null, collectedPoints, customerType,logickiObrisan));
					 } else {
						 users.put(username, new User(username, password, firstName, lastName, gender, birthDate, null, role, null, null, null, collectedPoints, customerType,logickiObrisan));
					 }
					
				}
				
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				}
				catch (Exception e) { }
			}
		}
	}
	
}
