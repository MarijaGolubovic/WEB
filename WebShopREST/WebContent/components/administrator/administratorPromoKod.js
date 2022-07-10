Vue.component("administrator-promoKod", {
 	data(){
 	 return {
            promoKodovi:null,
            promoKod: {}
        }
 	
 	},
 	template: ` 
 	 <div>
      <form @submit="dodajPromoKod" method="post">
      <table>
          <tr>
              <th>Oznaka:</th>
              <td><input type="text" v-model="promoKod.oznaka" required></td>
          </tr>	
          <tr>
              <th>Pocetak vazenja:</th>
              <td><input type="date" v-model="promoKod.pocetakVazenja" placeholder="dd-mm-yyyy" required></td>
          </tr>		
          <tr>
              <th>Kraj vazenja:</th>
              <td><input type="date" v-model="promoKod.krajVazenja" placeholder="dd-mm-yyyy" required></td>
          </tr>			
          <tr>
              <th>Broj koristenja:</th>
              <td><input type="number" v-model="promoKod.brojKoristenja" min="1"  max="100" required></td>
          </tr>
          <tr>
              <th>Procenat umanjenja:</th>
              <td><input type="number" v-model="promoKod.procenatUmanjenja" min="1"  max="50" required></td>
          </tr>
          
          <tr>
             <button type="submit">Dodaj promo kod</button>
         </tr>
      </table>	
 </form>

 <div>
        <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Oznaka</th>
	    			<th>Pocetak vazenja</th>
	    			<th>Kraj vazenja</th>
	    			<th>Broj koristenja</th>
                    <th>Procenat umanjenja</th>
	    		</tr>
	    			
	    		<tr v-for="p in promoKodovi">
	    			<td>{{p.oznaka}}</td>
                    <td>{{p.pocetakVazenja|formatVremena}}</td>
                    <td>{{p.krajVazenja|formatVremena}}</td>
                    <td>{{p.brojKoristenja}}</td>
                    <td>{{p.procenatUmanjenja|formatProcenta}}</td>
	    		</tr>
	    </table>
    </div>		    
 


    </div>
	`,
    methods:{
		dodajPromoKod : function (event) {
            event.preventDefault();
             axios
                  .post('rest/login/dodajPromoKod', {
                      "oznaka": this.promoKod.oznaka,
                      "pocetakVazenja": this.promoKod.pocetakVazenja,
                      "krajVazenja": this.promoKod.krajVazenja,
                      "brojKoristenja": this.promoKod.brojKoristenja,
                      "procenatUmanjenja": this.promoKod.procenatUmanjenja
                  })
                  .then(response => {
                      
                      alert("Uspjesno ste dodali promo kod!");
                      window.location.reload();
                      
                  })
                  .catch(err =>{ 
                      alert("Oznaka promo koda vec postoji!");
                      
              })
       },
	}
	
    ,
    mounted () {
        axios
          .get('rest/login/promoKodoviPrikaz')
          .then(response => (this.promoKodovi = response.data))
    },filters: {
		formatVremena: function(value) {
			const date = new Date(value);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
		},
        formatProcenta: function(value) {
        return value+"%";
		},
	  },
 });