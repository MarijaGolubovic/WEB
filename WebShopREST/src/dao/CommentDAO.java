package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.StringTokenizer;

import beans.Address;
import beans.Comment;
import beans.Location;
import beans.SportsFacility;
import beans.SportsFacility.Content;
import beans.SportsFacility.Status;
import beans.SportsFacility.TypeSportsFacility;

public class CommentDAO {
	public HashMap<String, Comment> comments = new HashMap<String, Comment>();
	
	public CommentDAO() {
		// TODO Auto-generated constructor stub
	}
	
	public CommentDAO(String contextPath) {
		loadProducts(contextPath);
	}
	
	public Collection<Comment> findAll() {
		comments.put("12", new Comment("12", "korisnik", "teretana", "neki tekst", 10, false));
		return comments.values();
	}
	
	
	private void loadProducts(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/komentari.txt");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			String line, id = "", username = "",objekat = "", tekstKomentara="";
			int ocjena=0;
			boolean logickiObrisan=false;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					id = st.nextToken().trim();
					username = st.nextToken().trim();
					objekat = st.nextToken().trim();
					tekstKomentara=st.nextToken().trim();
					ocjena=Integer.parseInt(st.nextToken().trim());
					logickiObrisan=Boolean.parseBoolean(st.nextToken().trim());
				}
				 comments.put(id, new Comment(id, username, objekat, tekstKomentara, ocjena, logickiObrisan));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if ( in != null ) {
				try {
					in.close();
				}
				catch (Exception e) { }
			}
		}
		
	}


}
