package services;


import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Random;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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

import beans.Comment;
import beans.PromoKod;
import beans.SportsFacility;
import beans.User;
import beans.User.Role;
import dao.CommentDAO;
import dao.PromoKodDAO;
import dao.SportsFacilityDAO;
import dao.UserDAO;
import dto.CommentDTO;
import dto.NewUserDTO;
import dto.UserDTO;

@Path("/login")
public class UserServices {
	
	@Context
	ServletContext ctx;
	@Context
	HttpServletRequest request;

	public UserServices() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("UserDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("UserDAO", new UserDAO(contextPath));
			
		}
		if (ctx.getAttribute("CommentDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("CommentDAO", new CommentDAO(contextPath));
			
		}
		
		if (ctx.getAttribute("PromoKodDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("PromoKodDAO", new PromoKodDAO(contextPath));
			
		}
	}


	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(User user) {
		UserDAO usersDAO = (UserDAO) ctx.getAttribute("UserDAO");

		 User korisnikZaLogovanje = usersDAO.findByUsername(user.getUsername());
		 
		 if (korisnikZaLogovanje == null) {
				System.out.println("Nema takvog usera");
				return Response.status(Response.Status.BAD_REQUEST).entity("Password or username are incorrect, try again")
						.build();
			}	
			
			
			
			if (!korisnikZaLogovanje.getPassword().equals(user.getPassword())) {
				System.out.println("SIFRE NISU JEDNAKE");
				return Response.status(Response.Status.BAD_REQUEST).entity("Password or username are incorrect, try again")
						.build();
			}
			
		request.getSession().setAttribute("ulogovanKorisnik", korisnikZaLogovanje); 
		if (korisnikZaLogovanje.getRole() == Role.ADMIN) {
			return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/administrator.html").build();

		} else if (korisnikZaLogovanje.getRole() == Role.CUSTUMER) {
			return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/kupac.html").build();

		} else if (korisnikZaLogovanje.getRole() == Role.MENAGER) {
			return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/menager.html").build();

		} else if (korisnikZaLogovanje.getRole() == Role.TRAINER) {
			return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/trener.html").build();

		} 

		return Response.status(Response.Status.ACCEPTED).entity("WebShopREST/").build(); 
	}

	@GET
	@Path("/odjava")
	@Produces(MediaType.TEXT_HTML)
	public Response odjaviKorisnika() {
		HttpSession session = request.getSession();
		if(session != null && session.getAttribute("ulogovanKorisnik") != null) {
			session.invalidate();
		}
		return Response
					.status(Response.Status.ACCEPTED).entity("SUCCESS LOGOUT")
					.build();
	}
	
	@POST
	@Path("/registracija")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response registracija(UserDTO user) throws ParseException {
		UserDAO korisnikDAO = (UserDAO) ctx.getAttribute("UserDAO");
		if(!korisnikDAO.postojiKorisnickoIme(user.username)) {
			korisnikDAO.save(user);	
			return Response.status(200).build();
		}
	return Response.status(400).entity("Korisnicko ime vec postoji!").build();	
	}
	
	@POST
	@Path("/dodajNovogKorisnika")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response dodajNovogKorisnika(NewUserDTO user) throws ParseException {
		UserDAO korisnikDAO = (UserDAO) ctx.getAttribute("UserDAO");
		if(!korisnikDAO.postojiKorisnickoIme(user.username)) {
			korisnikDAO.saveNewUser(user);	
			return Response.status(200).build();
		}
	return Response.status(400).entity("Korisnicko ime vec postoji!").build();	
	}
	
	@GET
	@Path("/treneri")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getTrainers() {
		UserDAO korisnikDAO = (UserDAO) ctx.getAttribute("UserDAO");
		return korisnikDAO.getTrainers();
	}
	
	@GET
	@Path("/profil")
	@Produces(MediaType.APPLICATION_JSON)
	public User getUser() {
		User korisnik = (User) request.getSession().getAttribute("ulogovanKorisnik");
		return korisnik;
	}
	

	
	@DELETE
	@Path("/izbrisiKorisnika/{korisnickoIme}")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response izbrisiKorisnika(@PathParam("korisnickoIme") String korisnickoIme) throws ParseException {
		UserDAO korisnikDAO = (UserDAO) ctx.getAttribute("UserDAO");
		if(korisnickoIme != null) {
			korisnikDAO.delete(korisnickoIme);
			return Response.status(200).build();
		}
		return Response.status(400).build();
	}
	
	@POST
	@Path("/dodajMenadzera")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response dodajMenadzera(UserDTO korisnik) throws ParseException {
		UserDAO korisnikDAO = (UserDAO) ctx.getAttribute("UserDAO");
		if(!korisnikDAO.postojiKorisnickoIme(korisnik.username)) {
			korisnikDAO.saveMenager(korisnik);	
			return Response.status(200).build();
		}
		return Response.status(400).entity("Korisnicko ime je zauzeto!").build();
	}
	
	@PUT
	@Path("/izmeniProfil")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response izmeniProfil(UserDTO korisnik) throws ParseException {
		UserDAO korisnikDAO = (UserDAO) ctx.getAttribute("UserDAO");
		User korisnikU = (User) request.getSession().getAttribute("ulogovanKorisnik");
		String username= korisnikU.getUsername();
		korisnikU.setFirstName(korisnik.firstName);
		korisnikU.setLastName(korisnik.lastName);
		korisnikU.setUsername(korisnik.username);
		korisnikU.setPassword(korisnik.password);
		korisnikU.setGender(korisnik.gender);
		if(username.equals(korisnik.username)) {
			korisnikDAO.update(username, korisnikU);	
			return Response.status(200).build();
		} else
		if(!korisnikDAO.postojiKorisnickoIme(korisnik.username)) {
			korisnikDAO.update(username, korisnikU);	
			return Response.status(200).build();
		}else 
			return Response.status(400).entity("Korisnicko ime je zauzeto!").build();
	}


	@GET
	@Path("/prikaziKomentare")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> getComment() {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("CommentDAO");
		return dao.findAll();
	}
	
	@DELETE
	@Path("/izbrisiKomentar/{id}")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response izbrisiKomentar(@PathParam("id") String id) throws ParseException, IOException {
		CommentDAO korisnikDAO = (CommentDAO) ctx.getAttribute("CommentDAO");
		ArrayList<Comment> komentari = korisnikDAO.findAll();
		for (Comment komentar : komentari) {
			if(komentar.getId().equals(id)) {
				korisnikDAO.delete(komentar);
				return Response.status(200).build();
			}
		}
		
		return Response.status(400).build();
	}
	
	
	@POST
	@Path("/dodajKomentar")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response dodajKomentar(CommentDTO komentar) throws ParseException, IOException {
		CommentDAO commentDAO = (CommentDAO) ctx.getAttribute("CommentDAO");
		User korisnik = (User) request.getSession().getAttribute("ulogovanKorisnik");
		String id = Math.random()+korisnik.username;
		Comment comment=  new Comment(id, korisnik.username, komentar.objekat, komentar.tekstKomentara, komentar.ocjena, false);
		commentDAO.saveComment(comment);	
		return Response.status(200).build();
	}
	
	
	@POST
	@Path("/dodajPromoKod")
	@Produces(MediaType.TEXT_HTML)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response dodajPromoKod(PromoKod promoKod) throws ParseException, IOException {
		PromoKodDAO  promoKodDAO= (PromoKodDAO) ctx.getAttribute("PromoKodDAO");
		String oznaka= promoKod.oznaka +  promoKod.pocetakVazenja.toString()+promoKod.brojKoristenja;
		PromoKod promo =  new PromoKod(oznaka, promoKod.pocetakVazenja.toString(), promoKod.krajVazenja.toString(), promoKod.brojKoristenja, promoKod.procenatUmanjenja);
		promoKodDAO.savePromoKod(promo);	
		return Response.status(200).build();
	}
	
	@GET
	@Path("/promoKodoviPrikaz")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<PromoKod> getPromoKod() {
		PromoKodDAO promoKodDAO = (PromoKodDAO) ctx.getAttribute("PromoKodDAO");
		return promoKodDAO.findAll();
	}
	
}
