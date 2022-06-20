 Vue.component("app-register", {
 	data(){
 	 return {
            noviKorisnik: {},
            errors: [],
            message: null,
            counter: -1
        }
 	
 	},
 	template: ` 
 	 <div id="korisnik" style="border-style: solid; width:10cm; height:6cm; color:#3E9A2A;  background-color:#A5FA92">
        <form @submit="registruj" method="post">
            <table style="position:relative; left:1cm; top:0.5cm">
                  <tr>
                      <th style="text-align: left"><label>Ime:</label></th>
                      <td><input class="registracija"  v-model="noviKorisnik.firstName" type="text" name="ime" required></td>
                  </tr>
                  <tr>
                      <th style="text-align: left"><label>Prezime:</label></th>
                      <td><input v-model="noviKorisnik.lastName" type="text" required></td>
                  </tr>
                  <tr>
                      <th style="text-align: left"><label>Korisnicko ime:</label></th>
                      <td><input v-model="noviKorisnik.username" type="text" required></td>
                </tr>
                <tr>
                      <th style="text-align: left"><label>Lozinka:</label></th>
                      <td><input type="password"  v-model="noviKorisnik.password" required></td>
                  </tr>
                  <tr>
                      <th style="text-align: left"><label>Pol:</label></th>
                      <td><select class="registracija"  v-model="noviKorisnik.gender" required>
                      <option value="MALE">Muski</option>
                      <option value="FIMALE">Zenski</option>
                      </select></td>
                  </tr>
                  <tr>
                      <th style="text-align: left"><label>Datum rodjenja:</label></th>
                      <td><input v-model="noviKorisnik.birthDate" type="date" required/></td>
                  </tr>
                  <br>
                  <tr><button type="submit" style="position:relative; left:1cm">Registruj se</button></tr>
                  </table>
                  
            </div>
          </form>
    </div>
	`,
	 methods: {
	 	registruj : function (event) {
	 	 	event.preventDefault();
	 	 	this.counter++;
	 	 	if(this.counter>1){
	 	 	location.href="/WebShopREST/kupac.html";
	 	 	}
	 	 	else{
	 	 	 axios
                    .post('rest/users/registracija', {
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
	
	 }
 });