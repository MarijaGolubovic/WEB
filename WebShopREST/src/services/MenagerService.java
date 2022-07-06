package services;

import java.io.IOException;
import java.text.ParseException;
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

import beans.SportsFacility;
import beans.Training;
import beans.Training.TrainingType;
import beans.User;
import beans.SportsFacility.TypeSportsFacility;
import dao.SportsFacilityDAO;
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
		Training treningZaDodavanje = new Training(trening.name, TrainingType.GROUP,sportsFacility, trening.duration,trening.trainer, trening.description, trening.image);
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
		Training treningZaIzmenu = new Training(trening.name, TrainingType.GROUP,sportsFacility, trening.duration,trening.trainer, trening.description, trening.image);
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
		Training treningZaIzmenu = new Training(trening.name, TrainingType.PERSONAL,sportsFacility, trening.duration,trening.trainer, trening.description, trening.image);
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
		Training treningZaIzmenu = new Training(trening.name, TrainingType.OTHER,sportsFacility, trening.duration,trening.trainer, trening.description, trening.image);
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
		Training treningZaDodavanje = new Training(trening.name, TrainingType.PERSONAL,sportsFacility, trening.duration,trening.trainer, trening.description, trening.image);
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
		Training treningZaDodavanje = new Training(trening.name, TrainingType.OTHER,sportsFacility, trening.duration,trening.trainer, trening.description, trening.image);
		if(treningDAO.checkTrainingName(treningZaDodavanje.getName())) {
			treningZaDodavanje.setSportsFacility(sportsFacility);
			treningZaDodavanje.setTrainingType(TrainingType.OTHER);
			treningDAO.saveTraining(treningZaDodavanje);
			return Response.status(200).build();
		}
		return Response.status(400).entity("Naziv treninga vec postoji!").build();
	}
	
