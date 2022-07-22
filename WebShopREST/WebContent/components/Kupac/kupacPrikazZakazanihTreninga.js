 Vue.component("app-ZakazaniTreninzi", {
 	data(){
 	 return {
	      grupniTreninzi: [],
	      personalniTreninzi: [],
	      ostaloTreninzi: [],
        }
 	
 	},
	    template: ` 
    	<div>
    		<br>
	    	<h2 style="color:#152a6a"> Grupni treninzi </h2>	    	
	        <table width="100%" border="0" class="tabela">
	    		<tr class="zaglavljeTabele" style="color:lightgrey; background-color:#050a44;">
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
	    			
	    		<tr v-for="p in personalniTreninzi" class="parniRedovi" style="height:2.5cm">
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
	    	<h2 style="color:#152a6a"> Individualne posete </h2>
	        <table width="100%" border="0" class="tabela">
	    		<tr class="zaglavljeTabele" style="color:lightgrey; background-color:#050a44;">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Objekat</th>
	    			<th>Opis</th>
	    			<th>Datum prijave</th>
	    			<th>Datum treninga</th>
	    			<th>Status treninga</th>
	    		</tr>
	    			
	    		<tr v-for="p in ostaloTreninzi" class="parniRedovi" style="height:2.5cm">
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
    	</div>		  
    	`,
    methods:{
	 }
	,
    mounted () {
         axios
          .get('rest/kupac/grupniTreninziKupac')
          .then(response => (this.grupniTreninzi = response.data)),
         axios
          .get('rest/kupac/personalniTreninziKupac')
          .then(response => (this.personalniTreninzi = response.data)),
          axios
          .get('rest/kupac/ostaliTreninziKupac')
          .then(response => (this.ostaloTreninzi = response.data))

    },
});

