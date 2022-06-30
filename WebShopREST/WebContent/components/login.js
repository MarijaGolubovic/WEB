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
		<form @submit="ulogujSe" method="post">
			<div style="border-style: solid; width:10cm; height:7cm;background-color:#CDC9C7;border-radius: 10px; color:grey">
			<table style="position:relative; left:0.8cm; top:1cm">
				<tr>
					<th style="text-align: left; color:#F55F0A;font-size:18px"><label><b>Korisnicko ime:</b></label></th>
					<td><input type="text" v-model="korisnik.username" placeholder="Unesite korisnicko ime" name="uname" required 
					style="height:1cm;border-radius: 5px"></td>
				</tr>
				<br>
				<br>
		  		<tr>
		  			<th style="text-align: left; color:#F55F0A;font-size:18px"><label><b>Lozinka:</b></label></th>
		  			<td><input type="password" v-model="korisnik.password" placeholder="Unesite lozinku" name="password" required
		  			style="height:1cm;border-radius: 5px"
		  			></td>
		  		</tr>
			</table>
			<br>
			<button type="submit" style="position:relative; left:3.5cm; top:1.5cm; height:1cm;width:3cm; background-color:#F55F0A;border-radius: 10px; border-color:grey; font-size:18px; color:#7C746F">Login</button>
			</div>
	  	</form>
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
	
