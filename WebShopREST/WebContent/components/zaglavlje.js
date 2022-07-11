Vue.component("app-zaglavlje",{
    template: `
    <div class="zaglavljePozadina">
        <div>
        	<table>
        		<tr>
        			<td class="zaglavljeLinkovi"><router-link to="/" class="link" exact>Sportski objekti</router-link></td>
        			<td class="zaglavljeLinkovi"><router-link to="/registracija" class="link" exact>Registracija</router-link></td>
        			<td class="zaglavljeLinkovi"><router-link to="/login" class="link" exact>Login</router-link></td>
        		</tr>
        	</table>
        </div>

    </div>		  
    
    `
});