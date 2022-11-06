<template>
	<div>
		<v-container class="main-container">
			<h1>
				{{ content.attributes.Title }}
			</h1>
			<v-img
			:src="usluga.featuredImage"
			height="400"
      		width="100%"
			class="d-flex align-center px-4 main-bg mt-8"
			>
			</v-img>
		</v-container>
		<v-container class="mt-2">
			<v-row >
				<v-col cols="12" md="7" class="">
					{{usluga.content}}
				</v-col>
				<v-col cols="12" md="5" class="">
					<CardComponent 
						:isExtended="false"
						:isNews="false"
						:isPerson="true"
						:title="usluga.osoba.name"
						:person_photo="usluga.osoba.photo"
						:text="usluga.osoba.text"
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
		uslugi: [],
		content: [],
		aktualnosci: [],
		content: {
			attributes: {
				Title: ''
			}
		},
		usluga: {
			featuredImage: '',
			content: '',
			osoba: {
				name: '',
				photo: '',
				text: ''
			}
		}

	}),
	computed: {
	},
	methods: {
	},
	async mounted () {
		try {
			const slug = this.$route.params.slug
			const responseUsluga = await axios.get(this.apiUrl+'/api/aktywnosci?filters[Slug][$eq]='+slug+'&populate[osoba][populate][0]=Image&populate=Image')
			this.content = responseUsluga.data.data[0]
			this.usluga.featuredImage = this.apiUrl+this.content.attributes.Image.data.attributes.url
			this.usluga.content = this.content.attributes.Content
			this.usluga.osoba.name = this.content.attributes.osoba.data.attributes.Name
			this.usluga.osoba.photo = this.apiUrl+this.content.attributes.osoba.data.attributes.Image.data.attributes.url
			this.usluga.osoba.text = this.content.attributes.osoba.data.attributes.Description
			console.log(this.usluga.osoba.photo)
		} catch (error) {
			this.error = error;
			console.log(error)
		}
	}
}
</script>
<style lang="scss">
	.main-container{
		margin-top: 120px;
	}
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
