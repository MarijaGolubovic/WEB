package beans;

import java.time.LocalDateTime;

public class TrainingHistory {
	
	private LocalDateTime dataTimeApplication;
	private Training training;
	private User customer;
	private User trainer;
	public LocalDateTime getDataTimeApplication() {
		return dataTimeApplication;
	}
	public void setDataTimeApplication(LocalDateTime dataTimeApplication) {
		this.dataTimeApplication = dataTimeApplication;
	}
	public Training getTraining() {
		return training;
	}
	public void setTraining(Training training) {
		this.training = training;
	}
	public User getCustomer() {
		return customer;
	}
	public void setCustomer(User customer) {
		this.customer = customer;
	}
	public User getTrainer() {
		return trainer;
	}
	public void setTrainer(User trainer) {
		this.trainer = trainer;
	}
	public TrainingHistory(LocalDateTime dataTimeApplication, Training training, User customer, User trainer) {
		super();
		this.dataTimeApplication = dataTimeApplication;
		this.training = training;
		this.customer = customer;
		this.trainer = trainer;
	}
	public TrainingHistory() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	

}
