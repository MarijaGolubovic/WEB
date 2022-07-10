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
	    	<p> Grupni treninzi </p>	    	
	        <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Opis</th>	    			
	    			<th>Trener</th>
	    			<th>Kupac</th>
	    			<th>Datum prijave</th>
	    			<th>Datum treninga</th>
	    			<th>Status treninga</th>
	    		</tr>
	    			
	    		<tr v-for="p in grupniTreninzi">
	    			<td><img :src="p.training.image" width="70" height="70"/></td>
	    			<td>{{p.training.name}}</td>
	    			<td>{{p.training.duration}}</td>
	    			<td>{{p.training.description}}</td>
	    			<td>{{p.training.trainer.firstName}} {{p.training.trainer.lastName}}</td>
	    			<td>{{p.customer.firstName}} {{p.customer.lastName}}</td>
	    			<td>{{p.dataTimeApplicationS}}</td>
	    			<td>{{p.dataTrainingS}}</td>
	    			<td>{{p.status}}</td>
	    		</tr>
	    	</table>

	    	

	    	<p> Personalni treninzi </p>
	        <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Opis</th>	    			
	    			<th>Trener</th>
	    			<th>Kupac</th>
	    			<th>Datum prijave</th>
	    			<th>Datum treninga</th>
	    			<th>Status treninga</th>
	    		</tr>
	    			
	    		<tr v-for="p in personalniTreninzi">
	    			<td><img :src="p.training.image" width="70" height="70"/></td>
	    			<td>{{p.training.name}}</td>
	    			<td>{{p.training.duration}}</td>
	    			<td>{{p.training.description}}</td>
	    			<td>{{p.training.trainer.firstName}} {{p.training.trainer.lastName}}</td>
	    			<td>{{p.customer.firstName}} {{p.customer.lastName}}</td>
	    			<td>{{p.dataTimeApplicationS}}</td>
	    			<td>{{p.dataTrainingS}}</td>
	    			<td>{{p.status}}</td>
	    		</tr>
	    	</table>	
	    	
	    	<p> Individualne posete </p>
	        <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Opis</th>	    			
	    			<th>Trener</th>
	    			<th>Kupac</th>
	    			<th>Datum prijave</th>
	    			<th>Datum treninga</th>
	    			<th>Status treninga</th>
	    		</tr>
	    			
	    		<tr v-for="p in ostaloTreninzi">
	    			<td><img :src="p.training.image" width="70" height="70"/></td>
	    			<td>{{p.training.name}}</td>
	    			<td>{{p.training.duration}}</td>
	    			<td>{{p.training.description}}</td>
	    			<td>{{p.training.trainer.firstName}} {{p.training.trainer.lastName}}</td>
	    			<td>{{p.customer.firstName}} {{p.customer.lastName}}</td>
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
          .get('rest/menager/grupniZakazaniTreninzi')
          .then(response => (this.grupniTreninzi = response.data)),
         axios
          .get('rest/menager/personalniZakazaniTreninzi')
          .then(response => (this.personalniTreninzi = response.data)),
          axios
          .get('rest/menager/ostaliZakazaniTreninzi')
          .then(response => (this.ostaloTreninzi = response.data))

    },
});

