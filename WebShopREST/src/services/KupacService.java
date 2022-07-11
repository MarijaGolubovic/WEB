package services;

import java.io.IOException;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Dues;
import beans.SportsFacility;
import beans.Training;
import beans.TrainingHistory;
import beans.TrainingHistory.Status;
import beans.User.CustumerType;
import beans.User;
import beans.Dues.DuesType;
import beans.PromoKod;
import beans.Training.TrainingType;
import dao.DuesDAO;
import dao.PromoKodDAO;
import dao.SportsFacilityDAO;
import dao.TrainingHistoryDAO;
import dao.TreningDAO;
import dao.UserDAO;
import dto.DuesDTO;
import dto.TrainingDTO;
import dto.TrainingHistoryDTO;

@Path("/kupac")
public class KupacService {
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
		
		if(ctx.getAttribute("DuesDAO")== null) {;
		ctx.setAttribute("DuesDAO", new DuesDAO((UserDAO) ctx.getAttribute("UserDAO")));
		}
		
		if (ctx.getAttribute("PromoKodDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("PromoKodDAO", new PromoKodDAO(contextPath));
			
		}
	}
	
	@GET
	@Path("/grupniTreninzi")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> getGroupTraining() {
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");	
		return treningDAO.getGroupTrainings();
	}
	
	@GET
	@Path("/ostaloTreninzi")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> getOtherTraining() {
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");	
		return treningDAO.getOtherTrainings();
	}
	
	@GET
	@Path("/sviTreninzi")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> getAllTraining() {
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");	
		return treningDAO.getAllTraining();
	}
	

	
	@GET
	@Path("/personalniTreninziKupac")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<TrainingHistory> getPersonalTrainingCustemer() {
		TrainingHistoryDAO treningHDAO = (TrainingHistoryDAO) ctx.getAttribute("TrainingHistoryDAO");
		User kupac = (User) request.getSession().getAttribute("ulogovanKorisnik");		
		return treningHDAO.getPersonalTrainingsCustemer(kupac.getUsername());
	}
	
	@GET
	@Path("/grupniTreninziKupac")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<TrainingHistory> getGroupTrainingCustemer() {
		TrainingHistoryDAO treningHDAO = (TrainingHistoryDAO) ctx.getAttribute("TrainingHistoryDAO");
		User kupac = (User) request.getSession().getAttribute("ulogovanKorisnik");		
		return treningHDAO.getGroupTrainingsCustemer(kupac.getUsername());
	}
	
	@GET
	@Path("/objekti")
	@Produces(MediaType.APPLICATION_JSON)
	 public Collection<SportsFacility> getFacilities() {
        User kupac = (User) request.getSession().getAttribute("ulogovanKorisnik");
        SportsFacilityDAO dao = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
        TrainingHistoryDAO treningHDAO = (TrainingHistoryDAO) ctx.getAttribute("TrainingHistoryDAO");
        Collection<SportsFacility> objekti = new ArrayList<>();
        Collection<SportsFacility> sviObjekti= dao.findAll();
        ArrayList<TrainingHistory> treninzi=treningHDAO.getAllTraining();
        for (SportsFacility a : sviObjekti) {
            for(TrainingHistory t: treninzi) {
                if(t.getCustomer().getUsername().equals(kupac.getUsername()) && t.getTraining().getSportsFacility().getName().equals(a.getName()) && t.getStatus().equals(Status.Prosli)) {
                    objekti.add(a);
                    break;
                }
            }
        }              
        return objekti;
	}
	
	
	@GET
	@Path("/ostaliTreninziKupac")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<TrainingHistory> getOtherTrainingCustemer() {
		TrainingHistoryDAO treningHDAO = (TrainingHistoryDAO) ctx.getAttribute("TrainingHistoryDAO");
		User kupac = (User) request.getSession().getAttribute("ulogovanKorisnik");		
		return treningHDAO.getOtherTrainingsCustemer(kupac.getUsername());
	}
	
	@GET
	@Path("/personalniTreninzi")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> getPersonalTraining() {
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");	
		return treningDAO.getPersonalTrainings();
	}
	
