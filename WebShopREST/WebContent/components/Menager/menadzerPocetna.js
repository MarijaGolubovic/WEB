 Vue.component("app-pocetnaObjekat", {
 	data(){
 	 return {
	      facility: {},
	      grupniTreninzi: [],
	      personalniTreninzi: [],
	      ostaloTreninzi: [],
	      izabraniGrupni: {},
	      izabraniPersonalni: {},
	      izabraniOstalo: {},
	      grupniDodavanje: false,
	      grupniTrening:{},
	      personalniTrening:{},
	      OstaloTrening:{},
	      treneri: [],
	      slikaVis: false,
	      personalniDodavanje: false,
	      slikaVisPer: false,
	      ostaloDodavanje: false,
	      slikaVisOst: false,
	      grupniIzmena: false,
	      personalniIzmena: false,
	      ostaloIzmena: false,

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
                      <th><label>Cena:</label></th>
                      <td><input  v-model="grupniTrening.price" type="number" min="0" step="any" ></td>
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
	    	
	    	<button v-on:click="zatvoriDetaljnijiPrikazIzmena" v-show="grupniIzmena">x</button>
	    <div v-show="grupniIzmena">
	    	 	<form @submit="izmeniGrupniTrening">
	    		 <table>
                  <tr>
                      <th><label>Naziv:</label></th>
                      <td><input disabled   v-model="izabraniGrupni.name" type="text"></td>
                  </tr>
                  <tr>
                      <th><label>Trajanje:</label></th>
                      <td><input  v-model="izabraniGrupni.duration" type="number" min="1" step="any" ></td>
                  </tr>
                   <tr>
                      <th><label>Cena:</label></th>
                      <td><input  v-model="izabraniGrupni.price" type="number" min="0" step="any" ></td>
                  </tr>
                  <tr>
                      <th><label>Trener:</label></th>
	 						<td>
	 							<select name="trener" v-model="izabraniGrupni.trainer" required>
	 								 <option v-for="m in treneri" :value=m>
	 								 	{{m.firstName}} {{m.lastName}}
	 								 </option>
	 							</select>
	 						</td>
                </tr>
                  <tr>
                      <th><label>Opis:</label></th>
                      <td><input  v-model="izabraniGrupni.description" type="text" /></td>
                  </tr>
                  <tr>
	 				<th>Slika:</th>
	 				<td>
	 				  <img :src=izabraniGrupni.image  alt="Slika treninga" width="50" height="50"/>
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
	    			<th>Cena</th>
	    			<th>Trener</th>
	    			<th>Opis</th>
	    		</tr>
	    			
	    		<tr v-for="p in grupniTreninzi" v-on:click="izaberiGrupni(p)" :class="{selected : izabraniGrupni.name == p.name}">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.price}}</td>
	    			<td>{{p.trainer.firstName}} {{p.trainer.lastName}}</td>
	    			<td>{{p.description}}</td>
	    			<td><button v-on:click="detaljnijiPrikazGrupno">Izmeni trening</button></td>
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
                      <th><label>Cena:</label></th>
                      <td><input  v-model="personalniTrening.price" type="number" min="0" step="any" ></td>
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
	    	
	    <button v-on:click="zatvoriDetaljnijiPrikazIzmenaPersonalni" v-show="personalniIzmena">x</button>
	    <div v-show="personalniIzmena">
	    	 	<form @submit="izmeniPersonalniTrening">
	    		 <table>
                  <tr>
                      <th><label>Naziv:</label></th>
                      <td><input disabled   v-model="izabraniPersonalni.name" type="text"></td>
                  </tr>
                  <tr>
                      <th><label>Trajanje:</label></th>
                      <td><input  v-model="izabraniPersonalni.duration" type="number" min="1" step="any" ></td>
                  </tr>
                    <tr>
                      <th><label>Cena:</label></th>
                      <td><input  v-model="izabraniPersonalni.price" type="number" min="0" step="any" ></td>
                  </tr>
                  <tr>
                      <th><label>Trener:</label></th>
	 						<td>
	 							<select name="trener" v-model="izabraniPersonalni.trainer" required>
	 								 <option v-for="m in treneri" :value=m>
	 								 	{{m.firstName}} {{m.lastName}}
	 								 </option>
	 							</select>
	 						</td>
                </tr>
                  <tr>
                      <th><label>Opis:</label></th>
                      <td><input  v-model="izabraniPersonalni.description" type="text" /></td>
                  </tr>
                  <tr>
	 				<th>Slika:</th>
	 				<td>
	 				  <img :src=izabraniPersonalni.image  alt="Slika treninga" width="50" height="50"/>
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
	    			<th>Cena</th>
	    			<th>Trener</th>
	    			<th>Opis</th>
	    		</tr>
	    			
	    		<tr v-for="p in personalniTreninzi" v-on:click="izaberiPersonalni(p)" :class="{selected : izabraniPersonalni.name == p.name}">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.price}}</td>
	    			<td>{{p.trainer.firstName}} {{p.trainer.lastName}}</td>
	    			<td>{{p.description}}</td>
	    			<td><button v-on:click="detaljnijiPrikazPersonalno">Izmeni trening</button></td>
	    		</tr>
	    	</table>
	    	
	    	<p> Ostalo </p>
	    	<button v-on:click="dodajOstalo" v-show="!ostaloDodavanje">Dodaj sadržaj</button>
	    	<button v-on:click="zatvoriDetaljnijiPrikazOstalo" v-show="ostaloDodavanje">x</button>
	    <div v-show="ostaloDodavanje">
	    	 <img id="slikaIDOst" src="" alt="Slika treninga" width="200" height="100" v-show="this.slikaVisOst">
	    	<form @submit="dodajOstaloTrening" method="post">
	    		 <table>
                  <tr>
                      <th><label>Naziv:</label></th>
                      <td><input   v-model="OstaloTrening.name" type="text" required></td>
                  </tr>
                  <tr>
                      <th><label>Trajanje:</label></th>
                      <td><input  v-model="OstaloTrening.duration" type="number" min="1" step="any" ></td>
                  </tr>
                   <tr>
                      <th><label>Cena:</label></th>
                      <td><input  v-model="OstaloTrening.price" type="number" min="0" step="any" ></td>
                  </tr>
                  <tr>
                      <th><label>Trener:</label></th>
	 						<td>
	 							<select name="trener" v-model="OstaloTrening.trainer" required>
	 								 <option v-for="m in treneri" :value=m>
	 								 	{{m.firstName}} {{m.lastName}}
	 								 </option>
	 							</select>
	 						</td>
                </tr>
                  <tr>
                      <th><label>Opis:</label></th>
                      <td><input  v-model="OstaloTrening.description" type="text" /></td>
                  </tr>
                  <tr>
	 				<th>Slika:</th>
	 				<td>
	 				<input type="file" onchange="encodeImageFileAsURLOst(this)" v-on:click="dodajSlikuOst" required>
	 				</td>
	 			</tr>
                  </table>
                   <button type="submit">Potvrdi</button>
                </form>
	    	</div>
	    	
	    	<button v-on:click="zatvoriDetaljnijiPrikazIzmenaOstalo" v-show="ostaloIzmena">x</button>
	    <div v-show="ostaloIzmena">
	    	 	<form @submit="izmeniOstaloTrening">
	    		 <table>
                  <tr>
                      <th><label>Naziv:</label></th>
                      <td><input disabled   v-model="izabraniOstalo.name" type="text"></td>
                  </tr>
                  <tr>
                      <th><label>Trajanje:</label></th>
                      <td><input  v-model="izabraniOstalo.duration" type="number" min="1" step="any" ></td>
                  </tr>
                 <tr>
                      <th><label>Cena:</label></th>
                      <td><input  v-model="izabraniOstalo.price" type="number" min="0" step="any" ></td>
                  </tr>
                  <tr>
                      <th><label>Trener:</label></th>
	 						<td>
	 							<select name="trener" v-model="izabraniOstalo.trainer" required>
	 								 <option v-for="m in treneri" :value=m>
	 								 	{{m.firstName}} {{m.lastName}}
	 								 </option>
	 							</select>
	 						</td>
                </tr>
                  <tr>
                      <th><label>Opis:</label></th>
                      <td><input  v-model="izabraniOstalo.description" type="text" /></td>
                  </tr>
                  <tr>
	 				<th>Slika:</th>
	 				<td>
	 				  <img :src=izabraniOstalo.image  alt="Slika treninga" width="50" height="50"/>
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
	    			<th>Cena</th>
	    			<th>Trener</th>
	    			<th>Opis</th>
	    		</tr>
	    			
	    		<tr v-for="p in ostaloTreninzi"  v-on:click="izaberiOstalo(p)" :class="{selected : izabraniOstalo.name == p.name}">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.price}}</td>
	    			<td>{{p.trainer.firstName}} {{p.trainer.lastName}}</td>
	    			<td>{{p.description}}</td>
	    			<td><button v-on:click="detaljnijiPrikazOstalo">Izmeni trening</button></td>
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
                    "image": this.grupniTrening.image,
                    "price": this.grupniTrening.price
                    
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
        dodajOstaloTrening: function (event) {
	 	 	event.preventDefault();
	 	 	this.OstaloTrening.image = document.getElementById("slikaIDOst").src;
            axios
                .post('rest/menager/dodajTreningOst', {
                    "name": this.OstaloTrening.name,
                    "duration": this.OstaloTrening.duration,
                    "trainer": this.OstaloTrening.trainer,
                    "description": this.OstaloTrening.description,
                    "image": this.OstaloTrening.image,
                    "price": this.OstaloTrening.price
                    
                })
                .then(response => {
                    alert("Trening je dodat!");
                    this.ostaloDodavanje=false;
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
                    "image": this.personalniTrening.image,
                    "price": this.personalniTrening.price
                    
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
           izmeniGrupniTrening: function (event) {
	 	 	event.preventDefault();
            axios
                .post('rest/menager/izmeniGrupniTrening', {
                    "name": this.izabraniGrupni.name,
                    "duration": this.izabraniGrupni.duration,
                    "trainer": this.izabraniGrupni.trainer,
                    "description": this.izabraniGrupni.description,
                    "image": this.izabraniGrupni.image,
                    "price": this.izabraniGrupni.price
                    
                })
                .then(response => {
                    alert("Trening je izmenjen!");
                    this.grupniIzmena=false;
                    this.$router.go(0);
                })
                .catch(err => {
                    alert("Trening postoji!");
                })
        },
           izmeniPersonalniTrening: function (event) {
	 	 	event.preventDefault();
            axios
                .post('rest/menager/izmeniPersonalniTrening', {
                    "name": this.izabraniPersonalni.name,
                    "duration": this.izabraniPersonalni.duration,
                    "trainer": this.izabraniPersonalni.trainer,
                    "description": this.izabraniPersonalni.description,
                    "image": this.izabraniPersonalni.image,
                    "price": this.izabraniPersonalni.price
                    
                })
                .then(response => {
                    alert("Trening je izmenjen!");
                    this.personalniIzmena=false;
                    this.$router.go(0);
                })
                .catch(err => {
                    alert("Trening postoji!");
                })
        },
           izmeniOstaloTrening: function (event) {
	 	 	event.preventDefault();
            axios
                .post('rest/menager/izmeniOstaloTrening', {
                    "name": this.izabraniOstalo.name,
                    "duration": this.izabraniOstalo.duration,
                    "trainer": this.izabraniOstalo.trainer,
                    "description": this.izabraniOstalo.description,
                    "image": this.izabraniOstalo.image,
                    "price": this.izabraniOstalo.price
                    
                })
                .then(response => {
                    alert("Trening je izmenjen!");
                    this.ostaloIzmena=false;
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
	 	dodajSlikuOst: function(){
	 		this.slikaVisOst = true;
	 	},
	 	dodajGrupni: function () {
		this.grupniDodavanje=true;
		},
		dodajPersonalni: function () {
		this.personalniDodavanje=true;
		},	
		dodajOstalo: function () {
		this.ostaloDodavanje=true;
		},	
		detaljnijiPrikazGrupno:function () {
		this.grupniIzmena=true;
		},	 	
		detaljnijiPrikazPersonalno:function () {
		this.personalniIzmena=true;
		},
		detaljnijiPrikazOstalo:function () {
		this.ostaloIzmena=true;
		},
		zatvoriDetaljnijiPrikaz: function(){
			this.grupniDodavanje = false;
		},
		zatvoriDetaljnijiPrikazPersonalni: function(){
			this.personalniDodavanje = false;
		},
		zatvoriDetaljnijiPrikazOstalo: function(){
			this.ostaloDodavanje = false;
		}, 	
		zatvoriDetaljnijiPrikazIzmena: function(){
			this.grupniIzmena = false;
		},	
		zatvoriDetaljnijiPrikazIzmenaPersonalni: function(){
			this.personalniIzmena = false;
		},
		zatvoriDetaljnijiPrikazIzmenaOstalo: function(){
			this.ostaloIzmena = false;
		},
		izaberiGrupni: function(grupni) {
    		this.izabraniGrupni = grupni;
    	},
    	izaberiPersonalni: function(personalni) {
    		this.izabraniPersonalni = personalni;
    	},
    	izaberiOstalo: function(ostalo) {
    		this.izabraniOstalo = ostalo;
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
          .then(response => (this.personalniTreninzi = response.data)),
           axios
          .get('rest/menager/ostaliTreninziMenadzera')
          .then(response => (this.ostaloTreninzi = response.data))
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

function encodeImageFileAsURLOst(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        document.getElementById('slikaIDOst')
            .setAttribute(
                'src', reader.result
            );
    }
    reader.readAsDataURL(file);
}
