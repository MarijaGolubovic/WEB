package dao;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import beans.Comment;
import beans.Dues;
import beans.PromoKod;

public class PromoKodDAO {
	
	public ArrayList<PromoKod> promoKodovi = new ArrayList<PromoKod>();
	private String pathToRepository;
	
	public PromoKodDAO() {
		// TODO Auto-generated constructor stub
	}
	
	public PromoKodDAO(String contextPath) {
		promoKodovi =  new ArrayList<PromoKod>();
		pathToRepository = "C:\\Users\\HP\\Desktop\\6.semestar\\WEB\\Projekat - FINAL\\WEB\\WebShopREST\\WebContent\\podaci";
		loadPromoKod();
	}
	
	public ArrayList<PromoKod> findAll() {
		return promoKodovi;
	}
	
	public PromoKod getPromo(String kod) {
		for(int i = 0; i < promoKodovi.size(); i++) {
				if(promoKodovi.get(i).getOznaka().equals(kod))
					return promoKodovi.get(i);
		}
			return null;
	}
	
	
	public void loadPromoKod() {
		JSONParser jsonParser = new JSONParser();

        try (FileReader reader = new FileReader(pathToRepository + "promoKod.json"))
        {
            Object object = jsonParser.parse(reader);

            JSONArray promoCods = (JSONArray) object;

            promoCods.forEach( promoKod -> promoKodovi.add(parsePromoKod((JSONObject) promoKod)));
 
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
	}
	
	private PromoKod parsePromoKod(JSONObject promoKod) 
    {
        JSONObject promoKodObject = (JSONObject) promoKod.get("promoKod");
        
        String oznaka = (String) promoKodObject.get("oznaka");
        String pocetakVazenja=(String) promoKodObject.get("pocetakVazenja");
        String krajVazenja=(String) promoKodObject.get("krajVazenja");
        double brojKoristenja = (double) promoKodObject.get("brojKoristenja");
        double procenatUmanjenja = (double) promoKodObject.get("procenatUmanjenja");
                 
       PromoKod promo = new PromoKod(oznaka, pocetakVazenja, krajVazenja, brojKoristenja, procenatUmanjenja);         
		return promo;
    }
	
	
	public void savePromoKod(PromoKod promoKod) throws IOException {
		promoKodovi.add(promoKod);
		
		JSONArray kodovi = new JSONArray();
		for (PromoKod a : promoKodovi) {
			JSONObject promoKodObject = new JSONObject();
			
			promoKodObject.put("oznaka", a.getOznaka());
			promoKodObject.put("pocetakVazenja", a.getPocetakVazenja());
			promoKodObject.put("krajVazenja", a.getKrajVazenja());
			promoKodObject.put("brojKoristenja", a.getBrojKoristenja());
			promoKodObject.put("procenatUmanjenja", a.getProcenatUmanjenja());
			
			JSONObject dueObject2 = new JSONObject(); 
			dueObject2.put("promoKod", promoKodObject);
			
			kodovi.add(dueObject2);
		}
         
        try (FileWriter file = new FileWriter(pathToRepository + "promoKod.json")) {
            file.write(kodovi.toJSONString()); 
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}
        
    	public void savePromoKodChange(PromoKod promoKod) throws IOException {
    		for(PromoKod a : promoKodovi) {
    			if(a.getOznaka().equals(promoKod.getOznaka()))  {
    				a.setBrojKoristenja(promoKod.getBrojKoristenja());	
   				
    			}
    		}
    		
    		JSONArray kodovi = new JSONArray();
    		for (PromoKod a : promoKodovi) {
    			JSONObject promoKodObject = new JSONObject();
    			
    			promoKodObject.put("oznaka", a.getOznaka());
    			promoKodObject.put("pocetakVazenja", a.getPocetakVazenja());
    			promoKodObject.put("krajVazenja", a.getKrajVazenja());
    			promoKodObject.put("brojKoristenja", a.getBrojKoristenja());
    			promoKodObject.put("procenatUmanjenja", a.getProcenatUmanjenja());
    			
    			JSONObject dueObject2 = new JSONObject(); 
    			dueObject2.put("promoKod", promoKodObject);
    			
    			kodovi.add(dueObject2);
    		}
             
            try (FileWriter file = new FileWriter(pathToRepository + "promoKod.json")) {
                file.write(kodovi.toJSONString()); 
                file.flush();
            } catch (IOException e) {
                e.printStackTrace();
            }
	}

	
	

}
