package beans;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


public class TrainingHistory {
	
	public enum Status {Prosli, Buduci, Otkazan}
	
	private LocalDateTime dataTimeApplication;
	private String dataTimeApplicationS;
	private LocalDateTime dataTraining;
	private String dataTrainingS;
	private String dataTrainingSS;
	private Training training;
	private User customer;
	private Status status;
	

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

	public TrainingHistory() {
		super();
		// TODO Auto-generated constructor stub
	}
	public LocalDateTime getDataTimeApplication() {
		return dataTimeApplication;
	}
	public void setDataTimeApplication(LocalDateTime dataTimeApplication) {
		this.dataTimeApplication = dataTimeApplication;
		this.dataTimeApplicationS=dataTimeApplication.format(DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm"));
	}
	public LocalDateTime getDataTraining() {
		return dataTraining;
	}
	public void setDataTraining(LocalDateTime dataTraining) {
		this.dataTraining = dataTraining;
		this.dataTrainingS=dataTraining.format(DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm"));
		this.dataTrainingSS=dataTraining.toString();
	}
	public TrainingHistory(LocalDateTime dataTimeApplication, LocalDateTime dataTraining, Training training,
			User customer) {
		super();
		this.dataTimeApplication = dataTimeApplication;
		this.dataTraining = dataTraining;
		this.training = training;
		this.customer = customer;
		status=Status.Buduci;
		this.dataTrainingS=dataTraining.format(DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm"));
		this.dataTimeApplicationS=dataTimeApplication.format(DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm"));
		this.dataTrainingSS=dataTraining.toString();
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public String getDataTimeApplicationS() {
		return dataTimeApplicationS;
	}
	public void setDataTimeApplicationS(String dataTimeApplicationS) {
		this.dataTimeApplicationS = dataTimeApplicationS;
	}
	public String getDataTrainingS() {
		return dataTrainingS;
	}
	public void setDataTrainingS(String dataTrainingS) {
		this.dataTrainingS = dataTrainingS;
	}
	public String getDataTrainingSS() {
		return dataTrainingSS;
	}
	public void setDataTrainingSS(String dataTrainingSS) {
		this.dataTrainingSS = dataTrainingSS;
	}


	
	

}
