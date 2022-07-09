Vue.component("administrator-komentari", { 
	data () {
	    return {
	      komentari: null,
	      izabraniKomentar:{}
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
	    			<th></th>
	    		</tr>
	    			
	    		<tr v-for="p in komentari"  v-on:click="izaberiKomentar(p)" :class="{selected : izabraniKorisnik.id == p.id}">
	    			<td>{{p.username}}</td>
					<td>{{p.sportsFacility}}</td>
					<td>{{p.comment}}</td>
					<td>{{p.grade}}</td>
					<td v-if="!p.logickiObrisan"><button>Odbij komentar</button></td>
	    		</tr>
	    	</table>
    	</div>		  
    	`,
    methods:{
		izaberiKorisnika: function(komentar){
			this.izabraniKomentar = komentar;
		},
		obrisiKorisnika: function(){
			if(this.izabraniKomentar.id){
				axios
                    .delete('rest/login/izbrisiKomentar/' + this.izabraniKomentar.id)
                    .then(response => {
                        window.location.reload();
                    })
                    .catch(err =>{ 
                    	alert("Morate izabrati komentar!");
                })
            }else{
            	alert("Morate izabrati komentar!");
            }
		},
	}
	
    ,
    mounted () {
        axios
          .get('rest/login/prikaziKomentare')
          .then(response => (this.komentari = response.data))
    },
});