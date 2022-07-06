 Vue.component("app-objekti", {
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
            izabraniObjekat:{}
        }
 	
 	},
	    template: ` 
    	<div>
    		<div v-show="globalno">
    	 	<table>	 				
 				<tr>
 					<th>Naziv: </th> <td><input type="text" v-model="pretraga.naziv" v-on:input="search"></td>
 					<th>Tip: </th> <td><input type="text" v-model="pretraga.tip" v-on:input="search"></td>
 					<th>Lokacija: </th> <td><input type="text" v-model="pretraga.lokacija" v-on:input="search"></td>
 					<th>Ocena: </th> <td><input type="text" v-model="pretraga.ocena" v-on:input="search"></td>
 				</tr>
 				</table>
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
	    			<td><button v-on:click="detaljnijiPrikaz">Izmeni objekat</button></td>
	    		</tr>
	    	</table>
	    	</div>	
	    	
	    	<div v-show="detaljno">
	    	<button class="napustiDetaljno" v-on:click="zatvoriDetaljnijiPrikaz">x</button>
	    	<table width="100%" border="0">
	    	<tr bgcolor="lightgrey">
	    	    <th>Naziv</th>
	    		<th>Adresa</th>
	    		<th>Prosečna ocena</th>
	    	</tr>
	    	<tr>
	    	<td>{{izabraniObjekat.name}}</td>
	    	<td>{{izabraniObjekat.locationS}}</td>
	    	<td>{{izabraniObjekat.averageGrade}}</td>
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
		},
	}
	
    ,
    mounted () {
        axios
          .get('rest/facilities/')
          .then(response => (this.facilities = response.data,
           		 response.data.forEach(el => {
                    this.filtriraniObjekti.push(el);
                })))
    },
});