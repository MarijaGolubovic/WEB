 Vue.component("administrator-dodavanjeKorisnika", {
 	data(){
 	 return {
            noviKorisnik: {}
        }
 	
 	},
 	template: ` 
 	 <div>
 	 
      <form @submit="dodajNovogKorisnika" method="post">
      <br><br><br>
      <div style="background-color:#ffffff; width:25%;">
      <table>
          <tr>
              <th>Ime:</th>
              <td><input type="text" v-model="noviKorisnik.firstName" required></td>
          </tr>	
          <tr>
              <th>Prezime:</th>
              <td><input type="text" v-model="noviKorisnik.lastName" required></td>
          </tr>		
          <tr>
              <th>Korisnicko ime:</th>
              <td><input type="text" v-model="noviKorisnik.username" required></td>
          </tr>			
          <tr>
              <th>Lozinka:</th>
              <td><input type="text" v-model="noviKorisnik.password" required></td>
          </tr>
          <tr>
              <th>Pol:</th>
              <td><select name="pol" v-model="noviKorisnik.gender" required>
                   <option value="MALE">muski</option>
                   <option value="FEMALE">zenski</option>
               </select></td>
          </tr>
          <tr>
              <th>Uloga:</th>
              <td><select name="role" v-model="noviKorisnik.role" required>
                   <option value="MENAGER">Menadzer</option>
                   <option value="CUSTUMER">Kupac</option>
                   <option value="TRAINER">Trener</option>
               </select></td>
          </tr>


          <tr>
              <th>Datum rodjenja:</th>
              <td><input type="date" v-model="noviKorisnik.birthDate" required></td>
          </tr>
          <tr>
             <button type="submit">Dodaj korisnika</button>
         </tr>
      </table>	
      </div>
 </form>

    </div>
	`,
	 methods: {
        dodajNovogKorisnika : function (event) {
	 	 	event.preventDefault();
	 	 	 axios
                    .post('rest/login/dodajNovogKorisnika', {
                        "firstName": this.noviKorisnik.firstName,
                        "lastName": this.noviKorisnik.lastName,
                        "username": this.noviKorisnik.username,
                        "password": this.noviKorisnik.password,
                        "gender": this.noviKorisnik.gender,
                        "birthDate": this.noviKorisnik.birthDate,
                        "role": this.noviKorisnik.role
                    })
                    .then(response => {
                        
                        alert("Uspjesno ste registrovani!");
                        window.location.reload();
                        
                    })
                    .catch(err =>{ 
                    	alert("Korisnicko ime vec postoji!");
                    	
                })
	 
	 	}
	
	 }
 });