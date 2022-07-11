 Vue.component("app-ZakazaniTreninziTrener", {
 	data(){
 	 return {
	      grupniTreninzi: [],
	      personalniTreninzi: [],
	      izabraniTrening: {}

        }
 	
 	},
	    template: ` 
    	<div>
	    	<h2 style="color:#152a6a"> Grupni treninzi </h2>	    	
	        <table width="100%" border="0" class="tabela">
	    		<tr bgcolor="lightgrey" class="zaglavljeTabele" style="color:lightgrey; background-color:#050a44;">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Objekat</th>
	    			<th>Opis</th>
	    			<th>Datum prijave</th>
	    			<th>Datum treninga</th>
	    			<th>Status treninga</th>
	    		</tr>
	    			
	    		<tr v-for="p in grupniTreninzi" class="parniRedovi" style="height:2.5cm">
	    			<td><img :src="p.training.image" width="70" height="70"/></td>
	    			<td>{{p.training.name}}</td>
	    			<td>{{p.training.duration}}</td>
	    			<td>{{p.training.sportsFacility.name}}</td>
	    			<td>{{p.training.description}}</td>
	    			<td>{{p.dataTimeApplicationS}}</td>
	    			<td>{{p.dataTrainingS}}</td>
	    			<td>{{p.status}}</td>
	    		</tr>
	    	</table>

	    	
			<br><br>
	    	<h2 style="color:#152a6a"> Personalni treninzi </h2>
	        <table width="100%" border="0" class="tabela">
	    		<tr bgcolor="lightgrey" class="zaglavljeTabele">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Objekat</th>
	    			<th>Opis</th>
	    			<th>Datum prijave</th>
	    			<th>Datum treninga</th>
	    			<th>Status treninga</th>
	    		</tr>
	    			
	    		<tr v-for="p in personalniTreninzi" v-on:click="izaberiTrening(p)" :class="{selected : izabraniTrening == p}" class="parniRedovi" style="height:2.5cm">
	    			<td><img :src="p.training.image" width="70" height="70"/></td>
	    			<td>{{p.training.name}}</td>
	    			<td>{{p.training.duration}}</td>
	    			<td>{{p.training.sportsFacility.name}}</td>
	    			<td>{{p.training.description}}</td>
	    			<td>{{p.dataTimeApplicationS}}</td>
	    			<td>{{p.dataTrainingS}}</td>
	    			<td>{{p.status}}</td>
	    			<td><button v-on:click="Otkazi(p)" class="dugmeObrisi">Otkazi</button></td>
	    		</tr>
	    	</table>	
	    		    	 	
    	</div>		  
    	`,
    methods:{
	izaberiTrening: function(trening) {
    		this.izabraniTrening=trening;
    	},
	Otkazi: function(trening) {
		this.izabraniTrening=trening;
		      axios
                .put('rest/trainer/otkaziTrening', {
					"dataTraining": this.izabraniTrening.dataTrainingS             
                })
                .then(response => {
                    alert("Trening je otkazan!");
                    this.$router.go(0);
                })
                .catch(err => {
                    alert("Trening se ne moze otkazati!");
                })
         }
	 }
	,
    mounted () {
         axios
          .get('rest/trainer/grupniZakazaniTreninziTrenera')
          .then(response => (this.grupniTreninzi = response.data)),
         axios
          .get('rest/trainer/personalniZakazaniTreninziTrenera')
          .then(response => (this.personalniTreninzi = response.data))


    },
});

