package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Date;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.StringTokenizer;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import beans.Address;
import beans.Comment;
import beans.Dues;
import beans.Location;
import beans.SportsFacility;
import beans.Dues.DuesType;
import beans.SportsFacility.Content;
import beans.SportsFacility.Status;
import beans.SportsFacility.TypeSportsFacility;

public class CommentDAO {
	public ArrayList<Comment> comments;
	private String pathToRepository;
	
	public CommentDAO() {
		// TODO Auto-generated constructor stub
	}
	
	public CommentDAO(String contextPath) {
		comments = new ArrayList<Comment>();
		
		pathToRepository = "C:\\Users\\HP\\Desktop\\6.semestar\\WEB\\Projekat - FINAL\\WEB\\WebShopREST\\WebContent\\podaci\\";
		loadComment();
	}
	
	public ArrayList<Comment> findAll() {
		return comments;
	}
	
	
	public void delete(Comment comment) throws IOException {
		for (Comment a : comments) {
			if(a.getId().equals(comment.getId()))  {
				a.setLogickiObrisan(true);
				
			}
		}
		
		JSONArray komentari = new JSONArray();
		for (Comment a : comments) {
			JSONObject commentObject = new JSONObject();
			
			commentObject.put("id", a.getId());
			commentObject.put("username", a.getUsername());
			commentObject.put("sportsFacility", a.getSportsFacility());
			commentObject.put("comment", a.getComment());
			commentObject.put("grade", a.getGrade());
			commentObject.put("logickiObrisan", a.isLogickiObrisan());
			
			JSONObject dueObject2 = new JSONObject(); 
			dueObject2.put("komentar", commentObject);
			
			komentari.add(dueObject2);
		}
         
		 try (FileWriter file = new FileWriter(pathToRepository + "comment.json")) {
	            file.write(komentari.toJSONString()); 
	            file.flush();
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	}
	
	
	
	public void loadComment() {
		JSONParser jsonParser = new JSONParser();

        try (FileReader reader = new FileReader(pathToRepository + "comment.json"))
        {
            Object object = jsonParser.parse(reader);

            JSONArray komentari = (JSONArray) object;

            komentari.forEach( komentar -> comments.add(parseComment((JSONObject) komentar)));
 
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
	}
	
	
	private Comment parseComment(JSONObject komentar) 
    {
        JSONObject commentObject = (JSONObject) komentar.get("komentar");
        
        String id = (String) commentObject.get("id");
        String username=(String) commentObject.get("username");
        String sportFacility=(String) commentObject.get("sportsFacility");
        String comment = (String) commentObject.get("comment");
        double grade = (double) commentObject.get("grade");
        boolean logickiObrisan = (boolean) commentObject.get("logickiObrisan");
        
                 
        Comment newComment = new Comment(id, username, sportFacility, comment, grade, logickiObrisan);        
		return newComment;
    }
	
	
	public void saveComment(Comment komentar) throws IOException {
		comments.add(komentar);
		
		JSONArray komentari = new JSONArray();
		for (Comment a : comments) {
			JSONObject commentObject = new JSONObject();
			
			commentObject.put("id", a.getId());
			commentObject.put("username", a.getUsername());
			commentObject.put("sportsFacility", a.getSportsFacility());
			commentObject.put("comment", a.getComment());
			commentObject.put("grade", a.getGrade());
			commentObject.put("logickiObrisan", a.isLogickiObrisan());
			
			JSONObject dueObject2 = new JSONObject(); 
			dueObject2.put("komentar", commentObject);
			
			komentari.add(dueObject2);
		}
         
        try (FileWriter file = new FileWriter(pathToRepository + "comment.json")) {
            file.write(komentari.toJSONString()); 
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
	}


}
