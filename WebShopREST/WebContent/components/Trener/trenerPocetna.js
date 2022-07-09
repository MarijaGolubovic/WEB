 Vue.component("app-sviTreninzi", {
 	data(){
 	 return {
	      grupniTreninzi: [],
	      personalniTreninzi: [],
	      ostaloTreninzi: [],
        }
 	
 	},
	    template: ` 
    	<div>
    	

	    	<p> Grupni treninzi </p>	    	
	        <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Objekat</th>
	    			<th>Opis</th>
	    		</tr>
	    			
	    		<tr v-for="p in grupniTreninzi">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.sportsFacility.name}}</td>
	    			<td>{{p.description}}</td>
	    		</tr>
	    	</table>

	    	

	    	<p> Personalni treninzi </p>
	        <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Objekat</th>
	    			<th>Opis</th>
	    		</tr>
	    			
	    		<tr v-for="p in personalniTreninzi">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.sportsFacility.name}}</td>
	    			<td>{{p.description}}</td>
	    		</tr>
	    	</table>	    	
    	</div>		  
    	`,
    methods:{
	 }
	,
    mounted () {
         axios
          .get('rest/trainer/grupniTreninziTrenera')
          .then(response => (this.grupniTreninzi = response.data)),
         axios
          .get('rest/trainer/personalniTreninziTrenera')
          .then(response => (this.personalniTreninzi = response.data))

    },
});

