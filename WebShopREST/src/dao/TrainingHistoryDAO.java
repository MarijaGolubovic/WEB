package dao;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import beans.Training.TrainingType;
import beans.TrainingHistory;
import beans.TrainingHistory.Status;
import beans.User;

public class TrainingHistoryDAO {
	private ArrayList<TrainingHistory> sviTreninzi;
	private TrainingHistory izmenjenTrening;
	private String pathToRepository;
	
	public TrainingHistoryDAO(TreningDAO treningDAO, UserDAO userDAO) {
		sviTreninzi = new ArrayList<TrainingHistory>();
		//izmenjenTrening = new TrainingHistory();
		pathToRepository = "C:\\Users\\HP\\Desktop\\6.semestar\\WEB\\Projekat - FINAL\\WEB\\WebShopREST\\WebContent\\podaci";
		loadTrainings(treningDAO, userDAO);
	}
	
	public ArrayList<TrainingHistory> getAllTraining() {
		return sviTreninzi;
	}
	
	public TrainingHistory getUpdatedTraining() {
		return izmenjenTrening;
	}
	
	
	public ArrayList<TrainingHistory> getGroupTrainingsFromFacilities(String name) {
		ArrayList<TrainingHistory> trainingsFromFacility = new ArrayList<TrainingHistory>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getTraining().getSportsFacility().getName().equals(name) && sviTreninzi.get(i).getTraining().getTrainingType().equals(TrainingType.GROUP))
				trainingsFromFacility.add(sviTreninzi.get(i));
		return trainingsFromFacility;
	}
	
	public TrainingHistory getTraining(User trainer, LocalDateTime termin) {
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getTraining().getTrainer().getUsername().equals(trainer.getUsername()) && sviTreninzi.get(i).getDataTraining().equals(termin))
				return sviTreninzi.get(i);
		return null;
	}
	
	public ArrayList<TrainingHistory> getGroupTrainings() {
		ArrayList<TrainingHistory> trainings = new ArrayList<TrainingHistory>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getTraining().getTrainingType().equals(TrainingType.GROUP))
				trainings.add(sviTreninzi.get(i));
		return trainings;
	}
	
	public ArrayList<TrainingHistory> getPersonalTrainings() {
		ArrayList<TrainingHistory> trainings = new ArrayList<TrainingHistory>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getTraining().getTrainingType().equals(TrainingType.PERSONAL))
				trainings.add(sviTreninzi.get(i));
		return trainings;
	}
	
	public ArrayList<TrainingHistory> getGroupTrainingsTrainer(String username) {
		ArrayList<TrainingHistory> trainingsTrainer = new ArrayList<TrainingHistory>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getTraining().getTrainer().getUsername().equals(username) && sviTreninzi.get(i).getTraining().getTrainingType().equals(TrainingType.GROUP))
				trainingsTrainer.add(sviTreninzi.get(i));
		return trainingsTrainer;
	}
	
	public ArrayList<TrainingHistory> getGroupTrainingsCustemer(String username) {
		ArrayList<TrainingHistory> trainingsTrainer = new ArrayList<TrainingHistory>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getCustomer().getUsername().equals(username) && sviTreninzi.get(i).getTraining().getTrainingType().equals(TrainingType.GROUP) && sviTreninzi.get(i).getDataTraining().isAfter(LocalDateTime.now().minusDays(30)))
				trainingsTrainer.add(sviTreninzi.get(i));
		return trainingsTrainer;
	}
	
	public ArrayList<TrainingHistory> getPersonalTrainingsCustemer(String username) {
		ArrayList<TrainingHistory> trainingsTrainer = new ArrayList<TrainingHistory>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getCustomer().getUsername().equals(username) && sviTreninzi.get(i).getTraining().getTrainingType().equals(TrainingType.PERSONAL) && sviTreninzi.get(i).getDataTraining().isAfter(LocalDateTime.now().minusDays(30)))
				trainingsTrainer.add(sviTreninzi.get(i));
		return trainingsTrainer;
	}
	public ArrayList<TrainingHistory> getOtherTrainingsCustemer(String username) {
		ArrayList<TrainingHistory> trainingsTrainer = new ArrayList<TrainingHistory>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getCustomer().getUsername().equals(username) && sviTreninzi.get(i).getTraining().getTrainingType().equals(TrainingType.OTHER) && sviTreninzi.get(i).getDataTraining().isAfter(LocalDateTime.now().minusDays(30)))
				trainingsTrainer.add(sviTreninzi.get(i));
		return trainingsTrainer;
	}
	
	
	public ArrayList<TrainingHistory> getPersonalTrainingsTrainer(String username) {
		ArrayList<TrainingHistory> trainingsTrainer = new ArrayList<TrainingHistory>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getTraining().getTrainer().getUsername().equals(username) && sviTreninzi.get(i).getTraining().getTrainingType().equals(TrainingType.PERSONAL))
				trainingsTrainer.add(sviTreninzi.get(i));
		return trainingsTrainer;
	}
	
	public ArrayList<TrainingHistory> getPersonalTrainingsFromFacilities(String name) {
		ArrayList<TrainingHistory> trainingsFromFacility = new ArrayList<TrainingHistory>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getTraining().getSportsFacility().getName().equals(name) && sviTreninzi.get(i).getTraining().getTrainingType().equals(TrainingType.PERSONAL))
				trainingsFromFacility.add(sviTreninzi.get(i));
		return trainingsFromFacility;
	}
	
	public ArrayList<TrainingHistory> getOtherTrainingsFromFacilities(String name) {
		ArrayList<TrainingHistory> trainingsFromFacility = new ArrayList<TrainingHistory>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getTraining().getSportsFacility().getName().equals(name) && sviTreninzi.get(i).getTraining().getTrainingType().equals(TrainingType.OTHER))
				trainingsFromFacility.add(sviTreninzi.get(i));
		return trainingsFromFacility;
	}

	public void loadTrainings(TreningDAO treningDAO, UserDAO userDAO) {
		JSONParser jsonParser = new JSONParser();

        try (FileReader reader = new FileReader(pathToRepository + "trainingHistory.json"))
        {
            Object object = jsonParser.parse(reader);

            JSONArray trainings = (JSONArray) object;

            trainings.forEach( training -> sviTreninzi.add(parseTraining( (JSONObject) training, treningDAO, userDAO ) ));
 
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
	}
	
	private TrainingHistory parseTraining(JSONObject training, TreningDAO treningDAO, UserDAO userDAO) 
    {
        JSONObject trainingObject = (JSONObject) training.get("training");
        String dataTimeApplication = (String) trainingObject.get("dataTimeApplication");
        String dataTraining=(String) trainingObject.get("dataTraining");
        String trainingT=(String) trainingObject.get("trainingT");
        String customer = (String) trainingObject.get("customer");
        String status = (String) trainingObject.get("status");
     
            
        TrainingHistory newTraining = new TrainingHistory(LocalDateTime.parse(dataTimeApplication), LocalDateTime.parse(dataTraining), null, null);
        
        if  (LocalDateTime.parse(dataTraining).isAfter(LocalDateTime.now()))
        	newTraining.setStatus(Status.Buduci);
        else
        	newTraining.setStatus(Status.Prosli);
        
        if (status.equals("Otkazan"))
        	newTraining.setStatus(Status.Otkazan);
        
        if(treningDAO.getTraining(trainingT)!=null) {
        	newTraining.setTraining(treningDAO.getTraining(trainingT));
        }
        
        if(userDAO.findByUsername(customer)!=null) {
        	newTraining.setCustomer(userDAO.findByUsername(customer));
        }
      
		return newTraining;
    }
	
	public void saveTraining(TrainingHistory training) throws IOException {
		sviTreninzi.add(training);
		
		JSONArray treninzi = new JSONArray();
		for (TrainingHistory a : sviTreninzi) {
			JSONObject trainingObject = new JSONObject();
			
			trainingObject.put("dataTimeApplication", a.getDataTimeApplication().toString());
			trainingObject.put("dataTraining", a.getDataTraining().toString());
			trainingObject.put("trainingT", a.getTraining().getName());
			trainingObject.put("customer", a.getCustomer().getUsername());
			trainingObject.put("status", a.getStatus().toString());
			
			JSONObject trainingObject2 = new JSONObject(); 
			trainingObject2.put("training", trainingObject);
			
	        treninzi.add(trainingObject2);
		}
         
        try (FileWriter file = new FileWriter(pathToRepository + "trainingHistory.json")) {
            file.write(treninzi.toJSONString()); 
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	
	
	public void saveTrainingChanges(TrainingHistory training) throws IOException {
		for(TrainingHistory a : sviTreninzi) {
			if(a.getDataTimeApplication().equals(training.getDataTimeApplication()) && a.getCustomer().getUsername().equals(training.getCustomer().getUsername())) {
				a.setDataTraining(training.getDataTraining());
				a.setTraining(training.getTraining());
				a.setStatus(training.getStatus());
			}
		}
		
		JSONArray treninzi = new JSONArray();
		for (TrainingHistory a : sviTreninzi) {
			JSONObject trainingObject = new JSONObject();
			
			trainingObject.put("dataTimeApplication", a.getDataTimeApplication().toString());
			trainingObject.put("dataTraining", a.getDataTraining().toString());
			trainingObject.put("trainingT", a.getTraining().getName());
			trainingObject.put("customer", a.getCustomer().getUsername());
			trainingObject.put("status", a.getStatus().toString());
			
			JSONObject trainingObject2 = new JSONObject(); 
			trainingObject2.put("training", trainingObject);
			
	        treninzi.add(trainingObject2);
		}
         
        try (FileWriter file = new FileWriter(pathToRepository + "trainingHistory.json")) {
            file.write(treninzi.toJSONString()); 
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
}
