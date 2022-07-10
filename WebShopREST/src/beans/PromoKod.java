package beans;

public class PromoKod {
	public String oznaka;
	public String pocetakVazenja;
	public String krajVazenja;
	public double brojKoristenja;
	public double procenatUmanjenja;
	
	public PromoKod() {
		// TODO Auto-generated constructor stub
	}
	
	public String getOznaka() {
		return oznaka;
	}
	public void setOznaka(String oznaka) {
		this.oznaka = oznaka;
	}
	public String getPocetakVazenja() {
		return pocetakVazenja;
	}
	public void setPocetakVazenja(String pocetakVazenja) {
		this.pocetakVazenja = pocetakVazenja;
	}
	public String getKrajVazenja() {
		return krajVazenja;
	}
	public void setKrajVazenja(String krajVazenja) {
		this.krajVazenja = krajVazenja;
	}
	public double getBrojKoristenja() {
		return brojKoristenja;
	}
	public void setBrojKoristenja(double brojKoristenja) {
		this.brojKoristenja = brojKoristenja;
	}
	public double getProcenatUmanjenja() {
		return procenatUmanjenja;
	}
	public void setProcenatUmanjenja(double procenatUmanjenja) {
		this.procenatUmanjenja = procenatUmanjenja;
	}
	public PromoKod(String oznaka, String pocetakVazenja, String krajVazenja, double brojKoristenja,
			double procenatUmanjenja) {
		super();
		this.oznaka = oznaka;
		this.pocetakVazenja = pocetakVazenja;
		this.krajVazenja = krajVazenja;
		this.brojKoristenja = brojKoristenja;
		this.procenatUmanjenja = procenatUmanjenja;
	}
	
	
}
