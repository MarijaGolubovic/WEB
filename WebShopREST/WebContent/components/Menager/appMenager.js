const MenadzerObjekti = { template: '<app-pocetnaObjekat></app-pocetnaObjekat>'}
const MenadzerProfil = { template: '<app-profil></app-profil>'}

const router = new VueRouter ({
	mode: 'hash',
	routes:[
		{path: '/', component: MenadzerObjekti },
		{path: '/profil', component: MenadzerProfil }
	]
})

var appMenager = new Vue({
    router,
    el: '#menadzer'
});