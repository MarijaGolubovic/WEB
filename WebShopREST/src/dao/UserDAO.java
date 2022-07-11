package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import beans.SportsFacility;
import beans.Training;
import beans.User;
import beans.SportsFacility.Content;
import beans.Training.TrainingType;
import beans.User.CustumerType;
import beans.User.Gender;
import beans.User.Role;
import dto.NewUserDTO;
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
	private ArrayList<User> sviKorisnici;
	String contextPath; 
	private String pathToRepository;
	
	
	
	public UserDAO() {
		
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public UserDAO(String contextPath, SportsFacilityDAO sportsFacilityDAO) {
		sviKorisnici=new ArrayList<User>();
		this.contextPath=contextPath;
		pathToRepository = "C:\\Users\\HP\\Desktop\\6.semestar\\WEB\\Projekat - FINAL\\WEB\\WebShopREST\\WebContent\\podaci";
		//loadUsers(contextPath);
		loadUsersJ(contextPath,sportsFacilityDAO);
	}
	
	/**
	 * Vra�a korisnika za prosle�eno korisni�ko ime i �ifru. Vra�a null ako korisnik ne postoji
	 * @param username
	 * @param password
	 * @return
	 */
	public User find(String username, String password) {
		for (User u: sviKorisnici) {
			if (u.getUsername().equals(username) && u.getPassword().equals(password))
			return u;
		}
		return null;
	}
	
	public User findByUsername(String username) {
		for (User u: sviKorisnici) {
			if (u.getUsername().equals(username))
				return u;
		}
		return null;
	}
	
	
	public Collection<User> findAll() {
		return sviKorisnici;
	}
	
	
	
	public List<User> getTrainers(){
		List<User> trainers = new ArrayList<>();
		for (int i=0; i<sviKorisnici.size();i++) {
			if (sviKorisnici.get(i).getRole().equals(Role.TRAINER)) {
				trainers.add(sviKorisnici.get(i));
			}
		}
		return trainers;	
	}
	
	public boolean postojiKorisnickoIme(String korisnickoIme) {
		for (User u: sviKorisnici) {
			if (u.getUsername().equals(korisnickoIme))
				return true;
		}
		return false;
	}
	
	
	/*
	 * public UserDTO save(UserDTO user) { users.put(user.username, new
	 * User(user.username, user.password, user.firstName, user.lastName,
	 * user.gender, user.birthDate, null, Role.CUSTUMER, null, null, null, 0,
	 * CustumerType.BRONZE, false)); return user; }
	 * 
	 * 
	 * public NewUserDTO saveNewUser(NewUserDTO user) { if(user.role==Role.CUSTUMER)
	 * { users.put(user.username, new User(user.username, user.password,
	 * user.firstName, user.lastName, user.gender, user.birthDate, null, user.role,
	 * null, null, null, 0, CustumerType.BRONZE, false)); }else {
	 * users.put(user.username, new User(user.username, user.password,
	 * user.firstName, user.lastName, user.gender, user.birthDate, null, user.role,
	 * null, null, null, -1, CustumerType.GOLD, false)); } return user; }
	 * 
	 * 
	 * public UserDTO saveMenager(UserDTO user) { SportsFacility sportFacylity= new
	 * SportsFacility(); users.put(user.username, new User(user.username,
	 * user.password, user.firstName, user.lastName, user.gender, user.birthDate,
	 * null, Role.MENAGER, null,null, null, -1, CustumerType.GOLD, false)); return
	 * user; }
	 */
		
	
	public List<User> nadjiSlobodneMenadzere() {
		List<User> ret = new ArrayList<User>();
		for(User korisnik : sviKorisnici) {
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
			Role role;
			StringTokenizer st;
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
						 sviKorisnici.add(new User(username, password, firstName, lastName, gender, birthDate, role, sf, collectedPoints, customerType,logickiObrisan));
					 } else {
						 sviKorisnici.add(new User(username, password, firstName, lastName, gender, birthDate, role, null, collectedPoints, customerType,logickiObrisan));
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
	
	public void loadUsersJ(String contextPath, SportsFacilityDAO sportsFacilityDAO) {
		JSONParser jsonParser = new JSONParser();

        try (FileReader reader = new FileReader(pathToRepository + "users.json"))
        {
            Object object = jsonParser.parse(reader);

            JSONArray users = (JSONArray) object;

            users.forEach( user -> sviKorisnici.add(parseUser( (JSONObject) user, sportsFacilityDAO) ));
 
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
	}
	
	private User parseUser(JSONObject user, SportsFacilityDAO sportsFacilityDAO) 
    {
        JSONObject userObject = (JSONObject) user.get("user");

        String username = (String) userObject.get("username");
        String password=(String) userObject.get("password");
        String firstName=(String) userObject.get("firstName");
        String lastName=(String) userObject.get("lastName");
        String gender=(String) userObject.get("gender");
        String birthDate=(String) userObject.get("birthDate");
        String role=(String) userObject.get("role");
        String sportsFacility=(String) userObject.get("sportsFacility");
        double collectedPoints = (double) userObject.get("collectedPoints");
        String customerType=(String) userObject.get("customerType");
        boolean logickiObrisan = (boolean) userObject.get("logickiObrisan");
        
      if (collectedPoints>=1000 && collectedPoints<2000)
    	  customerType=CustumerType.SILVER.toString();
      
      if (collectedPoints>=2000)
    	  customerType=CustumerType.GOLD.toString();
      
      if (collectedPoints<1000)
    	  customerType=CustumerType.BRONZE.toString();
    	  
    	  
        User newUser = new User(username, password, firstName, lastName, Gender.valueOf(gender), Date.valueOf(LocalDate.parse(birthDate)),Role.valueOf(role),sportsFacilityDAO.findFacilitiy(sportsFacility),collectedPoints, CustumerType.valueOf(customerType), logickiObrisan);
       
      
		return newUser;
    }
	
	public void saveUserChange(String username, User user) throws IOException {
		for(User a : sviKorisnici) {
			if(a.getUsername().equals(username)) {
				a.setFirstName(user.getFirstName());
				a.setUsername(user.getUsername());
				a.setLastName(user.getLastName());
				a.setPassword(user.getPassword());
				a.setGender(user.getGender());
				a.setSportsFacility(user.getSportsFacility());
			}
		}
		
		JSONArray korisnici = new JSONArray();
		for (User a : sviKorisnici) {
			JSONObject userObject = new JSONObject();
			
			userObject.put("username", a.getUsername());
			userObject.put("password", a.getPassword());
			userObject.put("firstName", a.getFirstName());
			userObject.put("lastName", a.getLastName());
			userObject.put("gender", a.getGender().toString());
			userObject.put("birthDate", a.getBirthDate().toString());
			userObject.put("role", a.getRole().toString());
			if (a.getSportsFacility()==null) {
				userObject.put("sportsFacility", null);
			} else {
				userObject.put("sportsFacility", a.getSportsFacility().getName());
			}	
			userObject.put("collectedPoints", a.getCollectedPoints());
			userObject.put("customerType", a.getCustomerType().toString());
			userObject.put("logickiObrisan", a.isLogickiObrisan());
			
			JSONObject userObject2 = new JSONObject(); 
			userObject2.put("user", userObject);
			
			korisnici.add(userObject2);
		}
         
        try (FileWriter file = new FileWriter(pathToRepository + "users.json")) {
            file.write(korisnici.toJSONString()); 
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	public void saveUser(User user) throws IOException {
		sviKorisnici.add(user);
		
		JSONArray korisnici = new JSONArray();
		for (User a : sviKorisnici) {
			JSONObject userObject = new JSONObject();
			
			userObject.put("username", a.getUsername());
			userObject.put("password", a.getPassword());
			userObject.put("firstName", a.getFirstName());
			userObject.put("lastName", a.getLastName());
			userObject.put("gender", a.getGender().toString());
			userObject.put("birthDate", a.getBirthDate().toString());
			userObject.put("role", a.getRole().toString());
			if (a.getSportsFacility()==null) {
				userObject.put("sportsFacility", null);
			} else {
				userObject.put("sportsFacility", a.getSportsFacility().getName());
			}			
			userObject.put("collectedPoints", a.getCollectedPoints());
			userObject.put("customerType", a.getCustomerType().toString());
			userObject.put("logickiObrisan", a.isLogickiObrisan());
			
			JSONObject userObject2 = new JSONObject(); 
			userObject2.put("user", userObject);
			
			korisnici.add(userObject2);
		}
         
        try (FileWriter file = new FileWriter(pathToRepository + "users.json")) {
            file.write(korisnici.toJSONString()); 
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
}
