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
 	 <br></br>
 	 <div class="forma">
      <form @submit="dodajNoviKomentar" method="post">
      <table>
          <tr>
              <th  class="poravnanjeLabeleForma"><label class="labelaStil">Tekst komentara:</label></th>
              <td>
              <textarea style="background-color:#edede8;border-radius:5%; border-width:0px;" rows="4" cols="50" v-model="noviKomentar.tekstKomentara" required></textarea>
              </td>
          </tr>	
          <tr>&nbsp</tr>
          <tr>
              <th  class="poravnanjeLabeleForma"><label class="labelaStil">Komentarisani objekat:</label></th>
              <td>
	 			<select class="padajuciMeni" name="objekat" v-model="noviKomentar.objekat" required>
	 				<option v-for="o in facilities" :value=o.name>
	 					{{o.name}}
	 				</option>
	 			</select>
	 					
	 			</td>
          </tr>
           <tr>&nbsp</tr>		
          <tr>
              <th  class="poravnanjeLabeleForma"><label class="labelStil">Ocjena:</label></th>
              <td><input class="inputPolje" type="number" v-model="noviKomentar.ocjena"  min="0" max="10" required></td>
          </tr>
          <tr>&nbsp</tr>
          <tr>&nbsp</tr>
          <tr>
          <td>&nbsp</td>
            <td> <button type="submit" class="dugmeForma" style="font-size:15px; width:3.5cm">Sacuvaj komentar</button></td>
         </tr>	
          <tr>&nbsp</tr>		
      </table>	
 </form>
  </div>  
<br><br>
     <div>
        <table width="100%" border="0" class="tabela">
	    		<tr  class="zaglavljeTabele" style="color:lightgrey; background-color:#050a44;">
	    			<th>Korisnik</th>
	    			<th>Objekat</th>
	    			<th>Tekst komentara</th>
	    			<th>Ocjena</th>
	    		</tr>
	    			
	    		<tr v-for="p in komentari" v-if="p.logickiObrisan ===true" class="parniRedovi" style="height:0.8cm">
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
             .get('rest/kupac/objekti')
             .then(response => (this.facilities = response.data)),
        axios
             .get('rest/login/prikaziKomentare')
             .then(response => (this.komentari = response.data))
            
     },
 });