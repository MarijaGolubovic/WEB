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
    	

	    	<h2 style="color:#152a6a"> Grupni treninzi </h2>	    	
	        <table width="100%" border="0" class="tabela">
	    		<tr bgcolor="lightgrey" class="zaglavljeTabele"  style="color:lightgrey; background-color:#050a44;">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Objekat</th>
	    			<th>Opis</th>
	    		</tr>
	    			
	    		<tr v-for="p in grupniTreninzi" class="parniRedovi" style="height:2.5cm">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.sportsFacility.name}}</td>
	    			<td>{{p.description}}</td>
	    		</tr>
	    	</table>

	    	

	    	<h2 style="color:#152a6a"> Personalni treninzi </h2>
	        <table width="100%" border="0" class="tabela" >
	    		<tr bgcolor="lightgrey" class="zaglavljeTabele">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Objekat</th>
	    			<th>Opis</th>
	    		</tr>
	    			
	    		<tr v-for="p in personalniTreninzi" class="parniRedovi" style="height:2.5cm">
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

