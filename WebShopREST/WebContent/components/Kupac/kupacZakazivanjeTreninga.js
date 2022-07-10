 Vue.component("app-zakazivanjeKupac", {
 	data(){
 	 return {
	      grupniTreninzi: [],
	      personalniTreninzi: [],
	      ostaloTreninzi: [],
	      izabraniGrupni:{},
	      izabraniPersonalni:{},
	      izabraniOstalo:{},
	      personalniZakazivanje: false,
	      grupniZakazivanje: false,
	      ostaloZakazivanje: false

        }
 	
 	},
	    template: ` 
    	<div>
    	
    	  <div v-show="grupniZakazivanje">
	    	 	<form @submit="PotvrdiZakazivanjeGrupni">
	    		 <table>
                  <tr>
                      <th><label>Datum:</label></th>
                      <td><input  v-model="izabraniGrupni.dataTraining" type="date" required></td>
                      <td>{{izabraniGrupni.name}}</td>
                  </tr>                    
                  </table>
                   <button type="submit">Zakaži</button>
                </form>
	    	</div>
	    	<p> Grupni treninzi </p>	    	
	        <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Cena</th>
	    			<th>Trener</th>
	    			<th>Opis</th>
	    		</tr>
	    			
	    		<tr v-for="p in grupniTreninzi" v-on:click="izaberiGrupni(p)" :class="{selected : izabraniGrupni.name == p.name}">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.price}}</td>
	    			<td>{{p.trainer.firstName}} {{p.trainer.lastName}}</td>
	    			<td>{{p.description}}</td>
	    			<td><button v-on:click="zakaziGrupni">Zakazi trening</button></td>
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
	    	
	    	 <div v-show="ostaloZakazivanje">
	    	 	<form @submit="PotvrdiZakazivanjeOstalo">
	    		 <table>
                  <tr>
                      <th><label>Datum:</label></th>
                      <td><input  v-model="izabraniOstalo.dataTraining" type="datetime-local" required step="1800"></td>
                      <td>{{izabraniOstalo.name}}</td>
                  </tr>                    
                  </table>
                   <button type="submit">Zakaži</button>
                </form>
	    	</div>
	    	
	    	<p> Individualne posete </p>
	       <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Cena</th>
	    			<th>Trener</th>
	    			<th>Opis</th>
	    		</tr>
	    			
	    		<tr v-for="p in ostaloTreninzi" v-on:click="izaberiOstalo(p)" :class="{selected : izabraniOstalo.name == p.name}">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.price}}</td>
	    			<td>{{p.trainer.firstName}} {{p.trainer.lastName}}</td>
	    			<td>{{p.description}}</td>
	    			<td><button v-on:click="zakaziOstalo">Zakazi trening</button></td>
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
                    this.personalniZakazivanje=false;
                })
                .catch(err => {
                    alert("Trening se ne moze zakazati!");
                })
		
	},
	PotvrdiZakazivanjeGrupni:function(event) {
		event.preventDefault();
            axios
                .post('rest/kupac/zakaziGrupni', {
                    "dataTraining": this.izabraniGrupni.dataTraining,
                    "training": this.izabraniGrupni.name                
                })
                .then(response => {
                    alert("Trening je zakazan!");
                    this.grupniZakazivanje = false;
                })
                .catch(err => {
                    alert("Trening se ne moze zakazati!");
                })
    		
    	},
    	
    	PotvrdiZakazivanjeOstalo :function(event) {
		event.preventDefault();
            axios
                .post('rest/kupac/zakaziOstalo', {
                    "dataTraining": this.izabraniOstalo.dataTraining,
                    "training": this.izabraniOstalo.name                
                })
                .then(response => {
                    alert("Trening je zakazan!");
                    this.ostaloZakazivanje=false;
                })
                .catch(err => {
                    alert("Trening se ne moze zakazati!");
                })
    		
    	},
    zakaziPersonalni: function(){
	this.personalniZakazivanje=true;
	},
	zakaziGrupni: function() {
    		this.grupniZakazivanje = true;
    	},
    zakaziOstalo: function() {
    		this.ostaloZakazivanje = true;
    	},
   izaberiPersonalni: function(personalni) {
    		this.izabraniPersonalni = personalni;
    		this.personalniZakazivanje=true;
    	},
   izaberiGrupni: function(grupni) {
    		this.izabraniGrupni = grupni;
    		this.grupniZakazivanje=true;
    	},
   izaberiOstalo: function(ostalo) {
    		this.izabraniOstalo = ostalo;
    		this.ostaloZakazivanje=true;
    	},
	 }
	,
    mounted () {
         axios
          .get('rest/kupac/grupniTreninzi')
          .then(response => (this.grupniTreninzi = response.data)),
         axios
          .get('rest/kupac/personalniTreninzi')
          .then(response => (this.personalniTreninzi = response.data)),
         axios
          .get('rest/kupac/ostaloTreninzi')
          .then(response => (this.ostaloTreninzi = response.data))

    },
});