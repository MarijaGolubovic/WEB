Vue.component("administrator-zaglavlje",{
    template: `
        <div>
            <ul>
                <li><router-link to="/korisnici"  exact>Korisnici</router-link></li>
                <li><router-link to="/dodajObjekat" exact>Dodaj objekat</router-link></li>
                <li><router-link to="/profil" exact>Profil</router-link></li>
            </ul>
        </div>
    `
});