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
	 		<button  @click=" pretragaVisk = !pretragaVisk ">Pretraga</button>
 			<button   @click=" sortVisk = !sortVisk">Sortiranje</button>
 			<button   @click=" filterVisk = !filterVisk">Filtriranje</button>
 			<table   v-show="pretragaVisk">
 				<tr>
 					<th>Ime: </th> <td><input type="text" v-model="pretragak.firstName" v-on:input="pretrazi"></td>
 					<th>Prezime: </th> <td><input type="text" v-model="pretragak.lastName" v-on:input="pretrazi"></td>
 					<th>Korisnicko ime: </th> <td><input type="text" v-model="pretragak.username" v-on:input="pretrazi"></td>
 				</tr>
 			</table>
 			<div  v-show="sortVisk">
 				<table>
 					<tr><th>Ime:</th></tr>
 					<tr><td><button v-on:click="imeOpadajuce">v</button><button v-on:click="imeRastuce">^</button></td></tr>
 				</table>
 				<table>
 					<tr><th>Prezime:</th></tr>
 					<tr><td><button v-on:click="prezimeOpadajuce">v</button><button v-on:click="prezimeRastuce">^</button></td></tr>
 				</table>
 				<table>
 					<tr><th>Korisnicko ime:</th></tr>
 					<tr><td><button v-on:click="korisnickoImeOpadajuce">v</button><button v-on:click="korisnickoImeRastuce">^</button></td></tr>
 				</table>
 				<table>
 					<tr><th>Bodovi:</th></tr>
 					<tr><td><button v-on:click="bodoviOpadajuce">v</button><button v-on:click="bodoviRastuce">^</button></td></tr>
 				</table>
 			</div>
 			<div  v-show="filterVisk">
 				<table>
 					<tr><th>Uloga:</th></tr>
 					<tr><td>
 						<select name="tip" v-model="izabranaUloga" v-on:change="izmjenjenaUloga">
	 								 <option value="CUSTUMER">kupac</option>
	 								 <option value="TRAINER">trener</option>
	 					</select>
 					</td>
 					</tr>
 				</table>
 				<table class="sortTabk">
 					<tr><th v-if="izabranaUloga == 'CUSTUMER'">Tip:</th></tr>
 					<tr><td  v-if="izabranaUloga == 'CUSTUMER'">
 						<select name="status" v-model="izabraniTip" v-on:change="izmjenjenTip">
									 <option value=""> </option>
	 								 <option value="GOLD">zlatni</option>
	 								 <option value="SILVER">srebrni</option>
	 								 <option value="BRONZE">bronzani</option>
	 					</select>
 					</td></tr>
 				</table>
 				<button v-on:click="iskljuciFilter">x</button>
 			</div>
 			<div> 			
        		<table>
					<tr>
						<th>Ime</th>
						<th>Prezime</th>
						<th>Korisnicko ime</th>
						<th>Uloga</th>
						<th>Tip korisnika</th>
						<th>Bodovi</th>
					</tr>
					<tr v-for="k in filtriraniKorisnici"  v-if="!k.logickiObrisan">
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