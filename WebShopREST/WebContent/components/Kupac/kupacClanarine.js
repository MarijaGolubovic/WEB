 Vue.component("app-clanarineKupac", {
 	data(){
 	 return {
	      clanarine: [],
	      trenutnaClanarina:{},
	      izabranaClanarina:{},
	      dodavanjeClanarine: false

        }
 	
 	},
	    template: ` 
    	<div>
	    	<p> Trenutna Clanarina </p>	    	
	        <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Tip clanarine</th>
	    			<th>Datum aktivacije</th>   			
	    			<th>Datum isteka</th>
	    			<th>Cena</th>
	    			<th>Status</th>
	    			<th>Ukupan broj termina</th>
	    			<th>Preostali termini</th>
	    		</tr>
	    			
	    		<tr>
	    			<td>{{trenutnaClanarina.duesType}}</td>
	    			<td>{{trenutnaClanarina.paymentDate}}</td>
	    			<td>{{trenutnaClanarina.dateValid}}</td>
	    			<td>{{trenutnaClanarina.price}}</td>
	    			<td>{{trenutnaClanarina.status}}</td>
	    			<td>{{trenutnaClanarina.numberOfSesions}}</td>
	    			<td>{{trenutnaClanarina.numberOfAvaliableSesions}}</td>	    			
	    		</tr>
	    	</table>
	    	
	    	<td><button v-on:click="pokaziDodavanje">Dodaj novu clanarinu</button></td>

  <div v-show="dodavanjeClanarine">
	    	    	
	    	<p> Dostupne clanarine </p>
	       <table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Tip clanarine</th>
	    			<th>Cena</th>
	    			<th>Ukupan broj termina</th>
	    		</tr>
	    			
	    		<tr v-for="p in clanarine" v-on:click="izaberiClanarinu(p)" :class="{selected : izabranaClanarina == p}">
	    			<td>{{p.duesType}}</td>
	    			<td>{{p.price}}</td>
	    			<td>{{p.numberOfSesions}}</td>
	    			<td><button v-on:click="IzborClanarine(p)">Izaberi</button></td>
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
	IzborClanarine:function(clanarina) {
		this.izabranaClanarina=clanarina;
            axios
                .post('rest/kupac/izborClanarineNove', {
                    "duesType": this.izabranaClanarina.duesType,
                    "price": this.izabranaClanarina.price,   
                     "numberOfSesions": this.izabranaClanarina.numberOfSesions,              
                })
                .then(response => {
                    alert("Nova clanarina je dodata!");
                    this.dodavanjeClanarine=false;
                    this.$router.go(0);
                })
                .catch(err => {
                    alert("Clanarina ne moze da se doda!");
                })
    		
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
