package services;

import java.awt.PageAttributes.MediaType;
import java.io.IOException;
import java.sql.Time;
import java.text.ParseException;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import beans.Address;
import beans.Comment;
import beans.Location;
import beans.SportsFacility;
import beans.User;
import beans.SportsFacility.Content;
import dao.PromoKodDAO;
import dao.SportsFacilityDAO;
import dao.UserDAO;
import dto.SportsFacilityDTO;

@Path("/administrator")
public class AdministratorServices {
	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;
	
	public AdministratorServices() {
		// TODO Auto-generated constructor stub
	}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("UserDAO")== null) {;
			ctx.setAttribute("UserDAO", new UserDAO());
		}
		if(ctx.getAttribute("SportsFacilityDAO")== null) {;
			ctx.setAttribute("SportsFacilityDAO", new SportsFacilityDAO());
		}
		

	}
	
	@GET
	@Path("/korisnici")
	public Collection<User> nadjiSveKorisnike() {
		UserDAO korisnikDAO = (UserDAO) ctx.getAttribute("UserDAO");
		return korisnikDAO.findAll();
	}
	
	@GET
	@Path("/objekti")
	public Collection<SportsFacility> nadjiSveObjekte() {
		SportsFacilityDAO restoranDAO = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		return restoranDAO.findAll();
	}
	
	@POST
	@Path("/dodajObjekat")
	public Response dodajObjekat(SportsFacilityDTO objekatDTO) throws ParseException, IOException {
		SportsFacilityDAO objekatDAO = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		double sirina = Double.parseDouble(objekatDTO.longlat.split(",")[0].trim());
		double duzina = Double.parseDouble(objekatDTO.longlat.split(",")[1].trim());
		List<Content> content = new ArrayList<SportsFacility.Content>();
		content.add(objekatDTO.sadrzaj);
		UserDAO korisnikDAO = (UserDAO) ctx.getAttribute("UserDAO");
		Collection<User> users= korisnikDAO.findAll();
		
		Location location = new Location(new Address(objekatDTO.ulica, objekatDTO.broj, objekatDTO.grad, null, objekatDTO.postanskiBroj), sirina, duzina);
		SportsFacility objekat = new SportsFacility(objekatDTO.naziv, objekatDTO.tipObjekta, content, objekatDTO.working, location, objekatDTO.averageGrade, LocalTime.parse("07:00"),LocalTime.parse("23:00") , objekatDTO.logo);
		for (User user : users) {
			if(objekatDTO.menadzer.equals(user.username)) {
				user.sportsFacility=objekat;
				korisnikDAO.saveUserChange(user.username, user);
				break;
			}
		}
		
		objekatDAO.save(objekat);	
		return Response.status(200).build();
	}
	
	@GET
	@Path("/slobodniMenadzeri")
	public List<User> nadjiSlobodneMenadzere() {
		UserDAO korisnikDAO = (UserDAO) ctx.getAttribute("UserDAO");
		return korisnikDAO.nadjiSlobodneMenadzere();
	}
	
	
	
	
}
