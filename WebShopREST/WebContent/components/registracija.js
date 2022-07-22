 Vue.component("app-register", {
 	data(){
 	 return {
            noviKorisnik: {},
            errors: [],
            message: null
        }
 	
 	},
 	template: ` 
 	 <div >
      <br><br><br>
        <form @submit="registruj" method="post">
        <div class="forma">
            <table style="margin-right: auto; margin-left: auto;">
                <tr>&nbsp</tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Ime:</label></th>
                      <td><input v-model="noviKorisnik.firstName" type="text" name="ime"  class="inputPolje"
                      required></td>
                  </tr>
                  <br>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Prezime:</label></th>
                      <td><input v-model="noviKorisnik.lastName" type="text" class="inputPolje" required></td>
                  </tr>
                  <br>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Korisnicko ime:</label></th>
                      <td><input v-model="noviKorisnik.username" type="text" class="inputPolje" required></td>
                </tr>
                <br>
                <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Lozinka:</label></th>
                      <td><input type="password"  v-model="noviKorisnik.password" class="inputPolje" required></td>
                  </tr>
                  <br>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Pol:</label></th>
                      <td><select v-model="noviKorisnik.gender" class="inputPolje" required>
                      <option value="MALE">Muski</option>
                      <option value="FEMALE">Zenski</option>
                      </select></td>
                  </tr>
                  <br>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Datum rodjenja:</label></th>
                      <td><input v-model="noviKorisnik.birthDate" type="date" class="inputPolje" required/></td>
                  </tr>
                  <br>
                  <br>
                  <tr style="align: center;"><button type="submit" class="dugmeForma">Registruj se</button></tr>
                  <tr>&nbsp</tr>
                  </table>
                  </div>
          </form>
    </div>
	`,
	 methods: {
	 	registruj : function (event) {
	 	 	event.preventDefault();
	 	 	 axios
                    .post('rest/login/registracija', {
                        "firstName": this.noviKorisnik.firstName,
                        "lastName": this.noviKorisnik.lastName,
                        "username": this.noviKorisnik.username,
                        "password": this.noviKorisnik.password,
                        "gender": this.noviKorisnik.gender,
                        "birthDate": this.noviKorisnik.birthDate
                    })
                    .then(response => {
                        
                        alert("Uspjesno ste registrovani!");
                        location.href = "/WebShopREST/kupac.html"; 
                        
                    })
                    .catch(err =>{ 
                    	alert("Korisnicko ime vec postoji!");
                    	
                })
	 
	 	}
	
	 }
 });