package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Product;
import beans.SportsFacility;
import dao.ProductDAO;
import dao.SportsFacilityDAO;

@Path("/facilities")
public class SportsFacilityService {
	
	@Context
	ServletContext ctx;
	
	public SportsFacilityService() {
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("SportsFacilityDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("SportsFacilityDAO", new SportsFacilityDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<SportsFacility> getFacilities() {
		SportsFacilityDAO dao = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		return dao.findAll();
	}
	
	@GET
	@Path("/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public SportsFacility getFacility(@PathParam("name") String name) {
		SportsFacilityDAO dao = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		return dao.findFacilitiy(name);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public SportsFacility getFacilities(SportsFacility sportsFacility) {
		SportsFacilityDAO dao = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		return dao.save(sportsFacility);
	}
	
	@PUT
	@Path("/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public SportsFacility getFacilities(@PathParam("name") String name, SportsFacility sportsFacility) {
		SportsFacilityDAO dao = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		return dao.update(name, sportsFacility);
	}
	
	@DELETE
	@Path("/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	public void getFacilities(@PathParam("name") String name) {
		SportsFacilityDAO dao = (SportsFacilityDAO) ctx.getAttribute("SportsFacilityDAO");
		dao.delete(name);
	}
}
