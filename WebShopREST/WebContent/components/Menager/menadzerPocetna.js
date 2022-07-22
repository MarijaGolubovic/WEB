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
    	<br><br>
    	<div>
	    	<table width="100%" border="0" class="tabela">
	    	<tr class="zaglavljeTabele" style="color:lightgrey; background-color:#050a44;">
	    	    <th>Naziv</th>
	    		<th>Adresa</th>
	    		<th>Prosečna ocena</th>
	    	</tr>
	    	<tr class="parniRedovi">
	    	<td>{{facility.name}}</td>
	    	<td>{{facility.locationS}}</td>
	    	<td>{{facility.averageGrade}}</td>
	    	</tr>
	    	</table>    	
	    </div>
	    
	    <br><br>
	    	<h2 style="color:#152a6a"> Grupni treninzi </h2>
	    	<button v-on:click="dodajGrupni" v-show="!grupniDodavanje" class="dugmeObrisi">Dodaj sadržaj</button>
	    	<button v-on:click="zatvoriDetaljnijiPrikaz" v-show="grupniDodavanje" class="dugmeZatvori">x</button>
	    <div v-show="grupniDodavanje">
	    <br><br>
	    <div class="forma">
	    	 <img id="slikaID" src="" alt="Slika treninga" width="200" height="100" v-show="this.slikaVis">
	    	<form @submit="dodajGrupniTrening" method="post">
	    		 <table style="margin-right: auto; margin-left: auto;">
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Naziv:</label></th>
                      <td><input class="inputPolje"  v-model="grupniTrening.name" type="text" required></td>
                  </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Trajanje:</label></th>
                      <td><input class="inputPolje" v-model="grupniTrening.duration" type="number" min="1" step="any" ></td>
                  </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Cena:</label></th>
                      <td><input class="inputPolje" v-model="grupniTrening.price" type="number" min="0" step="any" ></td>
                  </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Trener:</label></th>
	 						<td>
	 							<select class="padajuciMeni" name="trener" v-model="grupniTrening.trainer" required>
	 								 <option v-for="m in treneri" :value=m>
	 								 	{{m.firstName}} {{m.lastName}}
	 								 </option>
	 							</select>
	 						</td>
                </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Opis:</label></th>
                      <td><input class="inputPolje" v-model="grupniTrening.description" type="text" /></td>
                  </tr>
                  <tr>
	 				<th class="poravnanjeLabeleForma"><labela class="labelaStil">Slika:</labela></th>
	 				<td>
	 				<input class="inputPolje" type="file" onchange="encodeImageFileAsURL(this)" v-on:click="dodajSliku" required>
	 				</td>
	 			</tr>
	 			<tr>&nbsp</tr>
	 			<tr>&nbsp</tr>
	 			<tr><td>&nbsp</td><td> <button class="potvrdiDugme" type="submit" class="dugmeForma">Potvrdi</button></td></td>
	 			<tr>&nbsp</tr>
                  </table>
                   
                </form>
                </div>
	    	</div>
	    	
	    	<button v-on:click="zatvoriDetaljnijiPrikazIzmena" v-show="grupniIzmena" class="dugmeZatvori">x</button>
	    <div class="forma">
	    <div v-show="grupniIzmena">
	    	 	<form @submit="izmeniGrupniTrening">
	    		 <table style="margin-right: auto; margin-left: auto;">
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Naziv:</label></th>
                      <td><input class="inputPolje" disabled   v-model="izabraniGrupni.name" type="text"></td>
                  </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Trajanje:</label></th>
                      <td><input class="inputPolje" v-model="izabraniGrupni.duration" type="number" min="1" step="any" ></td>
                  </tr>
                   <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Cena:</label></th>
                      <td><input class="inputPolje"  v-model="izabraniGrupni.price" type="number" min="0" step="any" ></td>
                  </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Trener:</label></th>
	 						<td>
	 							<select class="padajuciMeni" name="trener" v-model="izabraniGrupni.trainer" required>
	 								 <option v-for="m in treneri" :value=m>
	 								 	{{m.firstName}} {{m.lastName}}
	 								 </option>
	 							</select>
	 						</td>
                </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Opis:</label></th>
                      <td><input class="inputPolje" v-model="izabraniGrupni.description" type="text" /></td>
                  </tr>
                  <tr>
	 				<th class="poravnanjeLabeleForma"><labela class="labelaStil">Slika:</labela></th>
	 				<td>
	 				  <img :src=izabraniGrupni.image  alt="Slika treninga" width="50" height="50"/>
	 				</td>
	 				<tr>&nbsp</td>
	 				<tr>&nbsp</td>
	 				<tr>
	 					<td>&nbsp</td>
	 					<td><button type="submit" class="dugmeForma">Potvrdi</button></td>
	 				</tr>
	 				<tr>&nbsp</td>
	 			</tr>
                  </table>
                </form>
	    	</div>
	    	</div>
	    	
	        <table width="100%" border="0" class="tabela">
	    		<tr bgcolor="lightgrey" class="zaglavljeTabele">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Cena</th>
	    			<th>Trener</th>
	    			<th>Opis</th>
	    			<th>&nbsp</th>
	    		</tr>
	    			
	    		<tr v-for="p in grupniTreninzi" v-on:click="izaberiGrupni(p)" :class="{selected : izabraniGrupni.name == p.name}" class="parniRedovi" style="height:2.5cm">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.price}}</td>
	    			<td>{{p.trainer.firstName}} {{p.trainer.lastName}}</td>
	    			<td>{{p.description}}</td>
	    			<td><button v-on:click="detaljnijiPrikazGrupno" class="dugmeObrisi">Izmeni trening</button></td>
	    		</tr>
	    	</table>
	    	<br><br>
	    	<h2 style="color:#152a6a"> Personalni treninzi </h2>
	    	<button v-on:click="dodajPersonalni" v-show="!personalniDodavanje" class="dugmeObrisi">Dodaj sadržaj</button>
	    	<button v-on:click="zatvoriDetaljnijiPrikazPersonalni" v-show="personalniDodavanje" class="dugmeZatvori">x</button>
	    <div class="forma">
	    <div v-show="personalniDodavanje">
	    	 <img id="slikaIDPer" src="" alt="Slika treninga" width="200" height="100" v-show="this.slikaVisPer">
	    	<form @submit="dodajPersonalniTrening" method="post">
	    		 <table style="margin-right: auto; margin-left: auto;">
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Naziv:</label></th>
                      <td><input  class="inputPolje" v-model="personalniTrening.name" type="text" required></td>
                  </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Trajanje:</label></th>
                      <td><input class="inputPolje"  v-model="personalniTrening.duration" type="number" min="1" step="any" ></td>
                  </tr>
                   <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Cena:</label></th>
                      <td><input class="inputPolje"  v-model="personalniTrening.price" type="number" min="0" step="any" ></td>
                  </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Trener:</label></th>
	 						<td>
	 							<select class="padajuciMeni" name="trener" v-model="personalniTrening.trainer" required>
	 								 <option v-for="m in treneri" :value=m>
	 								 	{{m.firstName}} {{m.lastName}}
	 								 </option>
	 							</select>
	 						</td>
                </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Opis:</label></th>
                      <td><input class="inputPolje"  v-model="personalniTrening.description" type="text" /></td>
                  </tr>
                  <tr>
	 				<th class="poravnanjeLabeleForma"><labela class="labelaStil">Slika:</th>
	 				<td>
	 				<input class="inputPolje" type="file" onchange="encodeImageFileAsURLPer(this)" v-on:click="dodajSlikuPer" required>
	 				</td>
	 				<tr>&nbsp</tr>
	 				<tr>&nbsp</tr>
	 				<tr>
	 				    <td>&nbsp</td>
	 					<td><button type="submit" class="dugmeForma">Potvrdi</button></td>
	 				</tr>
	 				<tr>&nbsp</tr>
	 				
	 			</tr>
                  </table>
                </form>
	    	</div>
	    	</div>
	    	
	    <button v-on:click="zatvoriDetaljnijiPrikazIzmenaPersonalni" v-show="personalniIzmena" class="dugmeZatvori">x</button>
	    <div class="forma">
	    <br>
	    <div v-show="personalniIzmena">
	    	 	<form @submit="izmeniPersonalniTrening">
	    		 <table style="margin-right: auto; margin-left: auto;">
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Naziv:</label></th>
                      <td><input class="inputPolje" disabled   v-model="izabraniPersonalni.name" type="text"></td>
                  </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Trajanje:</label></th>
                      <td><input class="inputPolje" v-model="izabraniPersonalni.duration" type="number" min="1" step="any" ></td>
                  </tr>
                    <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil" >Cena:</label></th>
                      <td><input class="inputPolje" v-model="izabraniPersonalni.price" type="number" min="0" step="any" ></td>
                  </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Trener:</label></th>
	 						<td>
	 							<select class="padajuciMeni" name="trener" v-model="izabraniPersonalni.trainer" required>
	 								 <option v-for="m in treneri" :value=m>
	 								 	{{m.firstName}} {{m.lastName}}
	 								 </option>
	 							</select>
	 						</td>
                </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Opis:</label></th>
                      <td><input class="inputPolje" v-model="izabraniPersonalni.description" type="text" /></td>
                  </tr>
                  <tr>
	 				<th class="poravnanjeLabeleForma"><labela class="labelaStil">Slika:</labela></th>
	 				<td>
	 				  <img :src=izabraniPersonalni.image  alt="Slika treninga" width="50" height="50"/>
	 				</td>
	 			</tr>
	 			<tr>&nbsp</tr>
	 			<tr>&nbsp</tr>
	 			<tr>
	 			<td>&nbsp</td>
	 			<td><button type="submit" class="dugmeForma">Potvrdi</button></td>
	 			</tr>
	 			<tr>&nbsp</tr>
                  </table>
                   
                </form>
	    	</div>
	    	</div>
	    	
	        <table width="100%" border="0">
	    		<tr class="zaglavljeTabele" style="color:lightgrey; background-color:#050a44;">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Cena</th>
	    			<th>Trener</th>
	    			<th>Opis</th>
	    			<th>&nbsp</th>
	    		</tr>
	    			
	    		<tr v-for="p in personalniTreninzi" v-on:click="izaberiPersonalni(p)" :class="{selected : izabraniPersonalni.name == p.name}" class="parniRedovi" style="height:2.5cm">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.price}}</td>
	    			<td>{{p.trainer.firstName}} {{p.trainer.lastName}}</td>
	    			<td>{{p.description}}</td>
	    			<td><button v-on:click="detaljnijiPrikazPersonalno" class="dugmeObrisi">Izmeni trening</button></td>
	    		</tr>
	    	</table>
	    	<br></br>
	    	
	    	<h2 style="color:#152a6a"> Ostalo </h2>
	    	<button v-on:click="dodajOstalo" v-show="!ostaloDodavanje" class="dugmeObrisi">Dodaj sadržaj</button>
	    	<button v-on:click="zatvoriDetaljnijiPrikazOstalo" v-show="ostaloDodavanje" class="dugmeZatvori">x</button>
	    
	    <div>
	    <br>
	    <div v-show="ostaloDodavanje" class="forma">
	    	 <img id="slikaIDOst" src="" alt="Slika treninga" width="200" height="100" v-show="this.slikaVisOst">
	    	<form @submit="dodajOstaloTrening" method="post">
	    		 <table style="margin-right: auto; margin-left: auto;">
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Naziv:</label></th>
                      <td><input class="inputPolje"  v-model="OstaloTrening.name" type="text" required></td>
                  </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Trajanje:</label></th>
                      <td><input class="inputPolje" v-model="OstaloTrening.duration" type="number" min="1" step="any" ></td>
                  </tr>
                   <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Cena:</label></th>
                      <td><input class="inputPolje" v-model="OstaloTrening.price" type="number" min="0" step="any" ></td>
                  </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Trener:</label></th>
	 						<td>
	 							<select class="padajuciMeni" name="trener" v-model="OstaloTrening.trainer" required>
	 								 <option v-for="m in treneri" :value=m>
	 								 	{{m.firstName}} {{m.lastName}}
	 								 </option>
	 							</select>
	 						</td>
                </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Opis:</label></th>
                      <td><input class="inputPolje"  v-model="OstaloTrening.description" type="text" /></td>
                  </tr>
                  <tr>
	 				<th class="poravnanjeLabeleForma">Slika:</th>
	 				<td>
	 				<input class="inputPolje" type="file" onchange="encodeImageFileAsURLOst(this)" v-on:click="dodajSlikuOst" required>
	 				</td>
	 			</tr>
	 			<tr>&nbsp</tr>
	 			<tr>&nbsp</tr>
	 			<tr><td></td><td><button type="submit" class="dugmeForma">Potvrdi</button></td></tr>
                  </table>
                   
                </form>
	    	</div>
	    	<br>
	    	</div>
	    	
	    	<button v-on:click="zatvoriDetaljnijiPrikazIzmenaOstalo" v-show="ostaloIzmena" class="dugmeZatvori">x</button>
	   <div class="forma">
	   <br>
	    <div v-show="ostaloIzmena">
	    	 	<form @submit="izmeniOstaloTrening">
	    		 <table style="margin-right: auto; margin-left: auto;">
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Naziv:</label></th>
                      <td><input disabled class="inputPolje"  v-model="izabraniOstalo.name" type="text"></td>
                  </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Trajanje:</label></th>
                      <td><input class="inputPolje"  v-model="izabraniOstalo.duration" type="number" min="1" step="any" ></td>
                  </tr>
                 <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Cena:</label></th>
                      <td><input class="inputPolje"  v-model="izabraniOstalo.price" type="number" min="0" step="any" ></td>
                  </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Trener:</label></th>
	 						<td>
	 							<select name="trener" v-model="izabraniOstalo.trainer" class="padajuciMeni" required>
	 								 <option v-for="m in treneri" :value=m>
	 								 	{{m.firstName}} {{m.lastName}}
	 								 </option>
	 							</select>
	 						</td>
                </tr>
                  <tr>
                      <th class="poravnanjeLabeleForma"><label class="labelaStil">Opis:</label></th>
                      <td><input class="inputPolje" v-model="izabraniOstalo.description" type="text" /></td>
                  </tr>
                  <tr>
	 				<th class="poravnanjeLabeleForma"><labela class="labelaStil">Slika:</labela></th>
	 				<td>
	 				  <img :src=izabraniOstalo.image  alt="Slika treninga" width="50" height="50"/>
	 				</td>
	 			</tr>
	 			<tr>&nbsp</tr>
	 			<tr>&nbsp</tr>
	 			<tr>
	 				<td>&nbsp</td>
	 				<td><button type="submit" class="dugmeForma">Potvrdi</button></td>
	 			</tr>
	 			<tr>&nbsp</tr>
                  </table>
                </form>
	    	</div>
	    	<br>
	    	</div>
	        <table width="100%" border="0" class="tabela">
	    		<tr bgcolor="lightgrey" class="zaglavljeTabele">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Cena</th>
	    			<th>Trener</th>
	    			<th>Opis</th>
	    			<th>&nbsp</th>
	    		</tr>
	    			
	    		<tr v-for="p in ostaloTreninzi"  v-on:click="izaberiOstalo(p)" :class="{selected : izabraniOstalo.name == p.name}" class="parniRedovi" style="height:2.5cm">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.price}}</td>
	    			<td>{{p.trainer.firstName}} {{p.trainer.lastName}}</td>
	    			<td>{{p.description}}</td>
	    			<td><button v-on:click="detaljnijiPrikazOstalo" class="dugmeObrisi">Izmeni trening</button></td>
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
