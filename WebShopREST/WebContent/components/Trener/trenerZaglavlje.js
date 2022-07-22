Vue.component("trener-zaglavlje",{
    template: `
    <div id="divHeaderGuest">
        <div class="zaglavljePozadina">
            <table>
            	<tr>
            		<td class="zaglavljeLinkovi"><router-link to="/" class="link" exact>Svi treninzi</router-link></td>
            		<td class="zaglavljeLinkovi"><router-link to="/zakazani" class="link" exact>Zakazani treninzi</router-link></td>
            		<td class="zaglavljeLinkovi"><router-link to="/profil" class="link" exact>Profil</router-link></td>
            	</tr>
            </table>
        </div>

    </div>		  
    
    `
});