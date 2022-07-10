Vue.component("administrator-zaglavlje",{
    template: `
        <div class="zaglavljePozadina">
        	<table class="tabelaSaLinkovimaZaglavlje">
        		<tr>
        			
        			<td class="zaglavljeLinkovi"><router-link to="/dodajObjekat" exact>Dodaj objekat</router-link></td>
        			<td class="zaglavljeLinkovi"><router-link to="/dodajKorisnika" exact>Dodaj korisnika</router-link></td>
        			<td class="zaglavljeLinkovi"><router-link to="/promoKod" exact>Promo kod</router-link></td>
        			<td class="zaglavljeLinkovi"><router-link to="/komentari" exact>Komentari</router-link></td>
        			<td class="zaglavljeLinkovi"><router-link to="/korisnici"  exact>Korisnici</router-link></td>
        			<td class="zaglavljeLinkovi"><router-link to="/profil" exact>Profil</router-link></td>
        		</tr>
        	</table>
        </div>
    `
});