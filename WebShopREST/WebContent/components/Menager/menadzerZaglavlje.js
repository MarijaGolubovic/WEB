Vue.component("menadzer-zaglavlje",{
    template: `
    <div id="divHeaderGuest">
        <div class="zaglavljePozadina">
        	<table style="width:100%">
        		<tr>
        			<td class="zaglavljeLinkovi"><router-link to="/rasporedTreninga" class="link" exact>Raspored zakazanih treninga</router-link></td>
        			<td class="zaglavljeLinkovi"><router-link to="/" class="link" exact>Svi treninzi</router-link></td>
        			<td class="zaglavljeLinkovi"><router-link to="/korisnici" class="link" exact>Korisnici</router-link></td>
        			<td class="zaglavljeLinkovi"><router-link to="/menadzerKomentari" class="link" exact>Komentari</router-link></td>
        			<td class="zaglavljeLinkovi"><router-link to="/profil" class="link" exact>Profil</router-link></td>
        		</tr>
        	</table>
        </div>

    </div>		  
    
    `
});