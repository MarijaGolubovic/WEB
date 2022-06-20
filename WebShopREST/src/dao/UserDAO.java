package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import beans.Dues;
import beans.SportsFacility;
import beans.TrainingHistory;
import beans.User;
import beans.User.CustumerType;
import beans.User.Gender;
import beans.User.Role;

/***
 * <p>Klasa namenjena da uèita korisnike iz fajla i pruža operacije nad njima (poput pretrage).
 * Korisnici se nalaze u fajlu WebContent/users.txt u obliku: <br>
 * firstName;lastName;email;username;password</p>
 * <p><b>NAPOMENA:</b> Lozinke se u praksi <b>nikada</b> ne snimaju u èistu tekstualnom obliku.</p>
 * @author Lazar
 *
 */
public class UserDAO {
	private Map<String, User> users = new HashMap<>();
	
	
	public UserDAO() {
		
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Može se pristupiti samo iz servleta.
	 */
	public UserDAO(String contextPath) {
		loadUsers(contextPath);
	}
	
	/**
	 * Vraæa korisnika za prosleðeno korisnièko ime i šifru. Vraæa null ako korisnik ne postoji
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
	
	
	public User save(User user) {
		users.put(user.getUsername(), user);
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
	
	/**
	 * private String username;
	private String password;
	private String firstName;
	private String lastName;
	private Gender gender;
	private LocalDateTime birthDate;
	private TrainingHistory trainingHistory;
	private Role role;
	private Dues dues;//clanarina
	private SportsFacility sportsFacility;
	private SportsFacility visistedFacolity;
	private double collectedPoints;
	private CustumerType customerType;
	 * Uèitava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #users}.
	 * Kljuè je korisnièko ime korisnika.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void loadUsers(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/users.txt");
			in = new BufferedReader(new FileReader(file));
			String line, username="",password="", firstName="", lastName="";
			Gender gender;
			LocalDateTime birthDate;
			//TrainingHistory trainingHistory;
			Role role;
			//Dues dues;
			//SportsFacility sportsFacility;
			StringTokenizer st;
			//SportsFacility visistedFacolity;
			double collectedPoints=0;
			CustumerType customerType;
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
					 gender = Enum.valueOf(Gender.class,st.nextToken().trim());
					 birthDate = LocalDateTime.parse(st.nextToken().trim());
					 role = Enum.valueOf(Role.class,st.nextToken().trim());
					 collectedPoints = Double.parseDouble(st.nextToken().trim());
					 customerType = Enum.valueOf(CustumerType.class,st.nextToken().trim());
					users.put(username, new User(username, password, firstName, lastName, gender, birthDate, null, role, null, null, null, collectedPoints, customerType));
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
