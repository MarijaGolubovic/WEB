const KorisniciKomponenta = {template: '<administrator-korisnici></administrator-korisnici>'}
const DodajObjekatKomponenta = {template: '<administrator-dodavanjeObjekta></administrator-dodavanjeObjekta>'}

const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/korisnici', component: KorisniciKomponenta},
        {path : '/dodajObjekat', component: DodajObjekatKomponenta}
    ]
})

var adminApp = new Vue({
    router,
    el: '#administrator'
});