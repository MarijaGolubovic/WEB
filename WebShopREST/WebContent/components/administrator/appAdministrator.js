const KorisniciKomponenta = {template: '<administrator-korisnici></administrator-korisnici>'}
const DodajObjekatKomponenta = {template: '<administrator-dodavanjeObjekta></administrator-dodavanjeObjekta>'}
const DodajKorisnikaKomponenta = {template: '<administrator-dodavanjeKorisnika></administrator-dodavanjeKorisnika>'}
const KomentariKomponenta = {template: '<administrator-komentari></administrator-komentari>'}
const PromoKodKomponenta = {template: '<administrator-promoKod></administrator-promoKod>'}

const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/korisnici', component: KorisniciKomponenta},
        {path : '/dodajObjekat', component: DodajObjekatKomponenta},
        {path : '/dodajKorisnika', component: DodajKorisnikaKomponenta},
        {path : '/komentari', component: KomentariKomponenta},
        {path : '/promoKod', component: PromoKodKomponenta}
    ]
})

var adminApp = new Vue({
    router,
    el: '#administrator'
});