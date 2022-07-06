 Vue.component("app-pocetnaObjekat", {
 	data(){
 	 return {
	      facility: {},
	      grupniTreninzi: [],
	      personalniTreninzi: [],
	      ostaloTreninzi: [],
	      izabraniGrupni: {},
	      grupniDodavanje: false,
	      grupniTrening:{},
	      personalniTrening:{},
	      treneri: [],
	      slikaVis: false,
	      personalniDodavanje: false,
	      slikaVisPer: false,

        }
 	
 	},
	    template: ` 
    	<div>
    	
    	<div>
	    	<table width="100%" border="0">
	    	<tr bgcolor="lightgrey">
	    	    <th>Naziv</th>
	    		<th>Adresa</th>
	    		<th>Prosečna ocena</th>
	    	</tr>
	    	<tr>
	    	<td>{{facility.name}}</td>
	    	<td>{{facility.locationS}}</td>
	    	<td>{{facility.averageGrade}}</td>
	    	</tr>
	    	</table>    	
	    </div>
	    
	    
	    	<p> Grupni treninzi </p>
	    	<button v-on:click="dodajGrupni" v-show="!grupniDodavanje">Dodaj sadržaj</button>
	    	<button v-on:click="zatvoriDetaljnijiPrikaz" v-show="grupniDodavanje">x</button>
	    <div v-show="grupniDodavanje">
	    	 <img id="slikaID" src="" alt="Slika treninga" width="200" height="100" v-show="this.slikaVis">
	    	<form @submit="dodajGrupniTrening" method="post">
	    		 <table>
                  <tr>
                      <th><label>Naziv:</label></th>
                      <td><input   v-model="grupniTrening.name" type="text" required></td>
                  </tr>
                  <tr>
                      <th><label>Trajanje:</label></th>
                      <td><input  v-model="grupniTrening.duration" type="number" min="1" step="any" ></td>
                  </tr>
                  <tr>
                      <th><label>Trener:</label></th>
	 						<td>
	 							<select name="trener" v-model="grupniTrening.trainer" required>
	 								 <option v-for="m in treneri" :value=m>
	 								 	{{m.firstName}} {{m.lastName}}
	 								 </option>
	 							</select>
	 						</td>
                </tr>
                  <tr>
                      <th><label>Opis:</label></th>
                      <td><input  v-model="grupniTrening.description" type="text" /></td>
                  </tr>
                  <tr>
	 				<th>Slika:</th>
	 				<td>
	 				<input type="file" onchange="encodeImageFileAsURL(this)" v-on:click="dodajSliku" required>
	 				</td>
	 			</tr>
                  </table>
                   <button class="potvrdiDugme" type="submit">Potvrdi</button>
                </form>
	    	</div>
	    	
	        <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Trener</th>
	    			<th>Opis</th>
	    		</tr>
	    			
	    		<tr v-for="p in grupniTreninzi">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.trainer.firstName}} {{p.trainer.lastName}}</td>
	    			<td>{{p.description}}</td>
	    		</tr>
	    	</table>
	    	
	    	<p> Personalni treninzi </p>
	    	<button v-on:click="dodajPersonalni" v-show="!personalniDodavanje">Dodaj sadržaj</button>
	    	<button v-on:click="zatvoriDetaljnijiPrikazPersonalni" v-show="personalniDodavanje">x</button>
	    <div v-show="personalniDodavanje">
	    	 <img id="slikaIDPer" src="" alt="Slika treninga" width="200" height="100" v-show="this.slikaVisPer">
	    	<form @submit="dodajPersonalniTrening" method="post">
	    		 <table>
                  <tr>
                      <th><label>Naziv:</label></th>
                      <td><input   v-model="personalniTrening.name" type="text" required></td>
                  </tr>
                  <tr>
                      <th><label>Trajanje:</label></th>
                      <td><input  v-model="personalniTrening.duration" type="number" min="1" step="any" ></td>
                  </tr>
                  <tr>
                      <th><label>Trener:</label></th>
	 						<td>
	 							<select name="trener" v-model="personalniTrening.trainer" required>
	 								 <option v-for="m in treneri" :value=m>
	 								 	{{m.firstName}} {{m.lastName}}
	 								 </option>
	 							</select>
	 						</td>
                </tr>
                  <tr>
                      <th><label>Opis:</label></th>
                      <td><input  v-model="personalniTrening.description" type="text" /></td>
                  </tr>
                  <tr>
	 				<th>Slika:</th>
	 				<td>
	 				<input type="file" onchange="encodeImageFileAsURLPer(this)" v-on:click="dodajSlikuPer" required>
	 				</td>
	 			</tr>
                  </table>
                   <button type="submit">Potvrdi</button>
                </form>
	    	</div>
	    	
	        <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Trener</th>
	    			<th>Opis</th>
	    		</tr>
	    			
	    		<tr v-for="p in personalniTreninzi">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.trainer.firstName}} {{p.trainer.lastName}}</td>
	    			<td>{{p.description}}</td>
	    		</tr>
	    	</table>
	    	
    	</div>		  
    	`,
    methods:{
	 dodajGrupniTrening: function (event) {
	 	 	event.preventDefault();
	 	 	this.grupniTrening.image = document.getElementById("slikaID").src;
            axios
                .post('rest/menager/dodajTrening', {
                    "name": this.grupniTrening.name,
                    "duration": this.grupniTrening.duration,
                    "trainer": this.grupniTrening.trainer,
                    "description": this.grupniTrening.description,
                    "image": this.grupniTrening.image
                    
                })
                .then(response => {
                    alert("Trening je dodat!");
                    this.grupniDodavanje=false;
                    this.$router.go(0);
                })
                .catch(err => {
                    alert("Trening postoji!");
                })
        },
        dodajPersonalniTrening: function (event) {
	 	 	event.preventDefault();
	 	 	this.personalniTrening.image = document.getElementById("slikaIDPer").src;
            axios
                .post('rest/menager/dodajTreningPer', {
                    "name": this.personalniTrening.name,
                    "duration": this.personalniTrening.duration,
                    "trainer": this.personalniTrening.trainer,
                    "description": this.personalniTrening.description,
                    "image": this.personalniTrening.image
                    
                })
                .then(response => {
                    alert("Trening je dodat!");
                    this.personalniDodavanje=false;
                    this.$router.go(0);
                })
                .catch(err => {
                    alert("Trening postoji!");
                })
        },
        dodajSliku: function(){
	 		this.slikaVis = true;
	 	},
	 	dodajSlikuPer: function(){
	 		this.slikaVisPer = true;
	 	},
	 	dodajGrupni: function () {
		this.grupniDodavanje=true;
		},
		dodajPersonalni: function () {
		this.personalniDodavanje=true;
		},			
		
		zatvoriDetaljnijiPrikaz: function(){
			this.grupniDodavanje = false;
		},
		zatvoriDetaljnijiPrikazPersonalni: function(){
			this.personalniDodavanje = false;
		},
	
		}
	
    ,
    mounted () {
        axios
          .get('rest/menager/objekatMenadzera')
          .then(response => (this.facility = response.data)),
        axios
          .get('rest/login/treneri')
          .then(response => (this.treneri = response.data)),
         axios
          .get('rest/menager/grupniTreninziMenadzera')
          .then(response => (this.grupniTreninzi = response.data)),
         axios
          .get('rest/menager/personalniTreninziMenadzera')
          .then(response => (this.personalniTreninzi = response.data))
    },
});
function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        document.getElementById('slikaID')
            .setAttribute(
                'src', reader.result
            );
    }
    reader.readAsDataURL(file);
}

function encodeImageFileAsURLPer(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        document.getElementById('slikaIDPer')
            .setAttribute(
                'src', reader.result
            );
    }
    reader.readAsDataURL(file);
}
