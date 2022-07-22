const TrenerSviTreninzi = { template: '<app-sviTreninzi></app-sviTreninzi>'}
const TrenerZakazaniTreninzi = { template: '<app-ZakazaniTreninziTrener></app-ZakazaniTreninziTrener>'}
const TrenerProfil = { template: '<app-profil></app-profil>'}


const router = new VueRouter ({
	mode: 'hash',
	routes:[
		{path: '/', component: TrenerSviTreninzi },
		{path: '/zakazani', component: TrenerZakazaniTreninzi },
		{path: '/profil', component: TrenerProfil }
	]
})

var appTrener = new Vue({
    router,
    el: '#trener'
});