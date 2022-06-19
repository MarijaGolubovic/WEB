package dao;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.StringTokenizer;

import javax.persistence.EnumType;

import beans.Address;
import beans.Location;
import beans.SportsFacility;
import beans.SportsFacility.Content;
import beans.SportsFacility.Status;
import beans.SportsFacility.TypeSportsFacility;


public class SportsFacilityDAO {
	private HashMap<String, SportsFacility> facilities = new HashMap<String, SportsFacility>();

	public SportsFacilityDAO() {
	}
	
	public SportsFacilityDAO(String contextPath) {
		loadProducts(contextPath);
	}
	
	public Collection<SportsFacility> findAll() {
		return facilities.values();
	}
	
	public SportsFacility findFacilitiy(String name) {
		return facilities.containsKey(name) ? facilities.get(name) : null;
	}
	
	public SportsFacility save(SportsFacility sportsFacility) {
		facilities.put(sportsFacility.getName(), sportsFacility);
		return sportsFacility;
	}
	
	public SportsFacility update(String name, SportsFacility sportsFacility) {
		SportsFacility facilityToUpdate = this.findFacilitiy(name);
		if(facilityToUpdate == null) {
			return this.save(sportsFacility);
		}
		return facilityToUpdate;
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
				facilities.put(name, new SportsFacility(name, TypeSportsFacility.valueOf(typeSportsFacility),contentsA,Status.valueOf(working),
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
	


}
