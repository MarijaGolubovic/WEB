Vue.component("app-menadzerKomentari", { 
	data () {
	    return {
	      komentari: null
	    }
	},
	    template: ` 
    	<div>
    	<br><br>
    	 	<div>
	    		<table width="100%" border="0" class="tabela">
		    		<tr bgcolor="lightgrey" class="zaglavljeTabele" >
		    			<th>Korisnik</th>
		    			<th>Objekat</th>
		    			<th>Tekst komentara</th>
		    			<th>Ocjena</th>
		    			<th>Aktivan</th>
		    		</tr>
		    			
		    		<tr v-for="p in komentari" class="parniRedovi" style="height:0.8cm">
		    			<td>{{p.username}}</td>
						<td>{{p.sportsFacility}}</td>
						<td>{{p.comment}}</td>
						<td style="text-align:center;">{{p.grade}}</td>
						<td style="text-align:center;">{{p.logickiObrisan|statusKomentara}}</td>
		    		</tr>
		    	</table>
		    </div>
    	</div>		  
    	`,
    methods:{

	}
	
    ,
    mounted () {
        axios
          .get('rest/menager/prikaziKomentareMenadzer')
          .then(response => (this.komentari = response.data))
    },filters: {
		statusKomentara: function(value) {
			if(value==false){
				return "NE";
			}else {
				return "DA";
			}
		}
	  },
});

