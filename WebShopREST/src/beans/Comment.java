package beans;

public class Comment {
	
	private String id;
	private String username;
	private String sportsFacility;
	private String comment;
	private double grade;
	private boolean logickiObrisan;
	
	
	public double getGrade() {
		return grade;
	}
	public void setGrade(double grade) {
		this.grade = grade;
	}
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getSportsFacility() {
		return sportsFacility;
	}
	public void setSportsFacility(String sportsFacility) {
		this.sportsFacility = sportsFacility;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public boolean isLogickiObrisan() {
		return logickiObrisan;
	}
	public void setLogickiObrisan(boolean logickiObrisan) {
		this.logickiObrisan = logickiObrisan;
	}
	public Comment(String id, String username, String sportsFacility, String comment, double grade,
			boolean logickiObrisan) {
		super();
		this.id = id;
		this.username = username;
		this.sportsFacility = sportsFacility;
		this.comment = comment;
		this.grade = grade;
		this.logickiObrisan = logickiObrisan;
	}
	public Comment() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
