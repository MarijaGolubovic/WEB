Vue.component("menadzer-zaglavlje",{
    template: `
    <div id="divHeaderGuest">
        <div class="navigacija">
            <ul>
                <li><router-link to="/" class="link" exact>Treninzi</router-link></li>
                <li><router-link to="/menadzerKomentari" class="link" exact>Komentari</router-link></li>
            </ul>
        </div>

    </div>		  
    
    `
});