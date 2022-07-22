package services;

import java.io.IOException;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


import beans.SportsFacility;
import beans.Training;
import beans.TrainingHistory;
import beans.TrainingHistory.Status;
import beans.User;
import dao.SportsFacilityDAO;
import dao.TrainingHistoryDAO;
import dao.TreningDAO;
import dao.UserDAO;
import dto.TrainingDTO;
import dto.TrainingHistoryDTO;

@Path("/trainer")
public class TrenerService {
	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;
	
	@PostConstruct
	public void init() {
		if(ctx.getAttribute("SportsFacilityDAO")== null) {;
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("SportsFacilityDAO", new SportsFacilityDAO(contextPath));
		}
				
		if (ctx.getAttribute("UserDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("UserDAO", new UserDAO(contextPath, (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO")));
		}
		
		if(ctx.getAttribute("TreningDAO")== null) {;
		ctx.setAttribute("TreningDAO", new TreningDAO((SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO"),(UserDAO) ctx.getAttribute("UserDAO")));
		}
		
		if(ctx.getAttribute("TrainingHistoryDAO")== null) {;
		ctx.setAttribute("TrainingHistoryDAO", new TrainingHistoryDAO((TreningDAO) ctx.getAttribute("TreningDAO"),(UserDAO) ctx.getAttribute("UserDAO")));
		}
	}
	
	@GET
	@Path("/grupniTreninziTrenera")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> getGroupTrainingTrainer() {
		User trainer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");	
		return treningDAO.getGroupTrainingsTrainer(trainer.getUsername());
	}
	
	@GET
	@Path("/personalniTreninziTrenera")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> getPersonalTrainingTrainer() {
		User trainer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");	
		return treningDAO.getPersonalTrainingsTrainer(trainer.getUsername());
	}
	
	@GET
	@Path("/grupniZakazaniTreninziTrenera")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<TrainingHistory> getScheduledGroupTrainingTrainer() {
		User trainer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		TrainingHistoryDAO treningHDAO = (TrainingHistoryDAO) ctx.getAttribute("TrainingHistoryDAO");	
		return treningHDAO.getGroupTrainingsTrainer(trainer.getUsername());
	}
	
	@GET
	@Path("/personalniZakazaniTreninziTrenera")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<TrainingHistory> getScheduledPersonalTrainingTrainer() {
		User trainer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		TrainingHistoryDAO treningHDAO = (TrainingHistoryDAO) ctx.getAttribute("TrainingHistoryDAO");	
		return treningHDAO.getPersonalTrainingsTrainer(trainer.getUsername());
	}

	@PUT
	@Path("/otkaziTrening")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response otkaziTrening(TrainingHistoryDTO training) throws ParseException, IOException {
		User trainer = (User) request.getSession().getAttribute("ulogovanKorisnik");
		TrainingHistoryDAO treningHDAO = (TrainingHistoryDAO) ctx.getAttribute("TrainingHistoryDAO");
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm");
		TrainingHistory tH = treningHDAO.getTraining(trainer, LocalDateTime.parse(training.dataTraining, formatter));
		if (LocalDateTime.parse(training.dataTraining, formatter).isAfter(LocalDateTime.now().plusDays(2))) {		
			tH.setStatus(Status.Otkazan);
			treningHDAO.saveTrainingChanges(tH);
			return Response.status(200).build();
		} else {
			return Response.status(400).entity("Trening ne moze da se otkaze!").build();
		}

		
	}
	
	

}
