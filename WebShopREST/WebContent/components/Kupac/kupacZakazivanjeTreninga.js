 Vue.component("app-zakazivanjeKupac", {
 	data(){
 	 return {
	      grupniTreninzi: [],
	      personalniTreninzi: [],
	      izabraniGrupni:{},
	      izabraniPersonalni:{},
	      personalniZakazivanje: false

        }
 	
 	},
	    template: ` 
    	<div>
	    	<p> Grupni treninzi </p>	    	
	        <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Slika</th>
	    			<th>Naziv</th>   			
	    			<th>Cena</th>
	    			<th>Objekat</th>
	    			<th>Opis</th>
	    			<th>Trener</th>
	    			<th>Termin</th>
	    			<th>Trajanje</th>
	    			<th>Zakaži</th>
	    		</tr>
	    			
	    		<tr v-for="p in grupniTreninzi" v-on:click="izaberiGrupni(p)" :class="{selected : izabraniGrupni.name == p.name}">
	    			<td><img :src="p.training.image" width="70" height="70"/></td>
	    			<td>{{p.training.name}}</td>
	    			<td>{{p.training.price}}</td>
	    			<td>{{p.training.sportsFacility.name}}</td>
	    			<td>{{p.training.description}}</td>
	    			<td>{{p.training.trainer.firstName}} {{p.training.trainer.lastName}} </td>
	    			<td>{{p.dataTraining}}</td>
					<td>{{p.training.duration}}</td>
	    			<td><button v-on:click="zakaziGrupni">Zakaži</button></td>
	    		</tr>
	    	</table>

  <div v-show="personalniZakazivanje">
	    	 	<form @submit="PotvrdiZakazivanjePersonalni">
	    		 <table>
                  <tr>
                      <th><label>Datum:</label></th>
                      <td><input  v-model="izabraniPersonalni.dataTraining" type="datetime-local" required step="1800"></td>
                      <td>{{izabraniPersonalni.name}}</td>
                  </tr>                    
                  </table>
                   <button type="submit">Zakaži</button>
                </form>
	    	</div>
	    	
	    	<p> Personalni treninzi </p>
	       <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Cena</th>
	    			<th>Trener</th>
	    			<th>Opis</th>
	    		</tr>
	    			
	    		<tr v-for="p in personalniTreninzi" v-on:click="izaberiPersonalni(p)" :class="{selected : izabraniPersonalni.name == p.name}">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.price}}</td>
	    			<td>{{p.trainer.firstName}} {{p.trainer.lastName}}</td>
	    			<td>{{p.description}}</td>
	    			<td><button v-on:click="zakaziPersonalni">Zakazi trening</button></td>
	    		</tr>
	    	</table> 	
    	</div>		  
    	`,
    methods:{
	PotvrdiZakazivanjePersonalni: function(event){
		event.preventDefault();
		      axios
                .post('rest/kupac/zakaziPersonalni', {
					"training": this.izabraniPersonalni.name,
                    "dataTraining": this.izabraniPersonalni.dataTraining,               
                })
                .then(response => {
                    alert("Trening je zakazan!");
                })
                .catch(err => {
                    alert("Trening se ne moze zakazati!");
                })
		
	},
	zakaziGrupni:function(event) {
		event.preventDefault();
            axios
                .post('rest/kupac/zakaziGrupni', {
                    "dataTraining": this.izabraniGrupni.dataTraining,
                    "training": this.izabraniGrupni.training                
                })
                .then(response => {
                    alert("Trening je zakazan!");
                })
                .catch(err => {
                    alert("Trening se ne moze zakazati!");
                })
    		
    	},
    zakaziPersonalni: function(){
	this.personalniZakazivanje=true;
	},
	izaberiGrupni: function(grupni) {
    		this.izabraniGrupni = grupni;
    	},
   izaberiPersonalni: function(personalni) {
    		this.izabraniPersonalni = personalni;
    		this.personalniZakazivanje=true;
    	},
	 }
	,
    mounted () {
         axios
          .get('rest/kupac/grupniTreninzi')
          .then(response => (this.grupniTreninzi = response.data)),
         axios
          .get('rest/kupac/personalniTreninzi')
          .then(response => (this.personalniTreninzi = response.data))

    },
});