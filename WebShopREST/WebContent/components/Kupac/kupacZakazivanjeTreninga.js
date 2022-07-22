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
    	  <br><br>
    	  <div class="forma">
	    	 	<form @submit="PotvrdiZakazivanjeGrupni">
	    		 <table>
                  <tr>
                      <th><label class="labelaStil">Datum:</label></th>
                      <td><input class="inputPolje"  v-model="izabraniGrupni.dataTraining" type="date" required></td>
                      <td>&nbsp</td>
                      <td class="inputPolje">{{izabraniGrupni.name}}</td>
                  </tr>                    
                  </table>
                  <br><br>
                   <button type="submit" class="dugmeForma">Zakaži</button>
                </form>
                </div>
	    	</div>
	    	<br><br>
	    	<h2 style="color:#152a6a"> Grupni treninzi </h2>	    	
	        <table width="100%" border="0" class="tabela">
	    		<tr class="zaglavljeTabele" style="color:lightgrey; background-color:#050a44;">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Cena</th>
	    			<th>Trener</th>
	    			<th>Opis</th>
	    			<th>&nbsp</th>
	    		</tr>
	    			
	    		<tr v-for="p in grupniTreninzi" v-on:click="izaberiGrupni(p)" :class="{selected : izabraniGrupni.name == p.name}" class="parniRedovi" style="height:2.5cm">
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
  <br>
  <div class="forma">
	    	 	<form @submit="PotvrdiZakazivanjePersonalni">
	    		 <table>
                  <tr>
                      <th><label class="labelaStil">Datum:</label></th>
                      <td><input class="inputPolje"  v-model="izabraniPersonalni.dataTraining" type="datetime-local" required step="1800"></td>
                      <td class="inputPolje">{{izabraniPersonalni.name}}</td>
                  </tr>                    
                  </table>
                  <br><br>
                   <button type="submit" class="dugmeForma">Zakaži</button>
                </form>
                </div>
	    	</div>
	    	<br><br>
	    	<h2 style="color:#152a6a"> Personalni treninzi </h2>
	       <table width="100%" border="0" class="tabela">
	    		<tr bgcolor="lightgrey" class="zaglavljeTabele">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Cena</th>
	    			<th>Trener</th>
	    			<th>Opis</th>
	    			<th>&nbsp</th>
	    		</tr>
	    			
	    		<tr v-for="p in personalniTreninzi" v-on:click="izaberiPersonalni(p)" :class="{selected : izabraniPersonalni.name == p.name}" class="parniRedovi" style="height:2.5cm">
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
	    	 <div class="forma">
	    	 	<form @submit="PotvrdiZakazivanjeOstalo">
	    		 <table>
                  <tr>
                      <th><label class="labelaStil">Datum:</label></th>
                      <td><input class="inputPolje" v-model="izabraniOstalo.dataTraining" type="datetime-local" required step="1800"></td>
                      <td class="inputPolje">{{izabraniOstalo.name}}</td>
                  </tr>                    
                  </table>
                  <br><br>
                   <div class="centriranjeDugmeta"><button type="submit" class="dugmeForma">Zakaži</button>
                </form>
                </div>
	    	</div>
	    	<br><br>
	    	<h2 style="color:#152a6a"> Individualne posete </h2>
	       <table width="100%" border="0" class="tabela">
	    		<tr class="zaglavljeTabele" style="color:lightgrey; background-color:#050a44;">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Cena</th>
	    			<th>Trener</th>
	    			<th>Opis</th>
	    			<th>&nbsp</th>
	    		</tr>
	    			
	    		<tr v-for="p in ostaloTreninzi" v-on:click="izaberiOstalo(p)" :class="{selected : izabraniOstalo.name == p.name}" class="parniRedovi" style="height:2.5cm">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.price}}</td>
	    			<td>{{p.trainer.firstName}} {{p.trainer.lastName}}</td>
	    			<td>{{p.description}}</td>
	    			<td><button class="dugmeObrisi" v-on:click="zakaziOstalo" >Zakazi trening</button></td>
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