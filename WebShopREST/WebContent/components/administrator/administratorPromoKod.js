Vue.component("administrator-promoKod", {
 	data(){
 	 return {
            promoKodovi:null,
            promoKod: {}
        }
 	
 	},
 	template: ` 
 	 <div>
 	 <br>
	 	 <div>
	 	 <div class="forma">
		      <form @submit="dodajPromoKod" method="post">
		      <table style="margin-right: auto; margin-left: auto;">
		      <tr>&nbsp</tr>
		          <tr>
		              <th class="poravnanjeLabeleForma"><label class="labelaStil">Oznaka:</label></th>
		              <td><input class="inputPolje" type="text" v-model="promoKod.oznaka" required></td>
		          </tr>	
		          <tr>&nbsp</tr>
		          <tr>
		              <th class="poravnanjeLabeleForma"><label class="labelaStil">Pocetak vazenja:</label></th>
		              <td><input class="inputPolje" type="date" v-model="promoKod.pocetakVazenja" placeholder="dd-mm-yyyy" required></td>
		          </tr>		
		          <tr>&nbsp</tr>
		          <tr>
		              <th class="poravnanjeLabeleForma"><label class="labelaStil">Kraj vazenja:</label></th>
		              <td><input class="inputPolje" type="date" v-model="promoKod.krajVazenja" placeholder="dd-mm-yyyy" required></td>
		          </tr>	
		          <tr>&nbsp</tr>		
		          <tr>
		              <th class="poravnanjeLabeleForma"><label class="labelaStil">Broj koristenja:</label></th>
		              <td><input class="inputPolje" type="number" v-model="promoKod.brojKoristenja" min="1"  max="100" required></td>
		          </tr>
		          <tr>&nbsp</tr>
		          <tr>
		              <th class="poravnanjeLabeleForma"><label class="labelaStil">Procenat umanjenja:</label></th>
		              <td><input class="inputPolje" type="number" v-model="promoKod.procenatUmanjenja" min="1"  max="50" required></td>
		          </tr>
		          	<tr>&nbsp</tr>
		          	<tr>&nbsp</tr>
		          <tr>
		             <button class="dugmeForma" style=" font-size:15px; width:4cm" type="submit">Dodaj promo kod</button>
		         </tr>
		         <tr>&nbsp</tr>
		         <tr>&nbsp</tr>
		      </table>	
		 </form>
	</div>
 <div>
 <br><br>
 <div>
        <table width="100%" border="0" class="tabela">
	    		<tr bgcolor="lightgrey" class="zaglavljeTabele">
	    			<th>Oznaka</th>
	    			<th>Pocetak vazenja</th>
	    			<th>Kraj vazenja</th>
	    			<th>Broj koristenja</th>
                    <th>Procenat umanjenja</th>
	    		</tr>
	    			
	    		<tr v-for="p in promoKodovi" class="parniRedovi" style="height:0.8cm">
	    			<td>{{p.oznaka}}</td>
                    <td>{{p.pocetakVazenja|formatVremena}}</td>
                    <td>{{p.krajVazenja|formatVremena}}</td>
                    <td>{{p.brojKoristenja}}</td>
                    <td>{{p.procenatUmanjenja|formatProcenta}}</td>
	    		</tr>
	    </table>
</div>
	    </div>
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