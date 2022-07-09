package dto;

import java.sql.Date;

import beans.User.Gender;
import beans.User.Role;

public class NewUserDTO {
	public String firstName;
	public String lastName;
	public String username;
	public String password;
	public Gender gender;
	public Date birthDate;
	public Role role;

}
