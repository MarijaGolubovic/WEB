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
    	<div>
        <form @submit="sacuvajIzmene" method="post">
            <table class="tabelaK">
                  <tr class="redTabele">
                      <th class="zaglavljeK"><label class="labela">Ime:</label></th>
                      <td class="zaglavljeK"><input class="profilK"  v-model="korisnik.firstName" type="text" name="ime" required></td>
                  </tr>
                  <tr>
                      <th class="zaglavljeK"><label class="labela">Prezime:</label></th>
                      <td class="zaglavljeK"><input class="profilK"  v-model="korisnik.lastName" type="text" required></td>
                  </tr>
                  <tr>
                      <th class="zaglavljeK"><label class="labela">Korisnicko ime:</label></th>
                      <td class="zaglavljeK"><input class="profilK"  v-model="korisnik.username" type="text" required></td>
                </tr>
                <tr>
                      <th class="zaglavljeK"><label class="labela">Lozinka:</label></th>
                      <td class="zaglavljeK"><input class="profilK" type="text"  v-model="korisnik.password" required></td>
                  </tr>
                  <tr>
                      <th class="zaglavljeK"><label class="labela">Pol:</label></th>
                      <td class="zaglavljeK"><select class="profilKP"  v-model="korisnik.gender" name="pol">
                      <option value="MALE">muski</option>
                      <option value="FEMALE">zenski</option>
                      </select></td>
                  </tr>
                  </table>
                <button class="sacuvajIzmjeneDugme" type="submit">Sacuvaj izmene</button>
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