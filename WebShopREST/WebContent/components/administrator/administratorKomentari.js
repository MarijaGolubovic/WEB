Vue.component("administrator-komentari", { 
	data () {
	    return {
	      komentari: null,
	      izabraniKomentar:{}
	    }
	},
	    template: ` 
    	<div>	
    	<br><br>
    		<table width="100%" border="0" class="tabela">
	    		<tr bgcolor="lightgrey" class="zaglavljeTabele">
	    			<th>Korisnik</th>
	    			<th>Objekat</th>
	    			<th>Tekst komentara</th>
	    			<th>Ocjena</th>
	    			<th></th>
	    		</tr>
	    			
	    		<tr v-for="p in komentari" class="parniRedovi" style="height:0.8cm">
	    			<td>{{p.username}}</td>
					<td>{{p.sportsFacility}}</td>
					<td>{{p.comment}}</td>
					<td>{{p.grade}}</td>
					<td v-if="p.logickiObrisan==false"><div class="centriranjeDugmeta"><button button class="dugmeObrisi"  v-on:click="izaberiKomentar(p);obrisiKomentar();" :class="{selected : izabraniKomentar.id == p.id}">Odobri komentar</button></div></td>
	    		</tr>
	    	</table>
    	</div>		  
    	`,
    methods:{
		izaberiKomentar: function(komentar){
			this.izabraniKomentar = komentar;
		},
		obrisiKomentar: function(){
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