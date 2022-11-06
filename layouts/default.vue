<template>
  <v-app class="white">
	<NavbarComponent/>
	<v-main  class="pt-0">
		<Nuxt/>
	</v-main>
	<FooterComponent/>
  </v-app>
</template>

<script>
export default {
	name: 'DefaultLayout',
	data() {
		return {
			clipped: false,
			drawer: false,
			fixed: false,
			items: [
				{
					icon: 'mdi-apps',
					title: 'Welcome',
					to: '/',
				},
				{
					icon: 'mdi-chart-bubble',
					title: 'Inspire',
					to: '/inspire',
				},
			],
			miniVariant: false,
			right: true,
			rightDrawer: false,
			title: 'Vuetify.js',
		}
	},
	computed:{
		theme(){
			return (this.$vuetify.theme.dark) ? 'dark' : 'light'
		}
	}
}
</script>
