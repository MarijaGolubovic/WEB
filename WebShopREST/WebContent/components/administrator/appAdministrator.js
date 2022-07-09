const KorisniciKomponenta = {template: '<administrator-korisnici></administrator-korisnici>'}
const DodajObjekatKomponenta = {template: '<administrator-dodavanjeObjekta></administrator-dodavanjeObjekta>'}
const ProfilAdmin = {template: '<app-profil></app-profil>'}

const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/korisnici', component: KorisniciKomponenta},
        {path : '/dodajObjekat', component: DodajObjekatKomponenta},
        {path : '/profil', component: ProfilAdmin}
        
    ]
})

var adminApp = new Vue({
    router,
    el: '#administrator'
});