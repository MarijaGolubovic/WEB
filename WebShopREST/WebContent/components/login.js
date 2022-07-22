Vue.component("app-login",{
	 data() {
	        return {
	            korisnik: {},
	            errors: []
	        }
	    }
	    ,
    template:`
    <div>
	    <br><br><br>
	    <div class="forma">
			<form @submit="ulogujSe" method="post">
				<div>
				<table style="margin-right: auto; margin-left: auto;">
					<tr>&nbsp</tr>
					<tr>
						<th class="poravnanjeLabeleForma"><label class="labelaStil"><b>Korisnicko ime:</b></label></th>
						<td><input class="inputPolje" type="text" v-model="korisnik.username" placeholder="Unesite korisnicko ime" name="uname" required ></td>
					</tr>
					<br>
					<br>
			  		<tr>
			  			<th class="poravnanjeLabeleForma"><label class="labelaStil"><b>Lozinka:</b></label></th>
			  			<td><input class="inputPolje" type="password" v-model="korisnik.password" placeholder="Unesite lozinku" name="password" required></td>
			  		</tr>
			  		<tr>&nbsp</tr>
			  		<tr>&nbsp</tr>
			  		<tr>
			  			<td>&nbsp</td>
			  			<td><button type="submit" class="dugmeForma" style="align:center">Login</button></td>
			  		</tr>
			  		<tr>&nbsp</tr>
				</table>
				</div>
		  	</form>
		</div>
	</div>
        `,
     methods: {
        ulogujSe : function (event) {
	 	 	event.preventDefault();
	 	 	 axios
	 	 	   .post('rest/login/login', {
                        "username": this.korisnik.username,
                        "password": this.korisnik.password
                    })
                     .then(response=>{
                    this.message = response.data;
                    location.href = response.data;
                })
                .catch(err =>{ 
                    alert("Lozinka ili korisnicko ime su nevalidni!");
                })
                return true;
	 	}
	}
});
	
