package dao;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import beans.TrainingHistory;
import beans.Dues;
import beans.Training;
import beans.Dues.DuesType;
import beans.Training.TrainingType;

public class DuesDAO {
	private ArrayList<Dues> sveClanarine;
	private String pathToRepository;
	
	public DuesDAO(UserDAO userDAO) {
		sveClanarine = new ArrayList<Dues>();
		//izmenjenTrening = new TrainingHistory();
		pathToRepository = "C:\\Users\\HP\\Desktop\\6.semestar\\WEB\\Projekat - FINAL\\WEB\\WebShopREST\\WebContent\\podaci\\";
		loadDues(userDAO);
	}
	
	public ArrayList<Dues> getAllDues() {
		return sveClanarine;
	}
	
	public Dues getDue(String username) {
		for(int i = 0; i < sveClanarine.size(); i++) {
				if(sveClanarine.get(i).getCustumer().getUsername().equals(username))
					return sveClanarine.get(i);
		}
			return null;
	}
	


	public void loadDues(UserDAO userDAO) {
		JSONParser jsonParser = new JSONParser();

        try (FileReader reader = new FileReader(pathToRepository + "dues.json"))
        {
            Object object = jsonParser.parse(reader);

            JSONArray clanarine = (JSONArray) object;

            clanarine.forEach( clanarina -> sveClanarine.add(parseDue( (JSONObject) clanarina, userDAO) ));
 
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
	}
	
	private Dues parseDue(JSONObject clanarina, UserDAO userDAO) 
    {
        JSONObject dueObject = (JSONObject) clanarina.get("clanarina");
        String id = (String) dueObject.get("id");
        String duesType=(String) dueObject.get("duesType");
        String paymentDate=(String) dueObject.get("paymentDate");
        String dateValid = (String) dueObject.get("dateValid");
        double price = (double) dueObject.get("price");
        String custumer = (String) dueObject.get("custumer");
        boolean status = (boolean) dueObject.get("status");
        double numberOfSesions = (double) dueObject.get("numberOfSesions");
        double numberOfAvaliableSesions = (double) dueObject.get("numberOfAvaliableSesions");
     
            
        Dues newDue = new Dues(id,DuesType.valueOf(duesType),Date.valueOf(paymentDate),Date.valueOf(dateValid),price,userDAO.findByUsername(custumer),status,numberOfSesions,numberOfAvaliableSesions);
        
            
		return newDue;
    }
	
	public void saveDue(Dues dues) throws IOException {
		sveClanarine.add(dues);
		
		JSONArray clanarine = new JSONArray();
		for (Dues a : sveClanarine) {
			JSONObject dueObject = new JSONObject();
			
			dueObject.put("id", a.getId());
			dueObject.put("duesType", a.getDuesType().toString());
			dueObject.put("paymentDate", a.getPaymentDate().toString());
			dueObject.put("dateValid", a.getDateValid().toString());
			dueObject.put("price", a.getPrice());
			dueObject.put("custumer", a.getCustumer().getUsername());
			dueObject.put("status", a.isStatus());
			dueObject.put("numberOfSesions", a.getNumberOfSesions());
			dueObject.put("numberOfAvaliableSesions", a.getNumberOfAvaliableSesions());
			
			JSONObject dueObject2 = new JSONObject(); 
			dueObject2.put("clanarina", dueObject);
			
			clanarine.add(dueObject2);
		}
         
        try (FileWriter file = new FileWriter(pathToRepository + "dues.json")) {
            file.write(clanarine.toJSONString()); 
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
	
	
	
	public void saveDuesChanges(Dues old, Dues due) throws IOException {
		for(Dues a : sveClanarine) {
			if(a.getId().equals(old.getId()))  {
				a.setNumberOfAvaliableSesions(due.getNumberOfAvaliableSesions());	
				a.setDateValid(due.getDateValid());
				a.setDuesType(due.getDuesType());
				a.setPaymentDate(due.getPaymentDate());
				a.setId(due.getCustumer().getUsername()+due.getPaymentDate().toString());
				a.setPrice(due.getPrice());
				a.setStatus(due.isStatus());
				a.setNumberOfSesions(due.getNumberOfSesions());
				a.setCustumer(due.getCustumer());
				
			}
		}
		
		JSONArray clanarine = new JSONArray();
		for (Dues a : sveClanarine) {
			JSONObject dueObject = new JSONObject();
			
			dueObject.put("id", a.getId());
			dueObject.put("duesType", a.getDuesType().toString());
			dueObject.put("paymentDate", a.getPaymentDate().toString());
			dueObject.put("dateValid", a.getDateValid().toString());
			dueObject.put("price", a.getPrice());
			dueObject.put("custumer", a.getCustumer().getUsername());
			dueObject.put("status", a.isStatus());
			dueObject.put("numberOfSesions", a.getNumberOfSesions());
			dueObject.put("numberOfAvaliableSesions", a.getNumberOfAvaliableSesions());
			
			JSONObject dueObject2 = new JSONObject(); 
			dueObject2.put("clanarina", dueObject);
			
			clanarine.add(dueObject2);
		}
         
		 try (FileWriter file = new FileWriter(pathToRepository + "dues.json")) {
	            file.write(clanarine.toJSONString()); 
	            file.flush();
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	}
	
	public void saveNumberSesion(Dues due) throws IOException {
		for(Dues a : sveClanarine) {
			if(a.getId().equals(due.getId()))  {
				a.setNumberOfAvaliableSesions(due.getNumberOfAvaliableSesions());					
			}
		}
		
		JSONArray clanarine = new JSONArray();
		for (Dues a : sveClanarine) {
			JSONObject dueObject = new JSONObject();
			
			dueObject.put("id", a.getId());
			dueObject.put("duesType", a.getDuesType().toString());
			dueObject.put("paymentDate", a.getPaymentDate().toString());
			dueObject.put("dateValid", a.getDateValid().toString());
			dueObject.put("price", a.getPrice());
			dueObject.put("custumer", a.getCustumer().getUsername());
			dueObject.put("status", a.isStatus());
			dueObject.put("numberOfSesions", a.getNumberOfSesions());
			dueObject.put("numberOfAvaliableSesions", a.getNumberOfAvaliableSesions());
			
			JSONObject dueObject2 = new JSONObject(); 
			dueObject2.put("clanarina", dueObject);
			
			clanarine.add(dueObject2);
		}
         
		 try (FileWriter file = new FileWriter(pathToRepository + "dues.json")) {
	            file.write(clanarine.toJSONString()); 
	            file.flush();
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	}

}
