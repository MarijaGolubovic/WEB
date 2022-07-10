Vue.component("app-menadzerKomentari", { 
	data () {
	    return {
	      komentari: null
	    }
	},
	    template: ` 
    	<div>
    	 	
    		
    		<table width="100%" border="0">
	    		<tr bgcolor="lightgrey">
	    			<th>Korisnik</th>
	    			<th>Objekat</th>
	    			<th>Tekst komentara</th>
	    			<th>Ocjena</th>
	    			<th>Aktivan</th>
	    		</tr>
	    			
	    		<tr v-for="p in komentari" >
	    			<td>{{p.username}}</td>
					<td>{{p.sportsFacility}}</td>
					<td>{{p.comment}}</td>
					<td>{{p.grade}}</td>
					<td>{{p.logickiObrisan|statusKomentara}}</td>
	    		</tr>
	    	</table>
    	</div>		  
    	`,
    methods:{

	}
	
    ,
    mounted () {
        axios
          .get('rest/login/prikaziKomentare')
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

