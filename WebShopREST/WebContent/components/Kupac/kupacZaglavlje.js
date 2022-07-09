Vue.component("kupac-zaglavlje",{
    template: `
    <div id="divHeaderGuest">
        <div class="navigacija">
            <ul>
                <li><router-link to="/zakazivanje" class="link" exact>Zakazivanje Treninga</router-link></li>
                <li><router-link to="/zakazani" class="link" exact>Zakazani Treninzi</router-link></li>
                <li><router-link to="/clanarine" class="link" exact>Clanarine</router-link></li>
            </ul>
        </div>

    </div>		  
    
    `
});