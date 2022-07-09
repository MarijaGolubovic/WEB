Vue.component("administrator-zaglavlje",{
    template: `
        <div>
            <ul>
                <li><router-link to="/korisnici"  exact>Korisnici</router-link></li>
                <li><router-link to="/dodajObjekat" exact>Dodaj objekat</router-link></li>
                <li><router-link to="/dodajKorisnika" exact>Dodaj korisnika</router-link></li>
                <li><router-link to="/komentari" exact>Komentari</router-link></li>
            </ul>
        </div>
    `
});