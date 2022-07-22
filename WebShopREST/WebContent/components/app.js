const RegistrationComponent = { template: '<app-register></app-register>'}
const LoginComponent = { template: '<app-login></app-login>'}
const FacilitiesComponent = { template: '<facilities></facilities>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		  { path: '/', component: FacilitiesComponent},
		  { path: '/registracija', component: RegistrationComponent},
		  { path: '/login', component: LoginComponent}
		  
	  ]
});

var app = new Vue({
	router,
	el: '#aplikacija'
});