//	@GET
//	@Path("/artikli")
//	@Produces(MediaType.APPLICATION_JSON)
//	public List<Artikal> nadjiSveArtikle() {
//		ArtikalDAO artikalDAO = (ArtikalDAO)ctx.getAttribute("artikalDAO");
//		Korisnik menadzer = (Korisnik) request.getSession().getAttribute("ulogovanKorisnik");
//		RestoranDAO restoranDAO = (RestoranDAO) ctx.getAttribute("restoranDAO");
//		Restoran restoran = restoranDAO.vratiRestoranMenadzera(menadzer.getRestoran());
//		return restoranDAO.nadjiArtikleRestorana(restoran);
//	}
//	@GET
//	@Path("/komentari")
//	@Produces(MediaType.APPLICATION_JSON)
//	public List<Komentar> nadjiKomentare() {
//		Korisnik menadzer = (Korisnik) request.getSession().getAttribute("ulogovanKorisnik");
//		RestoranDAO restoranDAO = (RestoranDAO) ctx.getAttribute("restoranDAO");
//		KorisnikDAO korisnikDAO = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
//		Restoran restoran = restoranDAO.vratiRestoranMenadzera(menadzer.getRestoran());
//		return korisnikDAO.vratiKomentareKupaca(restoran);
//	}
//	@GET
//	@Path("/porudzbine")
//	@Produces(MediaType.APPLICATION_JSON)
//	public List<Porudzbina> nadjiPorudzbine() {
//		Korisnik menadzer = (Korisnik) request.getSession().getAttribute("ulogovanKorisnik");
//		RestoranDAO restoranDAO = (RestoranDAO) ctx.getAttribute("restoranDAO");
//		Restoran restoran = restoranDAO.vratiRestoranMenadzera(menadzer.getRestoran());
//		return restoranDAO.nadjiPorudzbineRestorana(restoran);
//	}
//	@GET
//	@Path("/porudzbineZaDostavu")
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response nadjiPorudzbineZaDostavu() {
//		Korisnik korisnik = (Korisnik) request.getSession().getAttribute("ulogovanKorisnik");
//		KorisnikDAO korisnikDAO = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
//		List<Porudzbina> porudzbine = korisnikDAO.vratiPorudzbineZaDostavu(korisnik);
//		return Response
//				.status(Response.Status.ACCEPTED).entity("SUCCESS SHOW")
//				.entity(porudzbine)
//				.build();
//	}
//	@GET
//	@Path("/nedostavljenePorudzbine")
//	@Produces(MediaType.APPLICATION_JSON)
//	public Response nadjiNedostavljene() {
//		Korisnik korisnik = (Korisnik) request.getSession().getAttribute("ulogovanKorisnik");
//		KorisnikDAO korisnikDAO = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
//		List<Porudzbina> porudzbine = korisnikDAO.vratNedostavljenePorudzbine(korisnik);
//		return Response
//				.status(Response.Status.ACCEPTED).entity("SUCCESS SHOW")
//				.entity(porudzbine)
//				.build();
//	}
//	@DELETE
//	@Path("/izbrisiArtikal")
//	@Produces(MediaType.TEXT_HTML)
//	@Consumes(MediaType.APPLICATION_JSON)
//	public Response izbrisiArtikal(String nazivSaForme){
//		ArtikalDAO artikalDAO = (ArtikalDAO) ctx.getAttribute("artikalDAO");
//		RestoranDAO restoranDAO = (RestoranDAO) ctx.getAttribute("restoranDAO");
//		String naziv = nazivSaForme.split(":")[1].replace("}", "").replace("\"", "");
//		Artikal artikal  = artikalDAO.nadjiArtikal(naziv);
//		restoranDAO.izbrisiArtikalRestorana(artikal);
//		artikalDAO.izbrisiArtikal(naziv);
//		return Response.status(200).build();
//	}
//	@POST
//	@Path("/sacuvajIzmjene")
//	@Produces(MediaType.TEXT_PLAIN)
//	@Consumes(MediaType.APPLICATION_JSON)
//	public Response sacuvajIzmjeneArtikla(ArtikalDTO artikalDTO) {
//		
//		ArtikalDAO artikalDAO = (ArtikalDAO)ctx.getAttribute("artikalDAO");
//		RestoranDAO restoranDAO = (RestoranDAO) ctx.getAttribute("restoranDAO");
//		System.out.println(artikalDTO.naziv);
//		Artikal artikalZaIzmjenu  = artikalDAO.nadjiArtikal(artikalDTO.naziv);
//		Artikal izmjenjen = new Artikal(artikalDTO.naziv, artikalDTO.cijena, artikalDTO.tipArtikla, artikalZaIzmjenu.getRestoran(),
//				artikalDTO.kolicina, artikalDTO.opis, artikalZaIzmjenu.getSlika());
//		System.out.println(artikalDTO.naziv);
//		restoranDAO.izmjeniArtikalRestorana(artikalZaIzmjenu, izmjenjen);
//		artikalDAO.izmjeniArtikal(artikalZaIzmjenu, izmjenjen);
//		request.getSession().setAttribute("ulogovanKorisnik", izmjenjen);
//		return Response
//				.status(Response.Status.ACCEPTED).entity("SUCCESS CHANGE")
//				.build();
//	}
//	@PUT
//	@Path("/promijeniStatusPorudzbine")
//	@Produces(MediaType.TEXT_HTML)
//	@Consumes(MediaType.APPLICATION_JSON)
//	public Response promijeniStatusPorudzbine(PorudzbinaDTO porudzbinaDTO) throws ParseException {
//		KorisnikDAO korisnikDAO = (KorisnikDAO) ctx.getAttribute("korisnikDAO");
//		if(korisnikDAO.promijeniStatusPorudzbine(porudzbinaDTO)) {
//			return Response.status(200).build();
//		}
//		return Response.status(400).entity("Pogresna kolicina unesena!").build();
//	}
//	@PUT
//	@Path("/otvoriRestoran/{id}")
//	@Produces(MediaType.TEXT_HTML)
//	@Consumes(MediaType.APPLICATION_JSON)
//	public Response otvoriRestoran(@PathParam("id") int id)throws ParseException{
//		RestoranDAO restoranDAO = (RestoranDAO) ctx.getAttribute("restoranDAO");
//		Korisnik admin = (Korisnik) request.getSession().getAttribute("ulogovanKorisnik");
//		System.out.println(id);
//		restoranDAO.otvoriRestoran(id);
//		return Response.status(200).build();
//		
//	}
//	@PUT
//	@Path("/zatvoriRestoran/{id}")
//	@Produces(MediaType.TEXT_HTML)
//	@Consumes(MediaType.APPLICATION_JSON)
//	public Response zatvoriRestoran(@PathParam("id") int id)throws ParseException{
//		RestoranDAO restoranDAO = (RestoranDAO) ctx.getAttribute("restoranDAO");
//		Korisnik admin = (Korisnik) request.getSession().getAttribute("ulogovanKorisnik");
//		System.out.println(id);
//		restoranDAO.zatvoriRestoran(id);
//		return Response.status(200).build();
		
	
}
