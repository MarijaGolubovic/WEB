const MenadzerObjekti = { template: '<app-pocetnaObjekat></app-pocetnaObjekat>'}
const MenadzerKomentari = { template: '<app-menadzerKomentari></app-menadzerKomentari>'}

const router = new VueRouter ({
	mode: 'hash',
	routes:[
		{path: '/', component: MenadzerObjekti },
		{path: '/menadzerKomentari', component: MenadzerKomentari }
	]
})

var appMenager = new Vue({
    router,
    el: '#menadzer'
});