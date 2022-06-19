Vue.component("app-zaglavlje",{
    template: `
    <div id="divHeaderGuest">
        <div class="navigacijaa">
            <ul>
            	<li><router-link to="/" class="link" exact>Sportski objekti</router-link></li>
                <li><router-link to="/registracija" class="link" exact>Registracija</router-link></li>
                <li><router-link to="/login" class="link" exact>Login</router-link></li>
            </ul>
        </div>

    </div>		  
    
    `
});