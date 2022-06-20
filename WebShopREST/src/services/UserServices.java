package services;

import java.text.ParseException;
import java.util.Collection;

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

import beans.SportsFacility;
import beans.User;
import beans.User.Role;
import dao.ProductDAO;
import dao.SportsFacilityDAO;
import dao.UserDAO;

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
	}
/*	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getUser() {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.findAll();
	}
	
	@GET
	@Path("/{username}/{password}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getUser(@PathParam("username") String username, @PathParam("password") String password) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.find(username, password);
	}
	
	@GET
	@Path("/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getUserByUsername(@PathParam("username") String username) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.findByUsername(username);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public User User(User user) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.save(user);
	}
	
	@PUT
	@Path("/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getUser(@PathParam("username") String username, User user) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		return dao.update(username, user);
	}
	
	@DELETE
	@Path("/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public void getFacilities(@PathParam("username") String username) {
		UserDAO dao = (UserDAO) ctx.getAttribute("UserDAO");
		dao.delete(username);
	}
	*/

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

		} else if (korisnikZaLogovanje.getRole() == Role.MENAGER) {
			return Response.status(Response.Status.ACCEPTED).entity("/WebShopREST/menager.html").build();

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
	public Response registracija(User user) throws ParseException {
		UserDAO korisnikDAO = (UserDAO) ctx.getAttribute("UserDAO");
		if(!korisnikDAO.findByUsername(user.getUsername()).getUsername().equals(user.getUsername())) {
			korisnikDAO.save(user);	
			return Response.status(200).build();
		}
		return Response.status(400).entity("Korisnicko ime vec postoji!").build();
	}

}
