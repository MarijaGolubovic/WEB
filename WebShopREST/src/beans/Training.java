package beans;

public class Training {
	enum TrainingType{GROUP, PERSONAL, GYM};
	
	private String name;
	private TrainingType trainingType;
	private SportsFacility sportsFacility;
	private double duration;
	private User trainer;
	private String description;
	//slika nedostaje nisam je jos uvijek dodala
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public TrainingType getTrainingType() {
		return trainingType;
	}
	public void setTrainingType(TrainingType trainingType) {
		this.trainingType = trainingType;
	}
	public SportsFacility getSportsFacility() {
		return sportsFacility;
	}
	public void setSportsFacility(SportsFacility sportsFacility) {
		this.sportsFacility = sportsFacility;
	}
	public double getDuration() {
		return duration;
	}
	public void setDuration(double duration) {
		this.duration = duration;
	}
	public User getTrainer() {
		return trainer;
	}
	public void setTrainer(User trainer) {
		this.trainer = trainer;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Training(String name, TrainingType trainingType, SportsFacility sportsFacility, double duration,
			User trainer, String description) {
		super();
		this.name = name;
		this.trainingType = trainingType;
		this.sportsFacility = sportsFacility;
		this.duration = duration;
		this.trainer = trainer;
		this.description = description;
	}
	public Training() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
}