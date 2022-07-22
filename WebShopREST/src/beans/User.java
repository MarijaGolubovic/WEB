package beans;

import java.io.Serializable;
import java.sql.Date;


public class User implements Serializable {
	
	public enum Gender{FEMALE,MALE};
	public enum Role{MENAGER, ADMIN, TRAINER, CUSTUMER};
	public enum CustumerType{GOLD, SILVER, BRONZE};
	
	
	public String username;
	public String password;
	public String firstName;
	public String lastName;
	public Gender gender;
	public Date birthDate;
	public Role role;
	public SportsFacility sportsFacility;
	public double collectedPoints;
	public CustumerType customerType;
	public boolean logickiObrisan;
	
	
	
	public boolean isLogickiObrisan() {
		return logickiObrisan;
	}
	public void setLogickiObrisan(boolean logickiObrisan) {
		this.logickiObrisan = logickiObrisan;
	}
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
	public Date getBirthDate() {
		return birthDate;
	}
	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public SportsFacility getSportsFacility() {
		return sportsFacility;
	}
	public void setSportsFacility(SportsFacility sportsFacility) {
		this.sportsFacility = sportsFacility;
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


	public User(String username, String password, String firstName, String lastName, Gender gender, Date birthDate,
			Role role, SportsFacility sportsFacility, double collectedPoints, CustumerType customerType,
			boolean logickiObrisan) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.birthDate = birthDate;
		this.role = role;
		this.sportsFacility = sportsFacility;
		this.collectedPoints = collectedPoints;
		this.customerType = customerType;
		this.logickiObrisan = logickiObrisan;
	}
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
}
