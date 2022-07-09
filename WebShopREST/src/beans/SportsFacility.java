package beans;

import java.time.LocalTime;
import java.util.List;

public class SportsFacility {

	public enum TypeSportsFacility{Teretana, Bazen, Plesni_studio, Sportski_centar};
	public enum Content {Personalni_trening, Grupni_trening, Sauna};
	public enum Status {Radi, Ne_radi};
	
	private String name;
	private TypeSportsFacility typeSportsFacility;
	private List<Content> contents;
	private String contentsS;
	private Status working;
	private Location location;
	private String locationS;
	private double averageGrade;
	private LocalTime startingTime;
	private String startingTimeS;
	private LocalTime endingTime;
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
	private String imageName;
	

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
		for (int i=0;i<contents.size();i++) {
			if (i==0)
				contentsS=contents.get(i).toString();
			else 
				contentsS=contentsS+contents.get(i).toString();
			if(i!=(contents.size()-1))
				contentsS=contentsS+", ";
		}
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
	
	
}
