<template>
	<div>
		<div class="orange">
			<ul>

			</ul>
		</div>
		<v-container fluid pa-0 mx-0 mt>
			<v-img
			:src="require('@/assets/bg1.jpg')"
			height="400"
      		width="100%"
			class="d-flex align-center px-4 main-bg"
			>
			
				<v-container>
						<h1 class="mb-2">
							Usługi
						</h1>
						<div class="subheader">
							{{ content.Podtytul }}
						</div>
					</v-container>
			</v-img>
		</v-container>
		<v-container class="mt-8">
			<v-row  v-for="usluga in uslugi" :key="usluga.id">
				<v-col cols="12" md="12" class="pa-0 ma-0 order-1 order-md-0">
					<CardComponent 
						:isExtended="true"
						:isNews="false"
						:isPerson="false"
						:title="usluga.attributes.Title"
						:subtitle="usluga.attributes.osoba.data.attributes.Name"
						:person_photo="apiUrl+usluga.attributes.osoba.data.attributes.Image.data.attributes.url"
						:featured_photo="apiUrl+usluga.attributes.Image.data.attributes.url"
						:text="usluga.attributes.Description"
						date="20.12.2022"
					/>
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
		uslugi: [],
		content: [],
		aktualnosci: [],
		uslugi: [],
		content: {
			Subtitle:'',
			Podtytul:'',
			UslugiTekst:''
		}

	}),
	computed: {
	},
	methods: {
	},
	async mounted () {
		try {
			const responseUslugi = await axios.get(this.apiUrl+'/api/aktywnosci?filters[Type][$eq]=Usluga&populate[osoba][populate][0]=Image&populate=Image&sort=id:desc')
			const responseContent = await axios.get(this.apiUrl+'/api/aktywnosci-strona')
			this.uslugi = responseUslugi.data.data
			this.content.Podtytul= responseContent.data.data.attributes.Podtytul
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
				background-image: url('@/assets/uslugi.svg');
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
