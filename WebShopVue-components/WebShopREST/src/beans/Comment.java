package beans;

public class Comment {
	
	private User customer;
	private SportsFacility sportsFacility;
	private Comment comment;
	private int grade;
	public User getCustomer() {
		return customer;
	}
	public void setCustomer(User customer) {
		this.customer = customer;
	}
	public SportsFacility getSportsFacility() {
		return sportsFacility;
	}
	public void setSportsFacility(SportsFacility sportsFacility) {
		this.sportsFacility = sportsFacility;
	}
	public Comment getComment() {
		return comment;
	}
	public void setComment(Comment comment) {
		this.comment = comment;
	}
	public int getGrade() {
		return grade;
	}
	public void setGrade(int grade) {
		this.grade = grade;
	}
	public Comment(User customer, SportsFacility sportsFacility, Comment comment, int grade) {
		super();
		this.customer = customer;
		this.sportsFacility = sportsFacility;
		this.comment = comment;
		this.grade = grade;
	}
	public Comment() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}
