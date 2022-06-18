package beans;

import java.time.LocalTime;

public class SportsFacility {

	enum TypeSportsFacility{GYM, POOL, DANCE_STUDIO, SPORTS_CENTER};
	
	public String name;
	public TypeSportsFacility typeSportsFacility;
	public boolean working;
	public Location location;
	public double averageGrade;
	public LocalTime startingTime;
	public LocalTime endingTime;
	//nedostaje slika
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
	public boolean isWorking() {
		return working;
	}
	public void setWorking(boolean working) {
		this.working = working;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
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
	public SportsFacility(String name, TypeSportsFacility typeSportsFacility, boolean working, Location location,
			double averageGrade, LocalTime startingTime, LocalTime endingTime) {
		super();
		this.name = name;
		this.typeSportsFacility = typeSportsFacility;
		this.working = working;
		this.location = location;
		this.averageGrade = averageGrade;
		this.startingTime = startingTime;
		this.endingTime = endingTime;
	}
	public SportsFacility() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
