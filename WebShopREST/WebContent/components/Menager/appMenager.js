const MenadzerObjekti = { template: '<app-pocetnaObjekat></app-pocetnaObjekat>'}
const MenadzerKomentari = { template: '<app-menadzerKomentari></app-menadzerKomentari>'}
const MenadzerProfil = { template: '<app-profil></app-profil>'}
const MenadzerZakazaniTreninzi = { template: '<app-ZakazaniTreninzi></app-ZakazaniTreninzi>'}
const MenadzerKorisnici = { template: '<app-korisniciMenadzer></app-korisniciMenadzer>'}


const router = new VueRouter ({
	mode: 'hash',
	routes:[
		{path: '/', component: MenadzerObjekti },
		{path: '/menadzerKomentari', component: MenadzerKomentari },
		{path: '/profil', component: MenadzerProfil },
		{path: '/rasporedTreninga', component: MenadzerZakazaniTreninzi },
		{path: '/korisnici', component: MenadzerKorisnici }
	]
})

var appMenager = new Vue({
    router,
    el: '#menadzer'
});