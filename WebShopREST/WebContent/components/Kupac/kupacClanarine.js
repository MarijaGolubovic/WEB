 Vue.component("app-clanarineKupac", {
 	data(){
 	 return {
	      clanarine: [],
	      trenutnaClanarina:{},
	      izabranaClanarina:{},
	      dodavanjeClanarine: false,
	      pregledClanarine: false,

        }
 	
 	},
	    template: ` 
    	<div>
	    	<h2 style="color:#152a6a;"> Trenutna Clanarina </h2>	    	
	        <table width="100%" border="0" class="tabela">
	    		<tr class="zaglavljeTabele" style="color:lightgrey; background-color:#050a44;">
	    			<th>Tip clanarine</th>
	    			<th>Datum aktivacije</th>   			
	    			<th>Datum isteka</th>
	    			<th>Cena</th>
	    			<th>Status</th>
	    			<th>Ukupan broj termina</th>
	    			<th>Preostali termini</th>
	    		</tr>
	    			
	    		<tr class="parniRedovi" style="height:0.8cm">
	    			<td>{{trenutnaClanarina.duesType}}</td>
	    			<td>{{trenutnaClanarina.paymentDate}}</td>
	    			<td>{{trenutnaClanarina.dateValid}}</td>
	    			<td>{{trenutnaClanarina.price}}</td>
	    			<td v-if="trenutnaClanarina.status">Aktivna</td>
	    			<td v-if="!trenutnaClanarina.status">Nije Aktivna</td>
	    			<td>{{trenutnaClanarina.numberOfSesions}}</td>
	    			<td>{{trenutnaClanarina.numberOfAvaliableSesions}}</td>	    			
	    		</tr>
	    	</table>
	    	<br><br>
	    	<button v-on:click="pokaziDodavanje" class="dugmeObrisi">Dodaj novu clanarinu</button>
	    	
	    	
	    <div v-show="pregledClanarine">
	    <h3 style="#152a6a;"> Pregled Clanarine </h3>	
	    <button v-on:click="zatvoriDetaljnijiPrikaz" class="dugmeZatvori">x</button>
	    <br>
	    <div class="forma">
	    	 	<form @submit="PotvrdiDodavanjeClanarine">
	    		 <table style="margin-right: auto; margin-left: auto;">
	    		 <tr>&nbsp</tr>
                  <tr>
                      <th  class="poravnanjeLabeleForma"><label class="labelaStil">Tip clanarine:</label></th>
                      <td><input disabled  class="inputPolje" v-model="izabranaClanarina.duesType" type="text"></td>
                  </tr>
                  <tr>&nbsp</>
                  <tr>
                      <th  class="poravnanjeLabeleForma"><label class="labelaStil">Cena:</label></th>
                      <td><input class="inputPolje" disabled v-model="izabranaClanarina.price" type="number" min="1" step="any" ></td>
                  </tr>
                  <tr>&nbsp</tr>
                   <tr>
                      <th  class="poravnanjeLabeleForma"><label class="labelaStil">Ukupan broj termina:</label></th>
                      <td><input class="inputPolje" disabled v-model="izabranaClanarina.numberOfSesions" type="number" min="0" step="any" ></td>
                  </tr>
                  <tr>&nbsp</tr>
                   <tr>
                      <th  class="poravnanjeLabeleForma"><label class="labelaStil">Unesite PROMO KOD:</label></th>
                      <td><input class="inputPolje" v-model="izabranaClanarina.promoKod" type="text"></td>
                  </tr>                  
                  <tr>&nbsp</tr>
                  <tr>
                  	<td>&nbsp</td>
                  	<td> <button class="dugmeForma" type="submit">Potvrdi</button></td>
                  </tr>
                  <tr>&nbsp</tr>
                  <tr>&nbsp</tr>
                  </table>
                   
                </form>
                </div>
	    	</div>
	    	

  <div v-show="dodavanjeClanarine">	    	    	
	    	<h3 style="color:#152a6a"> Dostupne clanarine </h3>
	       <table width="100%" border="0" class="tabela">
	    		<tr bgcolor="lightgrey" class="zaglavljeTabele" >
	    			<th>Tip clanarine</th>
	    			<th>Cena</th>
	    			<th>Ukupan broj termina</th>
	    			<th>&nbsp</th>
	    		</tr>
	    			
	    		<tr v-for="p in clanarine" v-on:click="izaberiClanarinu(p)" :class="{selected : izabranaClanarina == p}" class="parniRedovi">
	    			<td>{{p.duesType}}</td>
	    			<td>{{p.price}}</td>
	    			<td>{{p.numberOfSesions}}</td>
	    			<td><div class="centriranjeDugmeta"><button class="dugmeObrisi" v-on:click="IzborClanarine(p)">Izaberi</button></div></td>
	    		</tr>
	    	</table> 
	    	</div>	
    	</div>		  
    	`,
    methods:{
	pokaziDodavanje:function(){
		this.dodavanjeClanarine=true;
	},
	izaberiClanarinu: function(clanarina){
		this.izabranaClanarina=clanarina;
	},
	zatvoriDetaljnijiPrikaz: function(){
		this.dodavanjeClanarine=true;
		this.pregledClanarine=false;
	},
	PotvrdiDodavanjeClanarine: function(){
		axios
                .post('rest/kupac/izborClanarineNove', {
                    "duesType": this.izabranaClanarina.duesType,
                    "price": this.izabranaClanarina.price,   
                     "numberOfSesions": this.izabranaClanarina.numberOfSesions,    
                     "promoKod": this.izabranaClanarina.promoKod           
                })
                .then(response => {
                    alert("Nova clanarina je dodata!");
                    this.dodavanjeClanarine=false;
                    this.pregledClanarine=false;
                    this.$router.go(0);
                })
                .catch(err => {
                    alert("Clanarina ne moze da se doda!");
                })
	},
	IzborClanarine:function(clanarina) {
		this.izabranaClanarina=clanarina;
		this.dodavanjeClanarine=false;
		this.pregledClanarine=true;
            
    		
    	},
    }
	,
    mounted () {
         axios
          .get('rest/kupac/dostupneClanarine')
          .then(response => (this.clanarine = response.data)),
          axios
          .get('rest/kupac/trenutnaClanarina')
          .then(response => (this.trenutnaClanarina = response.data))

    },
});
