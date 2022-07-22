Vue.component("app-profil",{
	data() {
        return {
            korisnik: {},
            errors: [],
            message: null
        }
    },
    template: `
    <div>
    	<br>
    	<div  class="forma">
        <form @submit="sacuvajIzmene" method="post">
            <table  style="margin-right: auto; margin-left: auto;">
            <br>
                  <tr class="redTabele">
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Ime:</label></th>
                      <td><input class="inputPolje"  v-model="korisnik.firstName" type="text" name="ime" required></td>
                  </tr>
                  <tr>&nbsp</tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil"">Prezime:</label></th>
                      <td><input class="inputPolje"  v-model="korisnik.lastName" type="text" required></td>
                  </tr>
                  <tr>&nbsp</tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil"">Korisnicko ime:</label></th>
                      <td><input class="inputPolje" v-model="korisnik.username" type="text" required></td>
                </tr>
                <tr>&nbsp</tr>
                <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil"">Lozinka:</label></th>
                      <td><input type="text" class="inputPolje" v-model="korisnik.password" required></td>
                  </tr>
                  <tr>&nbsp</tr>
                   <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil" v-if="korisnik.role == 'CUSTUMER'">Broj bodova:</label></th>
                      <td><input class="inputPolje" disabled v-if="korisnik.role == 'CUSTUMER'" type="text"  v-model="korisnik.collectedPoints" ></td>
                  </tr>
                  <tr>&nbsp</tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Pol:</label></th>
                      <td><select class="padajuciMeni"  v-model="korisnik.gender" name="pol">
                      <option value="MALE">muski</option>
                      <option value="FEMALE">zenski</option>
                      </select></td>
                  </tr>
                  <tr>&nbsp</tr>
                  <tr>&nbsp</tr>
                  <tr> <button class="dugmeForma" type="submit " style="width:3.5cm; font-size:15px;">Sacuvaj izmene</button><tr>
                  </table>
               
          </form>
          </div>
    </div>		  
    
    `,
    methods: {
        sacuvajIzmene: function () {
	 	 	event.preventDefault();
            axios
                .put('rest/login/izmeniProfil', {
                    "firstName": this.korisnik.firstName,
                    "lastName": this.korisnik.lastName,
                    "username": this.korisnik.username,
                    "password": this.korisnik.password,
                    "gender": this.korisnik.gender
                    
                })
                .then(response => {
                    alert("Izmena uspesna!");
                })
                .catch(err => {
                    alert("Korisniko ime zauzeto!");
                })
        }
    },
    mounted() {
        axios
            .get('rest/login/profil')
            .then(response => this.korisnik = response.data)
    },
});