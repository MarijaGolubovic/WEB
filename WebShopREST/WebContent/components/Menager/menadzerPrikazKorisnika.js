 Vue.component("app-korisniciMenadzer", {
 	data(){
 	 return {
            korisnici: {},
            izabraniKorisnik: {},
            pretragaVisk: false,
            sortVisk: false,
            filterVisk: false,
            pretragak: {},
            filtriraniKorisnici: [],
            privremenaLista: [],
            izabranaUloga: {},
            izabraniTip: {},
        }
 	
 	},
 	template: ` 
 		<div>
 		<br><br>
 		<div class="filtriranjeSortiranjePanel" style="align-items: center;">
 			<br>
 				<table style="width:30%">
 					<tr>
 						<td>&nbsp</td>
 						<td><button  @click=" pretragaVisk = !pretragaVisk " class="filtriranjeSortiranjeDugme">Pretraga</button></td>
 						<td><button   @click=" sortVisk = !sortVisk" class="filtriranjeSortiranjeDugme">Sortiranje</button></td>
 						<td><button   @click=" filterVisk = !filterVisk" class="filtriranjeSortiranjeDugme">Filtriranje</button></td>
 					</tr>
 					<tr>&nbsp</tr>
 				</table>
 			</div>
 			<br>
 			<div>
 			<table   v-show="pretragaVisk" style="width:60%">
 				<tr>
 					<th>&nbsp</th>
	 				<th>&nbsp</th>
 					<th class="pretragaLabele">Ime: </th> <td><input class="pretragaPolje" type="text" v-model="pretragak.firstName" v-on:input="pretrazi"></td>
 					<th class="pretragaLabele">Prezime: </th> <td><input class="pretragaPolje" type="text" v-model="pretragak.lastName" v-on:input="pretrazi"></td>
 					<th class="pretragaLabele">Korisnicko ime: </th> <td><input class="pretragaPolje" type="text" v-model="pretragak.username" v-on:input="pretrazi"></td>
 				</tr>
 			</table>
 			</div>
 			<div>
	 			<div  v-show="sortVisk">
	 				<table style="width:40%">
	 					<tr>
	 						<td>
	 							<table>
	 								<tr><th class="pretragaLabele">Ime:</th></tr>
	 								<tr><td><button class="sortiranjeDugme" v-on:click="imeOpadajuce">v</button>&nbsp<button v-on:click="imeRastuce" class="sortiranjeDugme">^</button></td></tr>
	 							</table>
	 						</td>
	 			
	 						<td>
	 							<table>
	 								<tr><th class="pretragaLabele">Prezime:</th></tr>
	 								<tr><td><button v-on:click="prezimeOpadajuce" class="sortiranjeDugme">v</button>&nbsp<button class="sortiranjeDugme" v-on:click="prezimeRastuce">^</button></td></tr>
	 							</table>
	 						</td>
	 					
	 						<td>
	 							<table>
	 								<tr><th class="pretragaLabele">Korisnicko ime:</th></tr>
	 								<tr><td><button v-on:click="korisnickoImeOpadajuce" class="sortiranjeDugme">v</button>&nbsp<button class="sortiranjeDugme" v-on:click="korisnickoImeRastuce">^</button></td></tr>
	 							</table>
	 						</td>
	 					
	 						<td>
	 							<table>
	 								<tr><th class="pretragaLabele">Bodovi:</th></tr>
	 								<tr><td><button v-on:click="bodoviOpadajuce" class="sortiranjeDugme">v</button>&nbsp<button class="sortiranjeDugme" v-on:click="bodoviRastuce">^</button></td></tr>
	 							</table>
	 						</td>
	 				   </tr>	
	 				</table>
	 			</div>
	 		</div>
 			<div  v-show="filterVisk">
 				<table>
 					<tr><th class="pretragaLabele">Uloga:</th></tr>
 					<tr><td>
 						<select name="tip" v-model="izabranaUloga" v-on:change="izmjenjenaUloga" class="filtriranjeLista">
	 								 <option value="CUSTUMER">kupac</option>
	 								 <option value="TRAINER">trener</option>
	 					</select>
 					</td>
 					</tr>
 				</table>
 				
 				<table class="sortTabk">
 					<tr><th v-if="izabranaUloga == 'CUSTUMER'" class="pretragaLabele">Tip:</th></tr>
 					<tr><td  v-if="izabranaUloga == 'CUSTUMER'">
 						<select name="status" v-model="izabraniTip" v-on:change="izmjenjenTip" class="filtriranjeLista">
									 <option value=""> </option>
	 								 <option value="GOLD">zlatni</option>
	 								 <option value="SILVER">srebrni</option>
	 								 <option value="BRONZE">bronzani</option>
	 					</select>
 					</td></tr>
 				</table>
 				<button v-on:click="iskljuciFilter" class="dugmeZatvori">x</button>
 			</div>
 			<br><br>
 			<div> 			
        		<table class="tabela" width="100%" border="0">
					<tr class="zaglavljeTabele" style="background-color:lightgray">
						<th>Ime</th>
						<th>Prezime</th>
						<th>Korisnicko ime</th>
						<th>Uloga</th>
						<th>Tip korisnika</th>
						<th>Bodovi</th>
					</tr>
					<tr v-for="k in filtriraniKorisnici"  v-if="!k.logickiObrisan" class="parniRedovi" style="height:0.8cm">
						<td>{{k.firstName }}</td>
						<td>{{k.lastName}}</td>
						<td>{{k.username }}</td>
						<td>{{k.role}}</td>
						<td v-if="k.role == 'CUSTUMER'">{{k.customerType}}</td>
						<td v-if="k.role == 'CUSTUMER'">{{k.collectedPoints}}</td>
					</tr>
				</table>
    		</div>
    	</div>
	`,
	methods: {
		iskljuciFilter: function(){
			this.filtriraniKorisnici = [];
			for(r of this.privremenaLista){
				this.filtriraniKorisnici.push(r);
			}
		},
		izmjenjenaUloga: function(){
			if(this.izabranaUloga != 'CUSTUMER'){
				this.izabraniTip = "";
			}
			this.filtriraniKorisnici = [];
			for(r of this.privremenaLista){
				if((this.izabranaUloga.toString() == '' || r.role.toString().match(this.izabranaUloga.toString())) && (this.izabraniTip.toString() == '' || r.tip.toString().match(this.izabraniTip.toString()))){
						this.filtriraniKorisnici.push(r);
				}
			}
		},
		izmjenjenTip: function(){
			
			this.filtriraniKorisnici = [];
			for(r of this.privremenaLista){
				if((this.izabranaUloga.toString() == '' || r.role.toString().match(this.izabranaUloga.toString())) && (this.izabraniTip.toString() == '' || r.customerType.toString().match(this.izabraniTip.toString()))){
						this.filtriraniKorisnici.push(r);
				}
			}
		},
		imeOpadajuce: function(){
			function compare(a, b) {
     		 	if (a.firstName < b.firstName)
        			return -1;
      			if (a.firstName > b.firstName)
        			return 1;
      			return 0;
      		}

		    this.filtriraniKorisnici.sort(compare);
		},
		imeRastuce: function(){
			function compare(a, b) {
     		 	if (a.firstName < b.firstName)
        			return 1;
      			if (a.firstName > b.firstName)
        			return -1;
      			return 0;
      		}

		    return this.filtriraniKorisnici.sort(compare);
		},
		bodoviOpadajuce: function(){
			function compare(a, b) {
     		 	if (a.collectedPoints < b.collectedPoints)
        			return -1;
      			if (a.collectedPoints > b.collectedPoints)
        			return 1;
      			return 0;
      		}

		    this.filtriraniKorisnici.sort(compare);
		},
		bodoviRastuce: function(){
			function compare(a, b) {
     		 	if (a.collectedPoints < b.collectedPoints)
        			return 1;
      			if (a.collectedPoints > b.collectedPoints)
        			return -1;
      			return 0;
      		}

		    return this.filtriraniKorisnici.sort(compare);
		},
		korisnickoImeOpadajuce: function(){
			function compare(a, b) {
     		 	if (a.username < b.username)
        			return -1;
      			if (a.username > b.username)
        			return 1;
      			return 0;
      		}

		    this.filtriraniKorisnici.sort(compare);
		},
		korisnickoImeRastuce: function(){
			function compare(a, b) {
     		 	if (a.username < b.username)
        			return 1;
      			if (a.username > b.username)
        			return -1;
      			return 0;
      		}

		    return this.filtriraniKorisnici.sort(compare);
		},
		prezimeOpadajuce: function(){
			function compare(a, b) {
     		 	if (a.lastName < b.lastName)
        			return -1;
      			if (a.lastName > b.lastName)
        			return 1;
      			return 0;
      		}

		    this.filtriraniKorisnici.sort(compare);
		},
		prezimeRastuce: function(){
			function compare(a, b) {
     		 	if (a.lastName < b.lastName)
        			return 1;
      			if (a.lastName > b.lastName)
        			return -1;
      			return 0;
      		}

		    return this.filtriraniKorisnici.sort(compare);
		},
		pretrazi: function(){
			this.filtriraniKorisnici = [];
			for(k of this.korisnici){
				if(k.firstName.toUpperCase().match(this.pretragak.firstName.toUpperCase()) && k.lastName.match(this.pretragak.lastName) && k.username.match(this.pretragak.username)){
						this.filtriraniKorisnici.push(k);
				}
			}
			this.privremenaLista = this.filtriraniKorisnici;
		},
	},
    mounted() {
        axios
           	.get('rest/menager/korisnici')
           	.then(response => (
           		this.korisnici = response.data,
           		response.data.forEach(el => {
                    this.filtriraniKorisnici.push(el);
                    this.privremenaLista.push(el);
                })
			))
    },
 });