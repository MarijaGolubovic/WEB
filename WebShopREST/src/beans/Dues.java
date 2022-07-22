package beans;

import java.sql.Date;

public class Dues {
	public enum DuesType{Godisnja, Mesecna, Nedeljna};
	
	private String id;
	private DuesType duesType;
	private Date paymentDate;
	private Date dateValid;
	private double price;
	private User custumer;
	private boolean status;
	private double numberOfSesions;
	private double numberOfAvaliableSesions;
	
	public double getNumberOfAvaliableSesions() {
		return numberOfAvaliableSesions;
	}
	public void posetiObjekat() {
		numberOfAvaliableSesions--;
	}
	public void setNumberOfAvaliableSesions(double numberOfAvaliableSesions) {
		this.numberOfAvaliableSesions = numberOfAvaliableSesions;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public DuesType getDuesType() {
		return duesType;
	}
	public void setDuesType(DuesType duesType) {
		this.duesType = duesType;
	}
	public Date getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(Date paymentDate) {
		this.paymentDate = paymentDate;
	}
	public Date getDateValid() {
		return dateValid;
	}
	public void setDateValid(Date dateValid) {
		this.dateValid = dateValid;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public User getCustumer() {
		return custumer;
	}
	public void setCustumer(User custumer) {
		this.custumer = custumer;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public double getNumberOfSesions() {
		return numberOfSesions;
	}
	public void setNumberOfSesions(double numberOfSesions) {
		this.numberOfSesions = numberOfSesions;
	}

	public Dues(String id, DuesType duesType, Date paymentDate, Date dateValid, double price,
			User custumer, boolean status, double numberOfSesions, double numberOfAvaliableSesions) {
		super();
		this.id = id;
		this.duesType = duesType;
		this.paymentDate = paymentDate;
		this.dateValid = dateValid;
		this.price = price;
		this.custumer = custumer;
		this.status = status;
		this.numberOfSesions = numberOfSesions;
		this.numberOfAvaliableSesions = numberOfAvaliableSesions;
	}
	
	public Dues(DuesType duesType, double price, double numberOfSesions) {
		super();
		this.duesType = duesType;
		this.price = price;
		this.numberOfSesions = numberOfSesions;
	}
	public Dues() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	

}
