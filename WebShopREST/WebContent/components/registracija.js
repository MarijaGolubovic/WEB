 Vue.component("app-register", {
 	data(){
 	 return {
            noviKorisnik: {},
            errors: [],
            message: null
        }
 	
 	},
 	template: ` 
 	 <div id="korisnik" style="border-style: solid; width:10.6cm; height:12.5cm; color:#3E9A2A;  background-color:#A5FA92;border-radius: 10px">
        <form @submit="registruj" method="post">
        <div class="inputReg">
            <table style="position:relative; left:1cm; top:0.5cm">
                  <tr>
                      <th style="text-align: left"><label style="color:#055106; font-size:18px">Ime:</label></th>
                      <td><input class="registracija"  v-model="noviKorisnik.firstName" type="text" name="ime" 
                      style="height:1cm;border-radius: 5px; border-color:green"
                      required></td>
                  </tr>
                  <br>
                  <tr>
                      <th style="text-align: left"><label style="color:#055106; font-size:18px">Prezime:</label></th>
                      <td><input v-model="noviKorisnik.lastName" type="text" 
                      style="height:1cm;border-radius: 5px; border-color:green"
                      required></td>
                  </tr>
                  <br>
                  <tr>
                      <th style="text-align: left"><label style="color:#055106; font-size:18px">Korisnicko ime:</label></th>
                      <td><input v-model="noviKorisnik.username" type="text" 
                      style="height:1cm;border-radius: 5px; border-color:green"
                      required></td>
                </tr>
                <br>
                <tr>
                      <th style="text-align: left"><label style="color:#055106; font-size:18px">Lozinka:</label></th>
                      <td><input type="password"  v-model="noviKorisnik.password"
                      style="height:1cm;border-radius: 5px; border-color:green"
                       required></td>
                  </tr>
                  <br>
                  <tr>
                      <th style="text-align: left"><label style="color:#055106; font-size:18px">Pol:</label></th>
                      <td><select class="registracija"  v-model="noviKorisnik.gender" 
                      style="height:1cm;border-radius: 5px; width:4.7cm; border-color:green"
                      required>
                      <option value="MALE">Muski</option>
                      <option value="FEMALE">Zenski</option>
                      </select></td>
                  </tr>
                  <br>
                  <tr>
                      <th style="text-align: left"><label style="color:#055106; font-size:18px">Datum rodjenja:</label></th>
                      <td><input v-model="noviKorisnik.birthDate" type="date" required
                      style="height:1cm;border-radius: 5px; width:4.7cm; border-color:green"
                      /></td>
                  </tr>
                  <br>
                  <br>
                  <tr><button type="submit" style="position:relative; left:2.5cm; height:1cm;width:3cm;border-radius: 15px;color:#055106; font-size:18px">Registruj se</button></tr>
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