package beans;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class Dues {
	enum DuesType{DAILY, MONTHLY, ANNUAL};
	
	private String id;
	private DuesType duesType;
	private LocalDate paymentDate;
	private LocalDateTime dateValid;
	private double price;
	private User custumer;
	private boolean status;
	private int numberOfSesions;
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
	public LocalDate getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(LocalDate paymentDate) {
		this.paymentDate = paymentDate;
	}
	public LocalDateTime getDateValid() {
		return dateValid;
	}
	public void setDateValid(LocalDateTime dateValid) {
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
	public int getNumberOfSesions() {
		return numberOfSesions;
	}
	public void setNumberOfSesions(int numberOfSesions) {
		this.numberOfSesions = numberOfSesions;
	}
	public Dues(String id, DuesType duesType, LocalDate paymentDate, LocalDateTime dateValid, double price,
			User custumer, boolean status, int numberOfSesions) {
		super();
		this.id = id;
		this.duesType = duesType;
		this.paymentDate = paymentDate;
		this.dateValid = dateValid;
		this.price = price;
		this.custumer = custumer;
		this.status = status;
		this.numberOfSesions = numberOfSesions;
	}
	public Dues() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	

}
