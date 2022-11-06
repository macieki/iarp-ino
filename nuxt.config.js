import colors from 'vuetify/es5/util/colors'

export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: '%s - blog-strapi-ino',
		title: 'blog-strapi-ino',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		link: [{rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Exo:ital,wght@0,400;0,500;0,700;1,400;1,700&display=block&subset=latin-ext"  }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
	],
	styleResources: {
		scss: [
			"~/assets/mixins.scss",
			"~/assets/fonts.scss",
			"~/assets/main.scss"
		]
	},
	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/style-resources',
		'@nuxtjs/vuetify'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'@nuxtjs/axios'
	],
	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
	icons: {
		iconfont: 'mdi'
	},
		theme: {
			light: true,
		options: {
			customProperties: true
		},
			themes: {
				light: {
					primary: colors.blue.darken4,
					accent: colors.grey.darken3,
					surface: colors.grey.lighten5,
					background: "#ffffff",
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3,
				},
			},
		},
	},
	
	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
	env: {
	strapiBaseUri: process.env.API_URL || "http://localhost:1337"
	},
}
