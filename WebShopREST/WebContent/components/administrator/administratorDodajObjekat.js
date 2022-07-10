  Vue.component("administrator-dodavanjeObjekta", {
 	data(){
 	 return {
		    noviObjekat: {},
            slobodniMenadzeri: {},
            noviKorisnik: {},
            menadzeriVis: false,
            objekatVis: true,
            mapaVis: false,
            slikaVis: false,
			prikazDodatogObjekta:false,
			facilities: null
        }
 	
 	},
 	template: ` 
 		<div>
 			<div>
 				<form @submit="dodajObjekat" method="post">
        			<img id="slikaID" src="" alt="Slika objekta" width="200" height="100" v-show="this.slikaVis">
 					<table>
 						<tr>
	 						<th>Naziv:</th>
		 					<td>
								<input type="text" v-model="noviObjekat.naziv" required>
							</td>
	 					</tr>	
	 					<tr>
	 						<th>Tip:</th>
	 						<td>
							 <select name="tipObjekta" v-model="noviObjekat.tipObjekta" required>
								<option value="Teretana">Teretana </option>
								<option value="Bazen">Bazen</option>
								<option value="Plesni_studio">Plesni studio </option>
								<option value="Sportski_centar">Sportski centar </option>
							</select>
							</td>
 						</tr>
						<tr>
						 <th>Sadrzaj:</th>
						 <td>
						  <select name="sadrzajObjekta" v-model="noviObjekat.sadrzaj" required>
							<option value="Personalni_trening">Personalni trening</option>
							<option value="Grupni_trening">Grupni trening</option>
							<option value="Sauna">Sauna</option>
						  </select>
						</td>
						</tr>
						<tr>
	 					<th>Status:</th>
	 						<td>
							 <select name="statusObjekta" v-model="noviObjekat.working" required>
								<option value="Radi">Radi</option>
								<option value="Ne_radi">Ne_radi</option>
							</select>
							</td>
 						</tr>
						<tr>
							<th>Radno vrijeme:</th>
							 <td>
							 	&nbsp od &nbsp <input type="time" v-model="noviObjekat.startingTime" id="startingTime"  required>&nbsp
							 	do &nbsp <input type="time" v-model="noviObjekat.endingTime" id="endingTime"  required>
						 	</td>
 						</tr>


 						<tr>
	 						<th>Menadzer:</th>
	 						<td>
	 							<select name="menadzer" v-model="noviObjekat.menadzer" required>
	 								 <option v-for="m in slobodniMenadzeri" :value=m.username>
	 								 	{{m.firstName}} {{m.lastName}}
	 								 </option>
	 							</select>
	 							<input type="button" v-on:click="dodajNovogMenadzera"  value="+"/>
	 						</td>
	 					</tr>
 						<tr>
	 						<th>Lokacija:</th>
		 					<td>
								<input type="text" id="lokacijaID">
								<button v-on:click="dodajLokaciju"><img alt="dodaj lokaciju slika" src="components/slike/location.png" style="width:0.7cm;height:0.7cm;"></button>
							</td>
		 					
	 					</tr>			
	 					<tr>
                        	<th> Grad: </th>
                        	<td> <input type="text" id="gradID" required> </td>
                    	</tr>
                    	<tr>
                        	<th> Ulica: </th>
                        	<td> <input type="text" id="ulicaID" required> </td>
                    	</tr>
                    	<tr>
                        	<th class="labelaDR"> Broj:</th>
                        	<td> <input type="text" id="brojID"  required> </td>
                    	</tr>
                    	<tr>
                        	<th> Postanski broj:</th>
                        	<td> <input type="text" id="postanskiBrojID"  required> </td>
                    	</tr>
						
	 					<tr>
	 						<th>Logo:</th>
	 						<td>
	 						 	<input type="file" onchange="encodeImageFileAsURL(this)" v-on:click="dodajSliku" required>
	 						</td>
	 					</tr>
	 					<tr>
                	    <button type="submit">Dodaj objekat</button>
                	    </tr>
	 				</table>	
	 				 
				</form>
 			</div>
 			<div v-show="this.menadzeriVis">
 			<button  v-on:click="zatvoriDodavanjeMenadzera">x</button>
 				<form @submit="dodajMenadzera" method="post">
 					<table>
 						<tr>
	 						<th>Ime:</th>
		 					<td><input type="text" v-model="noviKorisnik.firstName" required></td>
	 					</tr>	
	 					<tr>
	 						<th>Prezime:</th>
	 						<td><input type="text" v-model="noviKorisnik.lastName" required></td>
 						</tr>		
 						<tr>
	 						<th>Korisnicko ime:</th>
		 					<td><input type="text" v-model="noviKorisnik.username" required></td>
	 					</tr>			
	 					<tr>
	 						<th>Lozinka:</th>
	 						<td><input type="text" v-model="noviKorisnik.password" required></td>
	 					</tr>
	 					<tr>
	 						<th>Pol:</th>
	 						<td><select name="pol" v-model="noviKorisnik.gender" required>
                      			<option value="MALE">muski</option>
                      			<option value="FEMALE">zenski</option>
                      		</select></td>
	 					</tr>
	 					<tr>
	 						<th>Datum rodjenja:</th>
	 						<td><input type="date" v-model="noviKorisnik.birthDate" required></td>
	 					</tr>
	 					<tr>
                	    	<button type="submit">Dodaj korisnika</button>
                	    </tr>
	 				</table>	
				</form>
 			</div>
			<div id="map"  v-if="mapaVis" style="width:100%;height:10cm;">  </div>

			<div>
			  <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Logo</th>
	    			<th>Naziv</th>
	    			<th>Tip objekta</th>
	    			<th>Sadržaj</th>
	    			<th>Status</th>
	    			<th>Adresa</th>
	    			<th>Prosečna ocena</th>
	    		</tr>
	    			
	    		<tr v-for="p in facilities">
	    			<td><img :src="p.imageName" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.typeSportsFacility}}</td>
	    			<td>{{p.contentsS}}</td>
	    			<td>{{p.working}}</td>
	    			<td>{{p.locationS}}</td>
	    			<td>{{p.averageGrade}}</td>
					
	    		</tr>
	    	  </table>
			</div>

			 
    	</div>
	`,
	
	methods: {
		zatvoriDodavanjeMenadzera: function(){
			this.menadzeriVis = false;
			this.objekatVis = true;
		},
		dodajObjekat : function() {
	 	 	event.preventDefault();
	 	 	this.noviObjekat.logo = document.getElementById("slikaID").src;
	 	 	this.noviObjekat.grad = document.getElementById("gradID").value;
	 	 	this.noviObjekat.ulica = document.getElementById("ulicaID").value;
	 	 	this.noviObjekat.broj = document.getElementById("brojID").value;
	 	 	this.noviObjekat.postanskiBroj = document.getElementById("postanskiBrojID").value; 
	 	 	this.noviObjekat.longlat = document.getElementById("lokacijaID").value;
			//this.noviObjekat.startingTime = document.getElementById("pocetakRadnogVremena").value;
			//this.noviObjekat.endingTime = document.getElementById("krajRadnogVremena").value;
	 	 	 axios
                .post('rest/administrator/dodajObjekat', {
                		"naziv": this.noviObjekat.naziv,
                        "tipObjekta": this.noviObjekat.tipObjekta,
                        "menadzer": this.noviObjekat.menadzer,
                        "grad": this.noviObjekat.grad,
                        "ulica": this.noviObjekat.ulica,
                        "broj": this.noviObjekat.broj,
                        "postanskiBroj": this.noviObjekat.postanskiBroj,
                        "longlat": this.noviObjekat.longlat,
                        "logo": this.noviObjekat.logo,
						"sadrzaj":this.noviObjekat.sadrzaj,
						"working":this.noviObjekat.working
						//"startingTime":this.noviObjekat.startingTime,
						//"endingTime":this.noviObjekat.endingTime
                    })
                    .then(response => {
                       //location.href = "/WebShopREST/StartPage.html"; 
					   axios
							.get('rest/facilities/')
							.then(response => (this.facilities = response.data))
					   this.mapaVis=false;
					   window.location.reload();
					  
                    })
                    .catch(err =>{ 
                    	alert("Objekat vec postoji!");
                })
	 	},
	 	dodajMenadzera : function (event) {
	 	 	event.preventDefault();
	 	 	 axios
                    .post('rest/login/dodajMenadzera', {
                        "firstName": this.noviKorisnik.firstName,
                        "lastName": this.noviKorisnik.lastName,
                        "username": this.noviKorisnik.username,
                        "password": this.noviKorisnik.password,
                        "gender": this.noviKorisnik.gender,
                        "birthDate": this.birthDate
                    })
                    .then(response => {
						axios
						.get('rest/administrator/slobodniMenadzeri')
						.then(response => this.slobodniMenadzeri = response.data);
                        this.objekatVis = true;
                        this.menadzeriVis = false;
                    })
                    .catch(err =>{ 
                    	alert("Korisnicko ime vec postoji!");
                })
	 	},
	 	dodajNovogMenadzera: function(){
	 		this.objekatVis = false;
	 		this.menadzeriVis = true;
	 	},
		 dodajLokaciju: function(){
			this.prikazDodatogObjekta  = false;
			this.mapaVis = !this.mapaVis;
			if (this.mapaVis) {
			   this.$nextTick(function () {
				   this.initForMap();

				   let c = document.getElementById("map").childNodes;
				   c[0].style.borderRadius  = '10px';
				   c[0].style.border = '4px solid lightgrey';
			   })
		   }
		},
	 	dodajSliku: function(){
	 		this.slikaVis = true;
	 	},
		 initForMap: function () {

            const map = new ol.Map({
                target: 'map',
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                view: new ol.View({
                    center: [0, 0],
                    zoom: 2
                })
            })

            map.on('click', function (evt) {
                console.log(evt.coordinate);

                var coord = ol.proj.toLonLat(evt.coordinate);
				reverseGeocode(coord);
            })
       } 
       
	},
    mounted() {
        axios
           	.get('rest/administrator/slobodniMenadzeri')
           	.then(response => this.slobodniMenadzeri = response.data),
		axios
			.get('rest/facilities/')
			.then(response => (this.facilities = response.data))
		    this.mapaVis=false;
    },
 });

 function reverseGeocode(coords) {
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1])
        .then(function (response) {
            return response.json();
        }).then(function (json) {
        	let long = coords[0];
        	let lat = coords[1];
            document.getElementById("lokacijaID").value = long + ", " + lat;
            if (json.address.city) {
                document.getElementById("gradID").value = json.address.city;
            } else if (json.address.city_district) {
                document.getElementById("gradID").value = json.address.city_district;
            }

            if (json.address.road) {
                document.getElementById("ulicaID").value = json.address.road;
            }

            if (json.address.house_number) {
                document.getElementById("brojID").value = json.address.house_number;
            }

            if(json.address.postcode){
                document.getElementById("postanskiBrojID").value = json.address.postcode;
            }
        });
}
 


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