	@GET
	@Path("/dostupneClanarine")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Dues> getAllDues() {
		Collection<Dues> dues = new ArrayList<>();
		dues.add(new Dues(DuesType.Godisnja,12500,365));
		dues.add(new Dues(DuesType.Godisnja,8500,180));
		dues.add(new Dues(DuesType.Mesecna,3500,30));
		dues.add(new Dues(DuesType.Mesecna,2500,15));
		dues.add(new Dues(DuesType.Nedeljna,1500,7));
		dues.add(new Dues(DuesType.Nedeljna,1000,3));
		return dues;
	}
	
	@GET
	@Path("/trenutnaClanarina")
	@Produces(MediaType.APPLICATION_JSON)
	public Dues getDue() throws IOException {
		DuesDAO dueDAO = (DuesDAO) ctx.getAttribute("DuesDAO");		
		User kupac = (User) request.getSession().getAttribute("ulogovanKorisnik");	
		ArrayList<Dues> clanarine =dueDAO.getAllDues();
		for (Dues d: clanarine) {
			dueDAO.saveDuesChanges(d, d);
		}
		Dues duo = dueDAO.getDue(kupac.getUsername());
		return duo;
	}
	
	@POST
	@Path("/zakaziGrupni")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response zakaziGrupni(TrainingHistoryDTO trening) throws ParseException, IOException {
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");
		TrainingHistoryDAO treningHDAO = (TrainingHistoryDAO) ctx.getAttribute("TrainingHistoryDAO");
		DuesDAO dueDAO = (DuesDAO) ctx.getAttribute("DuesDAO");		
		User kupac = (User) request.getSession().getAttribute("ulogovanKorisnik");		
		Dues duo = dueDAO.getDue(kupac.getUsername());
		Training tr=treningDAO.getTraining(trening.training);
		LocalDate ld= LocalDate.parse(trening.dataTraining);
		TrainingHistory treningZaDodavanje = new TrainingHistory(LocalDateTime.now(),ld.atTime(18,0), tr, kupac);
		if (ld.atTime(18,0).isBefore(LocalDateTime.now())) {
			return Response.status(400).entity("Ne mozete zakazati trening u proslosti!").build();
		}
		else if(duo!=null) {
			if (duo.getNumberOfAvaliableSesions()>0 && duo.getDateValid().toLocalDate().isAfter(LocalDateTime.parse(trening.dataTraining).toLocalDate())) {
			duo.posetiObjekat();
			dueDAO.saveNumberSesion(duo);
			treningHDAO.saveTraining(treningZaDodavanje);			
			return Response.status(200).build();}
			else {
				return Response.status(400).entity("Nemate odgovarajucu clanarinu!").build();
			}
		} else {
		return Response.status(400).entity("Nemate odgovarajucu clanarinu!").build();}
	}
	
	@POST
	@Path("/zakaziPersonalni")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response zakaziPersonalni(TrainingHistoryDTO trening) throws ParseException, IOException {
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");
		TrainingHistoryDAO treningHDAO = (TrainingHistoryDAO) ctx.getAttribute("TrainingHistoryDAO");
		DuesDAO dueDAO = (DuesDAO) ctx.getAttribute("DuesDAO");		
		User kupac = (User) request.getSession().getAttribute("ulogovanKorisnik");		
		Dues duo = dueDAO.getDue(kupac.getUsername());
		Training tr=treningDAO.getTraining(trening.training);
		TrainingHistory treningZaDodavanje = new TrainingHistory(LocalDateTime.now(),LocalDateTime.parse(trening.dataTraining), tr, kupac);
		if (LocalDateTime.parse(trening.dataTraining).isBefore(LocalDateTime.now())) {
			return Response.status(400).entity("Ne mozete zakazati trening u proslosti!").build();
		}
		else if(duo!=null) {
			if (duo.getNumberOfAvaliableSesions()>0 && duo.getDateValid().toLocalDate().isAfter(LocalDateTime.parse(trening.dataTraining).toLocalDate())) {
			duo.posetiObjekat();
			dueDAO.saveNumberSesion(duo);
			treningHDAO.saveTraining(treningZaDodavanje);			
			return Response.status(200).build();}
			else {
				return Response.status(400).entity("Nemate odgovarajucu clanarinu!").build();
			}
		} else {
		return Response.status(400).entity("Nemate odgovarajucu clanarinu!").build();}
	}
	
