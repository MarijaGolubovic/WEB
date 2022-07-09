const TrenerSviTreninzi = { template: '<app-sviTreninzi></app-sviTreninzi>'}
const TrenerZakazaniTreninzi = { template: '<app-ZakazaniTreninziTrener></app-ZakazaniTreninziTrener>'}

const router = new VueRouter ({
	mode: 'hash',
	routes:[
		{path: '/', component: TrenerSviTreninzi },
		{path: '/zakazani', component: TrenerZakazaniTreninzi }
	]
})

var appTrener = new Vue({
    router,
    el: '#trener'
});