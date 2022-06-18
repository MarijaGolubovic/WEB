package beans;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashMap;

public class User implements Serializable {
	public enum Gender{FEMALE,MALE};
	public enum Role{MENAGER, ADMIN, TRAINER, CUSTUMER};
	public enum CustumerType{GOLD, SILVER, BRONZE};
	
	
	private String username;
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
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public LocalDateTime getBirthDate() {
		return birthDate;
	}
	public void setBirthDate(LocalDateTime birthDate) {
		this.birthDate = birthDate;
	}
	public TrainingHistory getTrainingHistory() {
		return trainingHistory;
	}
	public void setTrainingHistory(TrainingHistory trainingHistory) {
		this.trainingHistory = trainingHistory;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public Dues getDues() {
		return dues;
	}
	public void setDues(Dues dues) {
		this.dues = dues;
	}
	public SportsFacility getSportsFacility() {
		return sportsFacility;
	}
	public void setSportsFacility(SportsFacility sportsFacility) {
		this.sportsFacility = sportsFacility;
	}
	public SportsFacility getVisistedFacolity() {
		return visistedFacolity;
	}
	public void setVisistedFacolity(SportsFacility visistedFacolity) {
		this.visistedFacolity = visistedFacolity;
	}
	public double getCollectedPoints() {
		return collectedPoints;
	}
	public void setCollectedPoints(double collectedPoints) {
		this.collectedPoints = collectedPoints;
	}
	public CustumerType getCustomerType() {
		return customerType;
	}
	public void setCustomerType(CustumerType customerType) {
		this.customerType = customerType;
	}
	public User(String username, String password, String firstName, String lastName, Gender gender,
			LocalDateTime birthDate, TrainingHistory trainingHistory, Role role, Dues dues,
			SportsFacility sportsFacility, SportsFacility visistedFacolity, double collectedPoints,
			CustumerType customerType) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.birthDate = birthDate;
		this.trainingHistory = trainingHistory;
		this.role = role;
		this.dues = dues;
		this.sportsFacility = sportsFacility;
		this.visistedFacolity = visistedFacolity;
		this.collectedPoints = collectedPoints;
		this.customerType = customerType;
	}
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
		
}
