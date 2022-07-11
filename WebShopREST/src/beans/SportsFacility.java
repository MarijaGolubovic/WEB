package beans;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class SportsFacility {

	public enum TypeSportsFacility{Teretana, Bazen, Plesni_studio, Sportski_centar};
	public enum Content {Personalni_trening, Grupni_trening, Sauna, All_Inclusive};
	public enum Status {Radi, Ne_radi};
	
	public String name;
	public TypeSportsFacility typeSportsFacility;
	public List<Content> contents;
	public String contentsS;
	public Status working;
	public Location location;
	public String locationS;
	public double averageGrade;
	public LocalTime startingTime;
	public String startingTimeS;
	public LocalTime endingTime;
	public String imageName;
	public String getContentsS() {
		return contentsS;
	}
	public void setContentsS(String contentsS) {
		this.contentsS = contentsS;
	}
	public String getStartingTimeS() {
		return startingTimeS;
	}
	public void setStartingTimeS(String startingTimeS) {
		this.startingTimeS = startingTimeS;
	}
	public String getEndingTimeS() {
		return endingTimeS;
	}
	public void setEndingTimeS(String endingTimeS) {
		this.endingTimeS = endingTimeS;
	}
	private String endingTimeS;
	
	

	public String getImageName() {
		return imageName;
	}
	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public TypeSportsFacility getTypeSportsFacility() {
		return typeSportsFacility;
	}
	public void setTypeSportsFacility(TypeSportsFacility typeSportsFacility) {
		this.typeSportsFacility = typeSportsFacility;
	}

	public Status getWorking() {
		return working;
	}
	public void setWorking(Status working) {
		this.working = working;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
		setLocationS(location.getAddress().getStreet()+" "+location.getAddress().getNumber()+", " +location.getAddress().getCity());
	}
	public double getAverageGrade() {
		return averageGrade;
	}
	public void setAverageGrade(double averageGrade) {
		this.averageGrade = averageGrade;
	}
	public LocalTime getStartingTime() {
		return startingTime;
	}
	public void setStartingTime(LocalTime startingTime) {
		this.startingTime = startingTime;
	}
	public LocalTime getEndingTime() {
		return endingTime;
	}
	public void setEndingTime(LocalTime endingTime) {
		this.endingTime = endingTime;
	}



	public SportsFacility(String name, TypeSportsFacility typeSportsFacility, List<Content> contents, Status working,
			Location location, double averageGrade, LocalTime startingTime, LocalTime endingTime, String imageName) {
		super();
		this.name = name;
		this.typeSportsFacility = typeSportsFacility;
		this.contents = contents;
		contentsS="";
		if(contents!=null) {
		for (int i=0;i<contents.size();i++) {
			if (i==0)
				contentsS=contents.get(i).toString();
			else 
				contentsS=contentsS+contents.get(i).toString();
			if(i!=(contents.size()-1))
				contentsS=contentsS+", ";
		}}
	
		this.working = working;
		this.location = location;
		setLocationS(location.getAddress().getStreet()+" "+location.getAddress().getNumber()+", " +location.getAddress().getCity());
		this.averageGrade = averageGrade;
		this.startingTime = startingTime;
		startingTimeS=startingTime.toString();
		this.endingTime = endingTime;
		endingTimeS=endingTime.toString();
		this.imageName = imageName;
	}
	public List<Content> getContents() {
		return contents;
	}
	public void setContents(List<Content> contents) {
		this.contents = contents;
		contentsS="";
		for (int i=0;i<contents.size();i++) {
			contentsS.concat(contents.get(i).toString());
			if(i!=contents.size()-1)
				contentsS.concat(",");
		}
	}
	public SportsFacility() {
	}
	public String getLocationS() {
		return locationS;
	}
	public void setLocationS(String locationS) {
		this.locationS = locationS;
	}
	public SportsFacility(String name, TypeSportsFacility typeSportsFacility, String contentsS, Status working,
			Location location, double averageGrade, LocalTime startingTime, LocalTime endingTime, String imageName) {
		super();
		this.name = name;
		this.typeSportsFacility = typeSportsFacility;
		this.contentsS = contentsS;
		this.working = working;
		this.location = location;
		this.averageGrade = averageGrade;
		this.startingTime = startingTime;
		this.endingTime = endingTime;
		this.imageName = imageName;
		this.contents=new ArrayList<>();
		setLocationS(location.getAddress().getStreet()+" "+location.getAddress().getNumber()+", " +location.getAddress().getCity());
		startingTimeS=startingTime.toString();
		endingTimeS=endingTime.toString();
	}
	
	
}
