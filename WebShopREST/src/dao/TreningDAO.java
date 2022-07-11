package dao;

import java.awt.Image;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import org.apache.jasper.tagplugins.jstl.core.ForEach;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import beans.SportsFacility;
import beans.Training;
import beans.TrainingHistory;
import beans.Training.TrainingType;


public class TreningDAO {
	private ArrayList<Training> sviTreninzi;
	private Training izmenjenTrening;
	private String pathToRepository;
	
	public TreningDAO(SportsFacilityDAO sportsFacilityDAO, UserDAO userDAO) {
		sviTreninzi = new ArrayList<Training>();
		izmenjenTrening = new Training();
		pathToRepository = "C:\\Users\\TOSHIBA\\Desktop\\WEB-Projekat\\WEB\\WebShopREST\\WebContent\\podaci\\";
		loadTrainings(sportsFacilityDAO, userDAO);
	}
	
	
	public ArrayList<Training> getPersonalTrainings() {
		ArrayList<Training> trainings = new ArrayList<Training>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getTrainingType().equals(TrainingType.PERSONAL))
				trainings.add(sviTreninzi.get(i));
		return trainings;
	}
	
	public ArrayList<Training> getGroupTrainings() {
		ArrayList<Training> trainings = new ArrayList<Training>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getTrainingType().equals(TrainingType.GROUP))
				trainings.add(sviTreninzi.get(i));
		return trainings;
	}
	
	public ArrayList<Training> getOtherTrainings() {
		ArrayList<Training> trainings = new ArrayList<Training>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getTrainingType().equals(TrainingType.OTHER))
				trainings.add(sviTreninzi.get(i));
		return trainings;
	}
	
	public ArrayList<Training> getAllTraining() {
		return sviTreninzi;
	}
	
	public Training getUpdatedTraining() {
		return izmenjenTrening;
	}
	
	public Boolean checkTrainingName(String name) {
		for (int i=0; i<sviTreninzi.size();i++) {
			if (sviTreninzi.get(i).getName().equals(name))
				return false;
		}
		return true;
	}

	public void setUpdatedTraining(String trening, String objekat) throws IOException {
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getName().equals(trening) && sviTreninzi.get(i).getSportsFacility().getName().equals(objekat))
				izmenjenTrening = sviTreninzi.get(i);
	}
	
	public ArrayList<Training> getGroupTrainingsFromFacilities(String name) {
		ArrayList<Training> trainingsFromFacility = new ArrayList<Training>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getSportsFacility().getName().equals(name) && sviTreninzi.get(i).getTrainingType().equals(TrainingType.GROUP))
				trainingsFromFacility.add(sviTreninzi.get(i));
		return trainingsFromFacility;
	}
	
	public ArrayList<Training> getGroupTrainingsTrainer(String username) {
		ArrayList<Training> trainingsTrainer = new ArrayList<Training>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getTrainer().getUsername().equals(username) && sviTreninzi.get(i).getTrainingType().equals(TrainingType.GROUP))
				trainingsTrainer.add(sviTreninzi.get(i));
		return trainingsTrainer;
	}
	
	public ArrayList<Training> getPersonalTrainingsTrainer(String username) {
		ArrayList<Training> trainingsTrainer = new ArrayList<Training>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getTrainer().getUsername().equals(username) && sviTreninzi.get(i).getTrainingType().equals(TrainingType.PERSONAL))
				trainingsTrainer.add(sviTreninzi.get(i));
		return trainingsTrainer;
	}
	
	public Training getTraining(String name) {
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getName().equals(name))
				return sviTreninzi.get(i);
		return null;
	}
	
	public ArrayList<Training> getPersonalTrainingsFromFacilities(String name) {
		ArrayList<Training> trainingsFromFacility = new ArrayList<Training>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getSportsFacility().getName().equals(name) && sviTreninzi.get(i).getTrainingType().equals(TrainingType.PERSONAL))
				trainingsFromFacility.add(sviTreninzi.get(i));
		return trainingsFromFacility;
	}
	
	public ArrayList<Training> getOtherTrainingsFromFacilities(String name) {
		ArrayList<Training> trainingsFromFacility = new ArrayList<Training>();
		for(int i = 0; i < sviTreninzi.size(); i++)
			if(sviTreninzi.get(i).getSportsFacility().getName().equals(name) && sviTreninzi.get(i).getTrainingType().equals(TrainingType.OTHER))
				trainingsFromFacility.add(sviTreninzi.get(i));
		return trainingsFromFacility;
	}

	public void loadTrainings(SportsFacilityDAO sportsFacilityDAO, UserDAO userDAO) {
		JSONParser jsonParser = new JSONParser();

        try (FileReader reader = new FileReader(pathToRepository + "training.json"))
        {
            Object object = jsonParser.parse(reader);

            JSONArray trainings = (JSONArray) object;

            trainings.forEach( training -> sviTreninzi.add(parseTraining( (JSONObject) training, sportsFacilityDAO,userDAO ) ));
 
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
	}
	
	private Training parseTraining(JSONObject training, SportsFacilityDAO sportsFacilityDAO, UserDAO userDAO) 
    {
        JSONObject trainingObject = (JSONObject) training.get("training");

        String name = (String) trainingObject.get("name");
        String trainingType=(String) trainingObject.get("trainingType");
        String sportsFacility=(String) trainingObject.get("sportsFacility");
        double duration = (double) trainingObject.get("duration");
        String trainer = (String) trainingObject.get("trainer");
        String description = (String) trainingObject.get("description");
        String image = (String) trainingObject.get("image");
        double price = (double) trainingObject.get("price");
      
        
        Training newTraining = new Training(name, TrainingType.valueOf(trainingType),null, duration, null, description, image, price);
        if (!(sportsFacilityDAO.findFacilitiy(sportsFacility)).equals(null)) {
        	newTraining.setSportsFacility(sportsFacilityDAO.findFacilitiy(sportsFacility));
        }
        
        if(userDAO.findByUsername(trainer)!=null) {
        	newTraining.setTrainer(userDAO.findByUsername(trainer));
        }
      
		return newTraining;
    }
	
	public void saveTraining(Training training) throws IOException {
		sviTreninzi.add(training);
		
		JSONArray treninzi = new JSONArray();
		for (Training a : sviTreninzi) {
			JSONObject trainingObject = new JSONObject();
			
			trainingObject.put("name", a.getName());
			trainingObject.put("trainingType", a.getTrainingType().toString());
			trainingObject.put("sportsFacility", a.getSportsFacility().getName());
			trainingObject.put("duration", a.getDuration());
			trainingObject.put("description", a.getDescription());
			trainingObject.put("trainer", a.getTrainer().getUsername());
			trainingObject.put("image", a.getImage());
			trainingObject.put("price", a.getPrice());
			
			JSONObject trainingObject2 = new JSONObject(); 
			trainingObject2.put("training", trainingObject);
			
	        treninzi.add(trainingObject2);
		}
         
        try (FileWriter file = new FileWriter(pathToRepository + "training.json")) {
            file.write(treninzi.toJSONString()); 
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	
	
	public void saveTrainingChanges(Training training) throws IOException {
		for(Training a : sviTreninzi) {
			if(a.getName().equals(training.getName()) && a.getSportsFacility().getName().equals(training.getSportsFacility().getName())) {
				a.setDuration(training.getDuration());
				a.setTrainer(training.getTrainer());
				a.setDescription(training.getDescription());
				a.setPrice(training.getPrice());
			}
		}
		
		JSONArray treninzi = new JSONArray();
		for (Training a : sviTreninzi) {
			JSONObject trainingObject = new JSONObject();
			
			trainingObject.put("name", a.getName());
			trainingObject.put("trainingType", a.getTrainingType().toString());
			trainingObject.put("sportsFacility", a.getSportsFacility().getName());
			trainingObject.put("duration", a.getDuration());
			trainingObject.put("description", a.getDescription());
			trainingObject.put("trainer", a.getTrainer().getUsername());
			trainingObject.put("image", a.getImage());
			trainingObject.put("price", a.getPrice());
			
			JSONObject trainingObject2 = new JSONObject(); 
			trainingObject2.put("training", trainingObject);
			
	        treninzi.add(trainingObject2);
		}
         
        try (FileWriter file = new FileWriter(pathToRepository + "training.json")) {
            file.write(treninzi.toJSONString()); 
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	
}
