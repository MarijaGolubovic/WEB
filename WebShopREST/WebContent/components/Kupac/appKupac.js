const KupacZakazivanje = { template: '<app-zakazivanjeKupac></app-zakazivanjeKupac>'}
const KupacZakazani = { template: '<app-ZakazaniTreninzi></app-ZakazaniTreninzi>'}
const KupacClanarine = { template: '<app-clanarineKupac></app-clanarineKupac>'}
const KupacKomentari = { template: '<app-komentariKupac></app-komentariKupac>'}
const KupacProfil = { template: '<app-profil></app-profil>'}

const router = new VueRouter ({
	mode: 'hash',
	routes:[
		{path: '/zakazivanje', component: KupacZakazivanje },
		{path: '/zakazani', component: KupacZakazani },
		{path: '/clanarine', component: KupacClanarine },
		{path: '/komentari', component: KupacKomentari},
		{path: '/profil', component: KupacProfil }
	]
})

var appKupac = new Vue({
    router,
    el: '#kupac'
});