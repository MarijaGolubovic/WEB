Vue.component("trener-zaglavlje",{
    template: `
    <div id="divHeaderGuest">
        <div class="navigacija">
            <ul>
                <li><router-link to="/" class="link" exact>Svi treninzi</router-link></li>
                <li><router-link to="/zakazani" class="link" exact>Zakazani treninzi</router-link></li>
            </ul>
        </div>

    </div>		  
    
    `
});