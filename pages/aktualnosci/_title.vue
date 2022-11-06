<template>
	<div>
		<v-container class="main-container">
			<p>{{ aktualnosc.date }}</p>
			<h1>
				{{ aktualnosc.title }}
			</h1>
			<v-img
			:src="aktualnosc.featuredImage"
			height="400"
      		width="100%"
			class="d-flex align-center px-4 main-bg mt-8"
			>
			</v-img>
		</v-container>
		<v-container class="mt-8 text-container">
			<v-row >
				<v-col cols="12" md="12" class="">
					{{aktualnosc.content}}
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
		aktualnosc: {
			featuredImage: '',
			content: '',
			title: '',
			date: ''

		}

	}),
	computed: {
	},
	methods: {
	},
	async mounted () {
		try {
			const slug = this.$route.params.title
			const responseAktualnosc = await axios.get(this.apiUrl+'/api/aktualnoscs?filters[slug][$eq]='+slug+'&populate=Image')
			const res = responseAktualnosc.data.data[0]
			this.aktualnosc.featuredImage = this.apiUrl+res.attributes.Image.data.attributes.url
			this.aktualnosc.content = res.attributes.Content
			this.aktualnosc.title = res.attributes.Title
			this.aktualnosc.date = res.attributes.Date
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
