 Vue.component("administrator-dodavanjeKorisnika", {
 	data(){
 	 return {
            noviKorisnik: {}
        }
 	
 	},
 	template: ` 
 	 <div>
 	 <br>
 	 <div class="forma">
	      <form @submit="dodajNovogKorisnika" method="post">
	      
	      <div>
	      <table style="margin-right: auto; margin-left: auto;">
	          <tr>
	              <th class="poravnanjeLabeleForma"><label class="labelaStil">Ime:</label></th>
	              <td><input class="inputPolje" type="text" v-model="noviKorisnik.firstName" required></td>
	          </tr>	
	          <tr>&nbsp</tr>
	          <tr>
	              <th class="poravnanjeLabeleForma"><label class="labelaStil">Prezime:</label></th>
	              <td><input class="inputPolje" type="text" v-model="noviKorisnik.lastName" required></td>
	          </tr>		
	          <tr>&nbsp</tr>
	          <tr>
	              <th class="poravnanjeLabeleForma"><label class="labelaStil">Korisnicko ime:</label></th>
	              <td><input class="inputPolje" type="text" v-model="noviKorisnik.username" required></td>
	          </tr>			
	          <tr>&nbsp</tr>
	          <tr>
	              <th class="poravnanjeLabeleForma"><label class="labelaStil">Lozinka:</label></th>
	              <td><input class="inputPolje" type="text" v-model="noviKorisnik.password" required></td>
	          </tr>
	          <tr>&nbsp</tr>
	          <tr>
	              <th class="poravnanjeLabeleForma"><label class="labelaStil">Pol:</label></th>
	              <td><select name="pol" v-model="noviKorisnik.gender" class="padajuciMeni" required>
	                   <option value="MALE">muski</option>
	                   <option value="FEMALE">zenski</option>
	               </select></td>
	          </tr>
	          <tr>&nbsp</tr>
	          <tr>
	              <th class="poravnanjeLabeleForma"><label class="labelaStil">Uloga:</label></th>
	              <td><select name="role" v-model="noviKorisnik.role"  class="padajuciMeni"required>
	                   <option value="MENAGER">Menadzer</option>
	                   <option value="CUSTUMER">Kupac</option>
	                   <option value="TRAINER">Trener</option>
	               </select></td>
	          </tr>
	
				<tr>&nbsp</tr>
	          <tr>
	              <th class="poravnanjeLabeleForma"><label class="labelaStil">Datum rodjenja:</label></th>
	              <td><input class="inputPolje" type="date" v-model="noviKorisnik.birthDate" required></td>
	          </tr>
	          <tr>&nbsp</tr>
	          <tr>&nbsp</tr>
	          <tr>
	          	<td>&nbsp</td>
	            <td> <button type="submit" class="dugmeForma" type="submit " style="width:3.5cm; font-size:15px;">Dodaj korisnika</button></td>
	         </tr>
	      </table>	
	      </div>
	 </form>
</div>
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