Vue.component("facilities", { 
	data(){
 	 return {
	      facilities: null,
	      pretraga: {
            	"naziv": '',
            	"tip": '',
            	"lokacija": '',
            	"ocena": ''
            },
            filtriraniObjekti:[],
            detaljno:false,
            globalno:true,
            izabraniObjekat:{},
            mapaVis: false,
            komentari: null,
            treninzi:[],
            pretragaVisk: false,
            sortVisk: false,
            filterVisk: false,
            privremenaLista:[],
            izabranTip: {},
            izabraniStatus: {}
        }
 	
 	},
	    template: ` 
    	<div>
    		<div v-show="globalno">
    		
    		<button  @click=" pretragaVisk = !pretragaVisk ">Pretraga</button>
 			<button   @click=" sortVisk = !sortVisk">Sortiranje</button>
 			<button   @click=" filterVisk = !filterVisk">Filtriranje</button>
    	 	<table v-show="pretragaVisk">	 				
 				<tr>
 					<th>Naziv: </th> <td><input type="text" v-model="pretraga.naziv" v-on:input="search"></td>
 					<th>Tip: </th> <td><input type="text" v-model="pretraga.tip" v-on:input="search"></td>
 					<th>Lokacija: </th> <td><input type="text" v-model="pretraga.lokacija" v-on:input="search"></td>
 					<th>Ocena: </th> <td><input type="text" v-model="pretraga.ocena" v-on:input="search"></td>
 				</tr>
 				</table>
 				
 				<div  v-show="sortVisk">
 				<table>
 					<tr><th>Naziv:</th></tr>
 					<tr><td><button v-on:click="imeOpadajuce">v</button><button v-on:click="imeRastuce">^</button></td></tr>
 				</table>
 				<table>
 					<tr><th>Lokacija:</th></tr>
 					<tr><td><button v-on:click="lokacijaOpadajuce">v</button><button v-on:click="lokacijaRastuce">^</button></td></tr>
 				</table>
 				<table>
 					<tr><th>Ocena ime:</th></tr>
 					<tr><td><button v-on:click="ocenaOpadajuce">v</button><button v-on:click="ocenaRastuce">^</button></td></tr>
 				</table>
 				</div>
 				<div  v-show="filterVisk">
 				<table>
 					<tr><th>Tip:</th></tr>
 					<tr><td>
 						<select name="tip" v-on:change="izmjenjenTip" v-model="izabranTip">
	 								 <option value="Teretana">Teretana</option>
	 								 <option value="Bazen">Bazen</option>
	 								  <option value="Plesni_studio">Plesni studio</option>
	 								   <option value="Sportski_centar">Sportski centar</option>
	 					</select>
 					</td>
 					</tr>
 				</table>
 				
 				 <table>
 					<tr><th>Status:</th></tr>
 					<tr><td>
 						<select name="tip" v-model="izabraniStatus" v-on:change="izmjenjenStatus">
	 								 <option value="Radi">Radi</option>
	 								 <option value="Ne_radi">Ne radi</option>
	 					</select>
 					</td>
 					</tr>
 				</table>
 				<button v-on:click="iskljuciFilter">x</button>
 			</div>
 				
 				
 			
    		<h3>Prikaz sportskih objekata</h3>
    		<table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Logo</th>
	    			<th>Naziv</th>
	    			<th>Tip objekta</th>
	    			<th>Sadržaj</th>
	    			<th>Status</th>
	    			<th>Adresa</th>
	    			<th>Prosečna ocena</th>
	    			<th>Radno vreme od</th>
	    			<th>Radno vreme do</th>
	    		</tr>
	    			
	    		<tr v-for="p in filtriraniObjekti"  v-on:click="izaberiObjekat(p)" :class="{selected : izabraniObjekat.name == p.name}">
	    			<td><img :src="p.imageName" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.typeSportsFacility}}</td>
	    			<td>{{p.contentsS}}</td>
	    			<td>{{p.working}}</td>
	    			<td>{{p.locationS}}</td>
	    			<td>{{p.averageGrade}}</td>
	    			<td>{{p.startingTimeS}}</td>
	    			<td>{{p.endingTimeS}}</td>
	    			<td><button v-on:click="detaljnijiPrikaz">Detaljno</button></td>
	    		</tr>
	    	</table>
	    	</div>	
	    	
	    	<div v-show="detaljno">
	    	<button class="napustiDetaljno" v-on:click="zatvoriDetaljnijiPrikaz">x</button>
	    	<table width="100%" border="0">
	    	<tr bgcolor="lightgrey">
	    			<th>Logo</th>
	    			<th>Naziv</th>
	    			<th>Tip objekta</th>
	    			<th>Sadržaj</th>
	    			<th>Status</th>
	    			<th>Adresa</th>
	    			<th>Prosečna ocena</th>
	    			<th>Radno vreme od</th>
	    			<th>Radno vreme do</th>
	    	</tr>
	    	<tr>
	    			<td><img :src="izabraniObjekat.imageName" width="70" height="70"/></td>
	    			<td>{{izabraniObjekat.name}}</td>
	    			<td>{{izabraniObjekat.typeSportsFacility}}</td>
	    			<td>{{izabraniObjekat.contentsS}}</td>
	    			<td>{{izabraniObjekat.working}}</td>
	    			<td>{{izabraniObjekat.locationS}}</td>
	    			<td>{{izabraniObjekat.averageGrade}}</td>
	    			<td>{{izabraniObjekat.startingTimeS}}</td>
	    			<td>{{izabraniObjekat.endingTimeS}}</td>
	    			<td class="celijaRes"><button class="mapaDugme" v-on:click="prikazMape"><img class="slikaP" src="components/slike/location.png" style="width:0.7cm;height:0.7cm;"/></button></td>
	    	</tr>
	    	</table>
	    	 		<div id="map1" class="map1" v-if="mapaVis" style="width:10cm;height:10cm;">  </div>
	    	 		
	    	<h3>Komentari</h3>
	    	<table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Korisnik</th>
	    			<th>Objekat</th>
	    			<th>Tekst komentara</th>
	    			<th>Ocjena</th>
	    		</tr>
	    			
	    		<tr v-for="p in komentari" v-if="p.sportsFacility == izabraniObjekat.name && p.logickiObrisan">
	    			<td>{{p.username}}</td>
					<td>{{p.sportsFacility}}</td>
					<td>{{p.comment}}</td>
					<td>{{p.grade}}</td>
	    		</tr>
	    	</table>
	    	
	    	<h3>Treninzi</h3>
	    	<table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Cena</th>
	    			<th>Trener</th>
	    			<th>Opis</th>
	    			<th>Tip</th>
	    		</tr>
	    			
	    		<tr v-for="p in treninzi" v-if="p.sportsFacility.name == izabraniObjekat.name">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.price}}</td>
	    			<td>{{p.trainer.firstName}} {{p.trainer.lastName}}</td>
	    			<td>{{p.description}}</td>
	    			<td v-if="p.trainingType == 'GROUP'">Grupni trening</td>
	    			<td v-if="p.trainingType == 'PERSONAL'">Personalni trening</td>
	    			<td v-if="p.trainingType == 'OTHER'">Ostalo</td>
	    		</tr>
	    	</table>
	    	
	    	</div>
	    	
	    	
    	</div>		  
    	`,
    methods:{
		search: function(){
			this.filtriraniObjekti = [];
		
			for(r of this.facilities){
				if(r.name.toUpperCase().trim().match(this.pretraga.naziv.toUpperCase().trim()) && r.typeSportsFacility.toString().toUpperCase().trim().match(this.pretraga.tip.toUpperCase().trim()) && r.averageGrade.toString().match(this.pretraga.ocena.toString())
					&& (r.locationS.toUpperCase().trim().match(this.pretraga.lokacija.toUpperCase().trim()))){
						this.filtriraniObjekti.push(r);
				}
			}
		},
		izaberiObjekat: function(objekat) {
    		this.izabraniObjekat = objekat;
    	},
    	detaljnijiPrikaz: function(){
			this.detaljno = true;
			this.globalno = false;
		},
		zatvoriDetaljnijiPrikaz: function(){
			this.detaljno = false;
			this.globalno = true;
			this.mapaVis=false;
		},
		prikazMape: function(){
			this.mapaVis = !this.mapaVis;
			if (this.mapaVis) {
                this.$nextTick(function () {
                    this.initForMap();

                    let c = document.getElementById("map1").childNodes;
                    c[0].style.borderRadius  = '10px';
                    c[0].style.border = '4px solid lightgrey';
                })
            }
		},
		initForMap: function () {

            const iconFeature = new ol.Feature({
  				geometry: new ol.geom.Point(ol.proj.fromLonLat([this.izabraniObjekat.location.latitude,this.izabraniObjekat.location.longitude])),
  				name: 'Lokacija',
			});
            const map1 = new ol.Map({
                target: 'map1',
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    }),
                   	new ol.layer.Vector({
     				 	source: new ol.source.Vector({
        				features: [iconFeature]
      				}),
      				style: new ol.style.Style({
	        			image: new ol.style.Icon({
          				anchor: [0.5, 46],
          				anchorXUnits: 'fraction',
	          			anchorYUnits: 'pixels',
          				src: 'https://openlayers.org/en/latest/examples/data/icon.png'
        			})
      			})
    		})
            ],
                
                view: new ol.View({
                    center: ol.proj.fromLonLat([this.izabraniObjekat.location.latitude,this.izabraniObjekat.location.longitude]),
                    zoom: 15
                })
            })

		},
		iskljuciFilter: function(){
			this.filtriraniObjekti = [];
			for(r of this.privremenaLista){
				this.filtriraniObjekti.push(r);
			}
		},
		izmjenjenTip: function(){
			this.filtriraniObjekti = [];
			for(r of this.privremenaLista){
				if(r.typeSportsFacility.toString().match(this.izabranTip) && r.working.toString().match(this.izabraniStatus)){
						this.filtriraniObjekti.push(r);
				}
			}
		},
		izmjenjenStatus :function(){
			this.filtriraniObjekti = [];
			for(r of this.privremenaLista){
				if(r.typeSportsFacility.toString().match(this.izabranTip) && r.working.toString().match(this.izabraniStatus)){
						this.filtriraniObjekti.push(r);
				}
			}
		},
		imeOpadajuce: function(){
			function compare(a, b) {
     		 	if (a.name < b.name)
        			return -1;
      			if (a.name > b.name)
        			return 1;
      			return 0;
      		}

		   return this.filtriraniObjekti.sort(compare);
		},
		
	lokacijaOpadajuce: function(){
			function compare(a, b) {
     		 	if (a.locationS < b.locationS)
        			return 1;
      			if (a.locationS > b.locationS)
        			return -1;
      			return 0;
      		}

		   return this.filtriraniObjekti.sort(compare);
		},
		
	lokacijaRastuce: function(){
			function compare(a, b) {
     		 	if (a.locationS < b.locationS)
        			return -1;
      			if (a.locationS > b.locationS)
        			return 1;
      			return 0;
      		}

		   return this.filtriraniObjekti.sort(compare);
		},
		
	ocenaOpadajuce: function(){
			function compare(a, b) {
     		 	if (a.averageGrade < b.averageGrade)
        			return 1;
      			if (a.averageGrade > b.averageGrade)
        			return -1;
      			return 0;
      		}

		   return this.filtriraniObjekti.sort(compare);
		},
		
	ocenaRastuce: function(){
			function compare(a, b) {
     		 	if (a.averageGrade < b.averageGrade)
        			return -1;
      			if (a.averageGrade > b.averageGrade)
        			return 1;
      			return 0;
      		}

		   return this.filtriraniObjekti.sort(compare);
		},
		
	imeRastuce: function(){
			function compare(a, b) {
     		 	if (a.name < b.name)
        			return 1;
      			if (a.name > b.name)
        			return -1;
      			return 0;
      		}

		   return this.filtriraniObjekti.sort(compare);
		},
		
	}
	
    ,
    mounted () {
        axios
          .get('rest/facilities/')
          .then(response => (this.facilities = response.data,
           		 response.data.forEach(el => {
                    this.filtriraniObjekti.push(el);
                    this.privremenaLista.push(el);
                }))),
        axios
          .get('rest/login/prikaziKomentare')
          .then(response => (this.komentari = response.data)),
        axios
          .get('rest/kupac/sviTreninzi')
          .then(response => (this.treninzi = response.data))
    },
});