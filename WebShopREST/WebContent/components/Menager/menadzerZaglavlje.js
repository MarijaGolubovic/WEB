Vue.component("menadzer-zaglavlje",{
    template: `
    <div id="divHeaderGuest">
        <div class="navigacija">
            <ul>
                <li><router-link to="/" class="link" exact>Svi treninzi</router-link></li>
                <li><router-link to="/profil" class="link" exact>Profil</router-link></li>
                <li><router-link to="/rasporedTreninga" class="link" exact>Raspored zakazanih treninga</router-link></li>
                 <li><router-link to="/korisnici" class="link" exact>Korisnici</router-link></li>
            </ul>
        </div>

    </div>		  
    
    `
});