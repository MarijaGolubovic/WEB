const KupacZakazivanje = { template: '<app-zakazivanjeKupac></app-zakazivanjeKupac>'}
const KupacZakazani = { template: '<app-ZakazaniTreninzi></app-ZakazaniTreninzi>'}
const KupacClanarine = { template: '<app-clanarineKupac></app-clanarineKupac>'}

const router = new VueRouter ({
	mode: 'hash',
	routes:[
		{path: '/zakazivanje', component: KupacZakazivanje },
		{path: '/zakazani', component: KupacZakazani },
		{path: '/clanarine', component: KupacClanarine }
	]
})

var appKupac = new Vue({
    router,
    el: '#kupac'
});