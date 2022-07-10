package services;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.jasper.tagplugins.jstl.core.ForEach;

import beans.SportsFacility;
import beans.Training;
import beans.TrainingHistory;
import beans.TrainingHistory.Status;
import beans.Training.TrainingType;
import beans.User;
import beans.SportsFacility.TypeSportsFacility;
import dao.SportsFacilityDAO;
import dao.TrainingHistoryDAO;
import dao.TreningDAO;
import dao.UserDAO;
import dto.TrainingDTO;

@Path("/menager")
public class MenagerService {
	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;
	
	
	public MenagerService() {}
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("SportsFacilityDAO")== null) {;
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("SportsFacilityDAO", new SportsFacilityDAO(contextPath));
		}
				
		if (ctx.getAttribute("UserDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("UserDAO", new UserDAO(contextPath));
		}
		
		if(ctx.getAttribute("TreningDAO")== null) {;
		ctx.setAttribute("TreningDAO", new TreningDAO((SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO"),(UserDAO) ctx.getAttribute("UserDAO")));
		}
		
		if(ctx.getAttribute("TrainingHistoryDAO")== null) {;
		ctx.setAttribute("TrainingHistoryDAO", new TrainingHistoryDAO((TreningDAO) ctx.getAttribute("TreningDAO"),(UserDAO) ctx.getAttribute("UserDAO")));
		}
	
	}
	
	@GET
	@Path("/objekatMenadzera")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getFacilityMenager() {
		User menadzer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		SportsFacilityDAO dao = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		SportsFacility objekat = dao.findFacilitiy(menadzer.getSportsFacility().getName());
		
		return Response
				.status(Response.Status.ACCEPTED).entity("SUCCESS SHOW")
				.entity(objekat)
				.build();
	}
	
	@GET
	@Path("/grupniTreninziMenadzera")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> getGroupTrainingMenager() {
		User menadzer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		SportsFacilityDAO dao = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");
		SportsFacility objekat = dao.findFacilitiy(menadzer.getSportsFacility().getName());
		
		return treningDAO.getGroupTrainingsFromFacilities(objekat.getName());
	}
	
	@GET
	@Path("/treneri")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getTrainers() {
		User menadzer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		SportsFacilityDAO dao = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		UserDAO userDAO = (UserDAO) ctx.getAttribute("UserDAO");
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");
		SportsFacility objekat = dao.findFacilitiy(menadzer.getSportsFacility().getName());
		Collection<User> treneri = new ArrayList<>();
		Collection<User> users= userDAO.findAll();
		ArrayList<Training> treninzi=treningDAO.getAllTraining();
		for (User a : users) {
			for(Training t: treninzi) {
				if(t.getTrainer().getUsername().equals(a.getUsername())&& t.getSportsFacility().getName().equals(objekat.getName())) {
					treneri.add(a);
					break;
				}
			}
		}				
		return treneri;
	}
	
	@GET
	@Path("/korisnici")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getUsers() {
		User menadzer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		SportsFacilityDAO dao = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		UserDAO userDAO = (UserDAO) ctx.getAttribute("UserDAO");
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");
		SportsFacility objekat = dao.findFacilitiy(menadzer.getSportsFacility().getName());
		Collection<User> korisnici = new ArrayList<>();
		Collection<User> users= userDAO.findAll();
		ArrayList<Training> treninzi=treningDAO.getAllTraining();
		for (User a : users) {
			for(Training t: treninzi) {
				if(t.getTrainer().getUsername().equals(a.getUsername())&& t.getSportsFacility().getName().equals(objekat.getName())) {
					korisnici.add(a);
					break;
				}
			}
		}
		TrainingHistoryDAO treningHDAO = (TrainingHistoryDAO) ctx.getAttribute("TrainingHistoryDAO");
		ArrayList<TrainingHistory> treninziH=treningHDAO.getAllTraining();
		for (User a : users) {
			for(TrainingHistory t: treninziH) {
				if(t.getCustomer().getUsername().equals(a.getUsername()) && t.getTraining().getSportsFacility().getName().equals(objekat.getName())&& t.getStatus().equals(Status.Prosli)) {
					korisnici.add(a);
					break;
				}
			}
		}	
		return korisnici;
	}
	
	@GET
	@Path("/kupci")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getCustomers() {
		User menadzer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		SportsFacilityDAO dao = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		UserDAO userDAO = (UserDAO) ctx.getAttribute("UserDAO");
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");
		SportsFacility objekat = dao.findFacilitiy(menadzer.getSportsFacility().getName());
		TrainingHistoryDAO treningHDAO = (TrainingHistoryDAO) ctx.getAttribute("TrainingHistoryDAO");
		Collection<User> kupci = new ArrayList<>();
		Collection<User> users= userDAO.findAll();
		ArrayList<TrainingHistory> treninzi=treningHDAO.getAllTraining();
		for (User a : users) {
			for(TrainingHistory t: treninzi) {
				if(t.getCustomer().getUsername().equals(a.getUsername()) && t.getTraining().getSportsFacility().getName().equals(objekat.getName())&& t.getStatus().equals(Status.Prosli)) {
					kupci.add(a);
					break;
				}
			}
		}				
		return kupci;
	}
	
	
	@GET
	@Path("/personalniTreninziMenadzera")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> getPersonalTrainingMenager() {
		User menadzer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		SportsFacilityDAO dao = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");
		SportsFacility objekat = dao.findFacilitiy(menadzer.getSportsFacility().getName());
		
		return treningDAO.getPersonalTrainingsFromFacilities(objekat.getName());
	}
	
	@GET
	@Path("/ostaliTreninziMenadzera")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> getOtherTrainingMenager() {
		User menadzer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		SportsFacilityDAO dao = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");
		SportsFacility objekat = dao.findFacilitiy(menadzer.getSportsFacility().getName());
		
		return treningDAO.getOtherTrainingsFromFacilities(objekat.getName());
	}
	
	
	@POST
	@Path("/dodajTrening")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response dodajTrening(TrainingDTO trening) throws ParseException, IOException {
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");
		User menadzer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		SportsFacilityDAO sportsFacilityDAO = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		SportsFacility sportsFacility = sportsFacilityDAO.findFacilitiy(menadzer.getSportsFacility().getName());
		Training treningZaDodavanje = new Training(trening.name, TrainingType.GROUP,sportsFacility, trening.duration,trening.trainer, trening.description, trening.image, trening.price);
		if(treningDAO.checkTrainingName(treningZaDodavanje.getName())) {
			treningZaDodavanje.setSportsFacility(sportsFacility);
			treningZaDodavanje.setTrainingType(TrainingType.GROUP);
			treningDAO.saveTraining(treningZaDodavanje);
			return Response.status(200).build();
		}
		return Response.status(400).entity("Naziv treninga vec postoji!").build();
	}
	
	@POST
	@Path("/izmeniGrupniTrening")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response izmeniGrupniTrening(TrainingDTO trening) throws ParseException, IOException {
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");
		User menadzer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		SportsFacilityDAO sportsFacilityDAO = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		SportsFacility sportsFacility = sportsFacilityDAO.findFacilitiy(menadzer.getSportsFacility().getName());
		Training treningZaIzmenu = new Training(trening.name, TrainingType.GROUP,sportsFacility, trening.duration,trening.trainer, trening.description, trening.image, trening.price);
		treningDAO.saveTrainingChanges(treningZaIzmenu);

			return Response
					.status(Response.Status.ACCEPTED).entity("SUCCESS CHANGE")
					.build();
	}
	
	@POST
	@Path("/izmeniPersonalniTrening")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response izmeniPersonalniTrening(TrainingDTO trening) throws ParseException, IOException {
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");
		User menadzer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		SportsFacilityDAO sportsFacilityDAO = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		SportsFacility sportsFacility = sportsFacilityDAO.findFacilitiy(menadzer.getSportsFacility().getName());
		Training treningZaIzmenu = new Training(trening.name, TrainingType.PERSONAL,sportsFacility, trening.duration,trening.trainer, trening.description, trening.image, trening.price);
		treningDAO.saveTrainingChanges(treningZaIzmenu);

			return Response
					.status(Response.Status.ACCEPTED).entity("SUCCESS CHANGE")
					.build();
	}
	
	@POST
	@Path("/izmeniOstaloTrening")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response izmeniOstaloTrening(TrainingDTO trening) throws ParseException, IOException {
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");
		User menadzer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		SportsFacilityDAO sportsFacilityDAO = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		SportsFacility sportsFacility = sportsFacilityDAO.findFacilitiy(menadzer.getSportsFacility().getName());
		Training treningZaIzmenu = new Training(trening.name, TrainingType.OTHER,sportsFacility, trening.duration,trening.trainer, trening.description, trening.image, trening.price);
		treningDAO.saveTrainingChanges(treningZaIzmenu);

			return Response
					.status(Response.Status.ACCEPTED).entity("SUCCESS CHANGE")
					.build();
	}
	
	@POST
	@Path("/dodajTreningPer")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response dodajTreningPer(TrainingDTO trening) throws ParseException, IOException {
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");
		User menadzer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		SportsFacilityDAO sportsFacilityDAO = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		SportsFacility sportsFacility = sportsFacilityDAO.findFacilitiy(menadzer.getSportsFacility().getName());
		Training treningZaDodavanje = new Training(trening.name, TrainingType.PERSONAL,sportsFacility, trening.duration,trening.trainer, trening.description, trening.image, trening.price);
		if(treningDAO.checkTrainingName(treningZaDodavanje.getName())) {
			treningZaDodavanje.setSportsFacility(sportsFacility);
			treningZaDodavanje.setTrainingType(TrainingType.PERSONAL);
			treningDAO.saveTraining(treningZaDodavanje);
			return Response.status(200).build();
		}
		return Response.status(400).entity("Naziv treninga vec postoji!").build();
	}
	
	@POST
	@Path("/dodajTreningOst")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response dodajTreningOst(TrainingDTO trening) throws ParseException, IOException {
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");
		User menadzer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		SportsFacilityDAO sportsFacilityDAO = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		SportsFacility sportsFacility = sportsFacilityDAO.findFacilitiy(menadzer.getSportsFacility().getName());
		Training treningZaDodavanje = new Training(trening.name, TrainingType.OTHER,sportsFacility, trening.duration,trening.trainer, trening.description, trening.image, trening.price);
		if(treningDAO.checkTrainingName(treningZaDodavanje.getName())) {
			treningZaDodavanje.setSportsFacility(sportsFacility);
			treningZaDodavanje.setTrainingType(TrainingType.OTHER);
			treningDAO.saveTraining(treningZaDodavanje);
			return Response.status(200).build();
		}
		return Response.status(400).entity("Naziv treninga vec postoji!").build();
	}
	
	@GET
	@Path("/personalniZakazaniTreninzi")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<TrainingHistory> getPersonalTraining() {
		TrainingHistoryDAO treningHDAO = (TrainingHistoryDAO) ctx.getAttribute("TrainingHistoryDAO");
		User menadzer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		SportsFacilityDAO sportsFacilityDAO = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		SportsFacility sportsFacility = sportsFacilityDAO.findFacilitiy(menadzer.getSportsFacility().getName());		
		return treningHDAO.getPersonalTrainingsFromFacilities(sportsFacility.getName());
	}
	
	@GET
	@Path("/grupniZakazaniTreninzi")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<TrainingHistory> getGroupTraining() {
		TrainingHistoryDAO treningHDAO = (TrainingHistoryDAO) ctx.getAttribute("TrainingHistoryDAO");
		User menadzer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		SportsFacilityDAO sportsFacilityDAO = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		SportsFacility sportsFacility = sportsFacilityDAO.findFacilitiy(menadzer.getSportsFacility().getName());		
		return treningHDAO.getGroupTrainingsFromFacilities(sportsFacility.getName());
	}
	
	@GET
	@Path("/ostaliZakazaniTreninzi")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<TrainingHistory> getOtherTraining() {
		TrainingHistoryDAO treningHDAO = (TrainingHistoryDAO) ctx.getAttribute("TrainingHistoryDAO");
		User menadzer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		SportsFacilityDAO sportsFacilityDAO = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		SportsFacility sportsFacility = sportsFacilityDAO.findFacilitiy(menadzer.getSportsFacility().getName());		
		return treningHDAO.getOtherTrainingsFromFacilities(sportsFacility.getName());
	}
		
	
}
