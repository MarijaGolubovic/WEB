Vue.component("kupac-zaglavlje",{
    template: `
    <div id="divHeaderGuest">
        <div class="navigacija">
            <ul>
                <li><router-link to="/zakazivanje" class="link" exact>Zakazivanje Treninga</router-link></li>
                <li><router-link to="/" class="link" exact>Zakazani Treninzi</router-link></li>
                <li><router-link to="/clanarine" class="link" exact>Clanarine</router-link></li>
                <li><router-link to="/komentari" class="link" exact>Ostavi komentar</router-link></li>
 				<li><router-link to="/profil" class="link" exact>Profil</router-link></li>
            </ul>
        </div>

    </div>		  
    
    `
});