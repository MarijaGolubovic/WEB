const MenadzerObjekti = { template: '<app-pocetnaObjekat></app-pocetnaObjekat>'}

const router = new VueRouter ({
	mode: 'hash',
	routes:[
		{path: '/', component: MenadzerObjekti }
	]
})

var appMenager = new Vue({
    router,
    el: '#menadzer'
});