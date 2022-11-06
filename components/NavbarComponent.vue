<template>
	<div>
		<v-navigation-drawer v-model="sidebar" right temporary app mobile-breakpoint="960"
			class="hidden-md-and-up"
		>
			<v-list>
				<v-list-item
					v-for="item in menuItems"
					class="white primary--text"
					:key="item.title"
					:to="item.path">
					<v-list-item-action>
						<v-icon color="primary">{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>{{ item.title }}</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar class="hidden-xs main-nav transparent" app flat prominent shrink-on-scroll fixed max-height="100px">
			<v-container class="d-flex md-fluid pa-0">
				<v-toolbar-title class="grow align-center align-self-center">
					<router-link to="/" tag="span" style="cursor: pointer">
					<logo/>
					</router-link>
				</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-tabs class="hidden-sm-and-down" background-color="transparent"
					slider-size="6" height="100%"
					right>
					<v-tab class="pa-0 ma-0" style="min-width:0px" />
					<v-tab
					flat
					v-for="item in menuItems"
					:key="item.title"
					:to="item.path">
					<v-icon left dark>{{ item.icon }}</v-icon>
					{{ item.title }}
					</v-tab>
				</v-tabs>
				
				<span class="hidden-md-and-up align-self-center right">
					<v-app-bar-nav-icon @click="sidebar = !sidebar" class="primary--text">
					</v-app-bar-nav-icon>
				</span>
				</v-container>
		</v-app-bar>
	</div>
</template>
<script>
export default {
	name: 'Navbar',
	data () {
    return {
    	sidebar: false,
    	menuItems: [
    	    { title: 'O nas', path: '/', icon: 'mdi-information-outline' },
    	    { title: 'Szkolenia', path: '/szkolenia', icon: 'mdi-school-outline' },
    	    { title: 'Usługi', path: '/uslugi', icon: 'mdi-face-agent' },
    	    { title: 'Zespół', path: '/zespol', icon: 'mdi-account-group-outline' },
    	    { title: 'Aktualności', path: '/aktualnosci', icon: 'mdi-newspaper-variant-outline' },
    	    { title: 'Kontakt', path: '/kontakt', icon: 'mdi-email-outline' }
    	]
    }
	},
	computed: {},
	methods: {},
	mounted () {},
	created () {}
}
</script>

<style lang="scss">
	.v-toolbar__content{
		> .container{
			height: 100%;
		}
	}
	.main-nav{
		.v-tabs-slider-wrapper{
			top: 0;
			bottom: initial;
		}
	}
	.v-toolbar__content{
		//align-items: center!important;
		padding-top: 0;
	}
	.v-app-bar--is-scrolled{
		.logo{
			height: 32px;
			width: auto;
			position: relative;
			top: 3px;
		}
		.v-toolbar__content{
			border-bottom: 1px solid #ddd;
			background: #fff;
		}
	}
	.v-tabs-bar__content{
		justify-content: flex-end;
	}
	.v-tab{
		text-transform: initial;
		color: var(--v-primary-base)!important;
		i{
			color: var(--v-primary-base)!important;
		}
	}
</style>