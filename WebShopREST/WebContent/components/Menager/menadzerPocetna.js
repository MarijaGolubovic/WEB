 Vue.component("app-pocetnaObjekat", {
 	data(){
 	 return {
	      facility: {},
	      grupniTreninzi: [],
	      personalniTreninzi: [],
	      ostaloTreninzi: [],
	      izabraniGrupni: {},
	      grupniDodavanje: false,
	      grupniTrening:{},
	      treneri: [],
	      slikaVis: false,

        }
 	
 	},
	    template: ` 
    	<div>
    	
    	<div>
	    	<table width="100%" border="0">
	    	<tr bgcolor="lightgrey">
	    	    <th>Naziv</th>
	    		<th>Adresa</th>
	    		<th>Prosečna ocena</th>
	    	</tr>
	    	<tr>
	    	<td>{{facility.name}}</td>
	    	<td>{{facility.locationS}}</td>
	    	<td>{{facility.averageGrade}}</td>
	    	</tr>
	    	</table>    	
	    </div>
	    
	    
	    	<p> Grupni treninzi </p>
	    	<button v-on:click="dodajGrupni">Dodaj sadržaj</button>
	    <div v-show="grupniDodavanje">
	    	 <img id="slikaID" src="" alt="Slika treninga" width="200" height="100" v-show="this.slikaVis">
	    	<form @submit="dodajGrupniTrening" method="post">
	    		 <table>
                  <tr>
                      <th><label>Naziv:</label></th>
                      <td><input   v-model="grupniTrening.name" type="text" required></td>
                  </tr>
                  <tr>
                      <th><label>Trajanje:</label></th>
                      <td><input  v-model="grupniTrening.duration" type="number" min="1" step="any" ></td>
                  </tr>
                  <tr>
                      <th><label>Trener:</label></th>
	 						<td>
	 							<select name="trener" v-model="grupniTrening.trainer" required>
	 								 <option v-for="m in treneri" :value=m>
	 								 	{{m.firstName}} {{m.lastName}}
	 								 </option>
	 							</select>
	 						</td>
                </tr>
                  <tr>
                      <th><label>Opis:</label></th>
                      <td><input  v-model="grupniTrening.description" type="text" /></td>
                  </tr>
                  <tr>
	 				<th>Slika:</th>
	 				<td>
	 				<input type="file" onchange="encodeImageFileAsURL(this)" v-on:click="dodajSliku" required>
	 				</td>
	 			</tr>
                  </table>
                   <button class="potvrdiDugme" type="submit">Potvrdi</button>
                </form>
	    	</div>
	    	
	        <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Slika</th>
	    			<th>Naziv</th>
	    			<th>Trajanje</th>
	    			<th>Trener</th>
	    			<th>Opis</th>
	    		</tr>
	    			
	    		<tr v-for="p in grupniTreninzi">
	    			<td><img :src="p.image" width="70" height="70"/></td>
	    			<td>{{p.name}}</td>
	    			<td>{{p.duration}}</td>
	    			<td>{{p.trainer.firstName}} {{p.trainer.lastName}}</td>
	    			<td>{{p.description}}</td>
	    		</tr>
	    	</table>
	    	
    	</div>		  
    	`,
    methods:{
	 dodajGrupniTrening: function (event) {
	 	 	event.preventDefault();
	 	 	this.grupniTrening.image = document.getElementById("slikaID").src;
            axios
                .post('rest/menager/dodajTrening', {
                    "name": this.grupniTrening.name,
                    "duration": this.grupniTrening.duration,
                    "trainer": this.grupniTrening.trainer,
                    "description": this.grupniTrening.description,
                    "image": this.grupniTrening.image
                    
                })
                .then(response => {
                    alert("Trening je dodat!");
                    this.grupniDodavanje=false;
                })
                .catch(err => {
                    alert("Trening postoji!");
                })
        },
        dodajSliku: function(){
	 		this.slikaVis = true;
	 	},
	 	dodajGrupni: function () {
		this.grupniDodavanje=true;
		},
	
		}
	
    ,
    mounted () {
        axios
          .get('rest/menager/objekatMenadzera')
          .then(response => (this.facility = response.data)),
        axios
          .get('rest/login/treneri')
          .then(response => (this.treneri = response.data)),
          axios
          .get('rest/menager/grupniTreninziMenadzera')
          .then(response => (this.grupniTreninzi = response.data))
    },
});
function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        document.getElementById('slikaID')
            .setAttribute(
                'src', reader.result
            );
    }
    reader.readAsDataURL(file);
}
