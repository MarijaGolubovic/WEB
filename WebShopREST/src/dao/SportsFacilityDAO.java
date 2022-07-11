package dao;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.StringTokenizer;

import javax.persistence.EnumType;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import beans.Address;
import beans.Location;
import beans.SportsFacility;
import beans.Training;
import beans.SportsFacility.Content;
import beans.SportsFacility.Status;
import beans.SportsFacility.TypeSportsFacility;
import beans.Training.TrainingType;


public class SportsFacilityDAO {
	public HashMap<String, SportsFacility> facilities = new HashMap<String, SportsFacility>();
	private ArrayList<SportsFacility> sviobjekti;
	private String pathToRepository;
	
	public SportsFacilityDAO() {
	}
	
	
	public SportsFacilityDAO(String contextPath) {
		sviobjekti = new ArrayList<SportsFacility>();
		pathToRepository = "C:\\Users\\HP\\Desktop\\6.semestar\\WEB\\Projekat - FINAL\\WEB\\WebShopREST\\WebContent\\podaci\\";
		//loadProducts(contextPath);
		loadFacilities();
	}
	
	public Collection<SportsFacility> findAll() {
		return sviobjekti;
	}
	
	public SportsFacility findFacilitiy(String name) {
		for(int i = 0; i < sviobjekti.size(); i++)
			if(sviobjekti.get(i).getName().equals(name))
				return sviobjekti.get(i);
		return null;
	}
	
	
	public void delete(String name) {
		this.facilities.remove(name);
	}
	
	private void loadProducts(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/objekti.txt");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			String line, name = "", typeSportsFacility = "",contents = "", working="",location="",averageGrade="",startingTime="",endingTime="",imageName="";
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					name = st.nextToken().trim();
					typeSportsFacility = st.nextToken().trim();
					contents = st.nextToken().trim();
					working=st.nextToken().trim();
					location=st.nextToken().trim();
					averageGrade=st.nextToken().trim();
					startingTime=st.nextToken().trim();
					endingTime=st.nextToken().trim();
					imageName=st.nextToken().trim();
				}
				List<String> contentsS=Arrays.asList(contents.split(","));
				List <Content> contentsA = new ArrayList<SportsFacility.Content>(); 
				for(int i=0; i<contentsS.size();i++) {
					contentsA.add(Content.valueOf(contentsS.get(i)));
				}
				sviobjekti.add(new SportsFacility(name, TypeSportsFacility.valueOf(typeSportsFacility),contentsA,Status.valueOf(working),
								new Location(new Address(location.split(",")[0],location.split(",")[1],location.split(",")[2],location.split(",")[3],location.split(",")[4]),
										Double.parseDouble(location.split(",")[5]),Double.parseDouble(location.split(",")[6])),Double.parseDouble(averageGrade),LocalTime.parse(startingTime),LocalTime.parse(endingTime),imageName));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if ( in != null ) {
				try {
					in.close();
				}
				catch (Exception e) { }
			}
		}
		
	}
	
	public void loadFacilities() {
		JSONParser jsonParser = new JSONParser();

        try (FileReader reader = new FileReader(pathToRepository + "facilities.json"))
        {
            Object object = jsonParser.parse(reader);

            JSONArray facilities = (JSONArray) object;

            facilities.forEach( facility -> sviobjekti.add(parseFacility( (JSONObject) facility) ));
 
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
	}
	
	private SportsFacility parseFacility (JSONObject facility) 
    {
        JSONObject facilityObject = (JSONObject) facility.get("facility");

        String name = (String) facilityObject.get("name");
        String typeSportsFacility = (String) facilityObject.get("typeSportsFacility");
        String contentsS = (String) facilityObject.get("contentsS");
        String working = (String) facilityObject.get("working");
        String street = (String) facilityObject.get("street");
        String number = (String) facilityObject.get("number");
        String city = (String) facilityObject.get("city");
        String country = (String) facilityObject.get("country");
        String zipCode = (String) facilityObject.get("zipCode");
        double latitude = (double) facilityObject.get("latitude");
        double longitude = (double) facilityObject.get("longitude");
        double averageGrade = (double) facilityObject.get("averageGrade");
        String startingTime = (String) facilityObject.get("startingTime");
        String endingTime = (String) facilityObject.get("endingTime");
        String imageName = (String) facilityObject.get("imageName");
      
        SportsFacility newFacilty = new SportsFacility(name, TypeSportsFacility.valueOf(typeSportsFacility),contentsS, Status.valueOf(working),new Location(new Address(street, number, city, country, zipCode),latitude, longitude), averageGrade,LocalTime.parse(startingTime), LocalTime.parse(endingTime),imageName);

      
		return newFacilty;
    }
	
	public void save(SportsFacility facility) throws IOException {
		sviobjekti.add(facility);
		
		JSONArray objekti = new JSONArray();
		for (SportsFacility a : sviobjekti) {
			JSONObject facilityObject = new JSONObject();
			
			facilityObject.put("name", a.getName());
			facilityObject.put("typeSportsFacility", a.getTypeSportsFacility().toString());
			facilityObject.put("contentsS", a.getContentsS());
			facilityObject.put("working", a.getWorking().toString());
			facilityObject.put("street", a.getLocation().getAddress().getStreet());
			facilityObject.put("number", a.getLocation().getAddress().getNumber());
			facilityObject.put("city", a.getLocation().getAddress().getCity());
			facilityObject.put("country", a.getLocation().getAddress().getCountry());
			facilityObject.put("zipCode", a.getLocation().getAddress().getZipCode());
			facilityObject.put("latitude", a.getLocation().getLatitude());
			facilityObject.put("longitude",  a.getLocation().getLongitude());
			facilityObject.put("averageGrade", a.getAverageGrade());
			facilityObject.put("startingTime", a.getStartingTime().toString());
			facilityObject.put("endingTime", a.getEndingTime().toString());
			facilityObject.put("imageName", a.getImageName());
			
			JSONObject facilityObject2 = new JSONObject(); 
			facilityObject2.put("facility", facilityObject);
			
			objekti.add(facilityObject2);
		}
         
        try (FileWriter file = new FileWriter(pathToRepository + "facilities.json")) {
            file.write(objekti.toJSONString()); 
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	

	


}
