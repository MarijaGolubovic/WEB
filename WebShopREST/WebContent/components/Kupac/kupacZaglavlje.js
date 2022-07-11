Vue.component("kupac-zaglavlje",{
    template: `
    <div id="divHeaderGuest">
        <div class="zaglavljePozadina">
        	<table style="width:85%">
        		<tr>
        			<td class="zaglavljeLinkovi"><router-link to="/zakazivanje" class="link" exact>Zakazivanje Treninga</router-link></td>
        			<td class="zaglavljeLinkovi"><router-link to="/" class="link" exact>Zakazani Treninzi</router-link></td>
        			<td class="zaglavljeLinkovi"><router-link to="/komentari" class="link" exact>Ostavi komentar</router-link></td>
        			<td class="zaglavljeLinkovi"><router-link to="/clanarine" class="link" exact>Clanarine</router-link></td>
        			<td class="zaglavljeLinkovi"><router-link to="/profil" class="link" exact>Profil</router-link></td>
        		</tr>
        	</table>
        </div>

    </div>		  
    
    `
});