 Vue.component("app-komentariKupac", {
 	data(){
 	 return {
            facilities:null,
            komentari:null,
            noviKomentar: {}
        }
 	
 	},
 	template: ` 
 	 <div>
      <form @submit="dodajNoviKomentar" method="post">
      <table>
          <tr>
              <th>Tekst komentara:</th>
              <td>
              <textarea  rows="4" cols="50" v-model="noviKomentar.tekstKomentara" required></textarea>
              </td>
          </tr>	
          <tr>
              <th>Komentarisani objekat:</th>
              <td>
	 			<select name="objekat" v-model="noviKomentar.objekat" required>
	 				<option v-for="o in facilities" :value=o.name>
	 					{{o.name}}
	 				</option>
	 			</select>
	 					
	 			</td>
          </tr>		
          <tr>
              <th>Ocjena:</th>
              <td><input type="number" v-model="noviKomentar.ocjena"  min="0" max="10" required></td>
          </tr>	
          <tr>
             <button type="submit">Sacuvaj komentar</button>
         </tr>		
      </table>	
 </form>
    

     <div>
        <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Korisnik</th>
	    			<th>Objekat</th>
	    			<th>Tekst komentara</th>
	    			<th>Ocjena</th>
	    		</tr>
	    			
	    		<tr v-for="p in komentari" v-if="p.logickiObrisan ===true">
	    			<td>{{p.username}}</td>
					<td>{{p.sportsFacility}}</td>
					<td>{{p.comment}}</td>
					<td>{{p.grade}}</td>
	    		</tr>
	    </table>
    </div>		  

    </div>
	`,
	 methods: {
        dodajNoviKomentar : function (event) {
	 	 	event.preventDefault();
	 	 	 axios
                    .post('rest/login/dodajKomentar', {
                        "tekstKomentara": this.noviKomentar.tekstKomentara,
                        "objekat": this.noviKomentar.objekat,
                        "ocjena": this.noviKomentar.ocjena
                    })
                    .then(response => {
                        
                        alert("Uspjesno ste  ostavili komentar!");
                        window.location.reload();
                        
                    })
                    .catch(err =>{ 
                    	alert("Niste usojeli ostaviti komentar!");
                    	
                })
	 
	 	}
	
	 },
     mounted() {
        axios
             .get('rest/facilities/')
             .then(response => (this.facilities = response.data)),
        axios
             .get('rest/login/prikaziKomentare')
             .then(response => (this.komentari = response.data))
            
     },
 });