	@POST
	@Path("/zakaziOstalo")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response zakaziOstalo(TrainingHistoryDTO trening) throws ParseException, IOException {
		TreningDAO treningDAO = (TreningDAO) ctx.getAttribute("TreningDAO");
		TrainingHistoryDAO treningHDAO = (TrainingHistoryDAO) ctx.getAttribute("TrainingHistoryDAO");
		DuesDAO dueDAO = (DuesDAO) ctx.getAttribute("DuesDAO");		
		User kupac = (User) request.getSession().getAttribute("ulogovanKorisnik");		
		Dues duo = dueDAO.getDue(kupac.getUsername());
		Training tr=treningDAO.getTraining(trening.training);
		TrainingHistory treningZaDodavanje = new TrainingHistory(LocalDateTime.now(),LocalDateTime.parse(trening.dataTraining), tr, kupac);
		if (LocalDateTime.parse(trening.dataTraining).isBefore(LocalDateTime.now())) {
			return Response.status(400).entity("Ne mozete zakazati trening u proslosti!").build();
		}
		else if(duo!=null) {
			if (duo.getNumberOfAvaliableSesions()>0 && duo.getDateValid().toLocalDate().isAfter(LocalDateTime.parse(trening.dataTraining).toLocalDate())) {
			duo.posetiObjekat();
			dueDAO.saveNumberSesion(duo);
			treningHDAO.saveTraining(treningZaDodavanje);			
			return Response.status(200).build();}
			else {
				return Response.status(400).entity("Nemate odgovarajucu clanarinu!").build();
			}
		} else {
		return Response.status(400).entity("Nemate odgovarajucu clanarinu!").build();}
	}
	
	@POST
	@Path("/izborClanarineNove")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response izborClanarine(DuesDTO duesDTO) throws ParseException, IOException {
		DuesDAO dueDAO = (DuesDAO) ctx.getAttribute("DuesDAO");		
		User kupac = (User) request.getSession().getAttribute("ulogovanKorisnik");	
		Dues duo = dueDAO.getDue(kupac.getUsername());
		PromoKodDAO  promoKodDAO= (PromoKodDAO) ctx.getAttribute("PromoKodDAO");
		LocalDate date=LocalDate.now();
		LocalDate dateValid=date;
		LocalDateTime dateDT=LocalDateTime.now();
		if (duesDTO.duesType.equals(DuesType.Godisnja))
				dateValid=date.plusDays(365);
		if (duesDTO.duesType.equals(DuesType.Mesecna))
			dateValid=date.plusDays(30);
		if (duesDTO.duesType.equals(DuesType.Nedeljna))
			dateValid=date.plusDays(7);
		Date dateSQL=Date.valueOf(date);
		Date dateValidSQL=Date.valueOf(dateValid);
		Dues duoNew=new Dues(kupac.getUsername()+dateDT.toString(),duesDTO.duesType,dateSQL,dateValidSQL,duesDTO.price,kupac, true,duesDTO.numberOfSesions,duesDTO.numberOfSesions);
		PromoKod promo =promoKodDAO.getPromo(duesDTO.promoKod); 
		
		if(promo!=null && LocalDate.parse(promo.getPocetakVazenja()).isBefore(LocalDate.now()) && LocalDate.parse(promo.getKrajVazenja()).isAfter(LocalDate.now()) && promo.getBrojKoristenja()>0) {
			duoNew.setPrice(duesDTO.price*(1-promo.getProcenatUmanjenja()/100));
			promo.UseKod();
			promoKodDAO.savePromoKodChange(promo);
		}
		
		if (kupac.getCustomerType().equals(CustumerType.SILVER)) {
			duoNew.setPrice(duesDTO.price*0.97);
		}
		
		if (kupac.getCustomerType().equals(CustumerType.GOLD)) {
			duoNew.setPrice(duesDTO.price*0.95);
		}
		
		if(duo==null) {			
			dueDAO.saveDue(duoNew);
		} else {
			dueDAO.saveDue(duoNew);
			duo.setStatus(false);
			dueDAO.saveDuesChanges(duo,duo);			
		}
		return Response.status(200).build();
	}

	
	
}
