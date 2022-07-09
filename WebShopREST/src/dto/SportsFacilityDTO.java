package dto;

import java.time.LocalTime;
import java.util.List;

import beans.Location;
import beans.SportsFacility.Content;
import beans.SportsFacility.Status;
import beans.SportsFacility.TypeSportsFacility;

public class SportsFacilityDTO {

	public String naziv;
	public TypeSportsFacility tipObjekta;
	public String menadzer;
	public Content sadrzaj;
	public Status working;
	public String grad;
	public String ulica;
	public String broj;
	public String postanskiBroj;
	public String longlat;
	public String logo;
	public double averageGrade;
	public LocalTime startingTime;
	public LocalTime endingTime;
}
