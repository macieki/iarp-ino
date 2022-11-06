<template>
	<div>
		<div class="orange">
			<ul>

			</ul>
		</div>
		<v-container fluid pa-0 mx-0 mt>
			<v-img
			:src="require('@/assets/bg2.jpg')"
			height="400"
      		width="100%"
			class="d-flex align-center px-4 main-bg"
			>
			
				<v-container>
						<h1 class="mb-2">
							{{ content.Naglowek1 }}
						</h1>
						<div class="subheader">
							{{ content.Podtytul }}
						</div>
					</v-container>
			</v-img>
		</v-container>
		<v-container>
			<v-row>
				<v-col cols="12" md="6" class="pa-0 ma-0 order-1 order-md-0">
					<v-carousel hide-delimiters height="auto">
						<v-carousel-item v-for="szkolenie in szkolenia" :key="szkolenie.id">
							<CardComponent 
								:isExtended="false"
								:isNews="false"
								:title="szkolenie.attributes.Title"
								:subtitle="szkolenie.attributes.osoba.data.attributes.Name"
								:person_photo="apiUrl+szkolenie.attributes.osoba.data.attributes.Image.data.attributes.url"
								featured_photo=""
								:isPerson="false"
								:text="szkolenie.attributes.Description"
								date="20.12.2022"
							/>
						</v-carousel-item>
					</v-carousel>
				</v-col>
				<v-col cols="12" md="6" class="pa-8 section section-right ma-0 order-0 order-md-1">
					<h2 class="section-title mb-6">Szkolenia</h2>
					<p class="section-description grey--text  text--darken-1">
						{{ content.SzkoleniaTekst }}
					</p>
				</v-col>
			</v-row>
			<v-row class="mt-12 mt-md-3">
				<v-col cols="12" md="6" class="pa-8 section section-left ma-0">
					<h2 class="section-title mb-6 ">Usługi</h2>
					<p class="section-description grey--text text--darken-1">
						{{ content.UslugiTekst }}
					</p>
				</v-col>
				<v-col cols="12" md="6" class="pa-0 ma-0">
					<v-carousel hide-delimiters height="auto">
						<v-carousel-item v-for="usluga in uslugi" :key="usluga.id">
							<CardComponent 
								:isExtended="false"
								:isNews="false"
								:title="usluga.attributes.Title"
								:subtitle="usluga.attributes.osoba.data.attributes.Name"
								:person_photo="apiUrl+usluga.attributes.osoba.data.attributes.Image.data.attributes.url"
								:isPerson="false"
								featured_photo=""
								:text="usluga.attributes.Description"
								date="20.12.2022"
							/>
						</v-carousel-item>
					</v-carousel>
				</v-col>
			</v-row>
		</v-container>
		<v-container class="mt-12 mt-md-0">
			<v-row>
				<v-col cols="12" sm="4" class="pa-0">
					<v-sheet color="primary" class="news white--text d-flex align-center justify-center font-weight-bold">
						<h3 class="white--text font-size-2">Aktualności</h3>
					</v-sheet>
				</v-col>
				<v-col cols="12" sm="8"  class="pa-0 py-6 ma-0" ref="slideWrapper">
					<v-window
						class="pa-0 ma-0 fill-height"
						active-class="success"
						show-arrows
						height="100%"
					>
					<v-window-item  v-for="aktualnosc in aktualnosci" :key="aktualnosc.id">
						<v-card class="news ma-0 pa-4"
							height="100%" flat
						>
							<v-card-text class="date">{{aktualnosc.attributes.Date}}</v-card-text>
							<v-card-title class="pt-0 mb-2">{{aktualnosc.attributes.Title}}</v-card-title>
							<v-card-subtitle class="regular-text">{{aktualnosc.attributes.Title}}</v-card-subtitle>
						</v-card>
					</v-window-item>
					</v-window>
				</v-col>
			</v-row>
	</v-container>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'IndexPage',
	data: () => ({
		model: 0,
		widthString: "",
		width: "",
    	height: "",
		apiUrl: "http://localhost:1337", 
		szkolenia: [],
		uslugi: [],
		content: [],
		aktualnosci: [],
		content: {
			Naglowek1:'',
			Podtytul:'',
			SzkoleniaTekst:'',
			UslugiTekst:''

		}

	}),
	computed: {
	},
	methods: {
	},
	async mounted () {
		try {
			const responseSzkolenia = await axios.get(this.apiUrl+'/api/aktywnosci?filters[Type][$eq]=Szkolenie&populate[osoba][populate][0]=Image&populate=Image&sort=id:desc')
			const responseUslugi = await axios.get(this.apiUrl+'/api/aktywnosci?filters[Type][$eq]=Usluga&populate[osoba][populate][0]=Image&populate=Image&sort=id:desc')
			const responseContent = await axios.get(this.apiUrl+'/api/strona-glowna')
			const responseAktualnosci = await axios.get(this.apiUrl+'/api/aktualnoscs?sort=id:desc')
			this.szkolenia = responseSzkolenia.data.data
			this.uslugi = responseUslugi.data.data
			this.content.Naglowek1 = responseContent.data.data.attributes.Naglowek1
			this.content.Podtytul= responseContent.data.data.attributes.Podtytul
			this.content.SzkoleniaTekst = responseContent.data.data.attributes.SzkoleniaTekst
			this.content.UslugiTekst = responseContent.data.data.attributes.UslugiTekst
			this.aktualnosci = responseAktualnosci.data.data
			console.log(this.aktualnosci)
		} catch (error) {
			this.error = error;
			console.log(error)
		}
	}
}
</script>
<style lang="scss">
	.main-bg .v-image__image{
		background-size: cover;
		background-position: center;
		padding-left: 50%;
		background-origin: content-box;
		background-clip: content-box;
	}
	.section{
		position: relative;
		&:before{
			content:' ';
			position: absolute;
			width: 92px;
			height: 92px;
			background-color: var(--v-primary-base);
			background-position: center;
			background-repeat: no-repeat;
			top: 0;
		}
		&.section-right{
			padding-left: 128px!important;
			&:before{
				left: 0;
				background-image: url('@/assets/szkolenia.svg');
			}
		}
		&.section-left{
			padding-right: 128px!important;
			text-align: right;
			@include sm-down{
				text-align: left;
				padding-right: initial!important;
				padding-left: 128px!important;
			}
			&:before{
				right: 0;
				background-image: url('@/assets/uslugi.svg');
				@include sm-down{
					right: initial;
					left: 0;
				}
			}
		}
	}
	.v-window__prev, .v-window__next{
		background-color: transparent;
		&:hover{
			background-color: var(--v-surface-darken1)
		}
		margin: 0 8px;
		.mdi::before{
			color: var(--v-primary-base);
		}
	}
	.v-slide-group__content{
		.v-card{
			border-left: 1px solid var(--v-surface-darken1);
		}
	}
	.v-slide-group .v-slide-group__prev{
		background: var(--v-background-base);
		z-index: 9;
		position: relative;
		left: 1px;
	}
	.v-slide-group .v-slide-group__prev, .v-slide-group .v-slide-group__next{
		.mdi::before{
			color: var(--v-primary-base);
		}
		i{
			border-radius: 25px;
		}
		&:hover{
			i{
				background-color: var(--v-surface-darken1)
			}
		}
	}
	.v-slide-group__next--disabled, .v-slide-group__prev--disabled{
		.mdi::before{
			color: var(--v-surface-darken1)!important;
		}
	}
	.news{
		min-height: 240px;
		@include xs{
			min-height: 120px;
		}
	}
</style>
