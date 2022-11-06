<template>
	<div>
		<v-container class="main-container">
			<h1>
				Zespół
			</h1>
		</v-container>
		<v-container class="mt-8">
			<v-row  v-for="czlowiek in ludzie" :key="czlowiek.id" class="mb-8 czlowiek">
				<v-col cols="12" md="8" class="pa-0 ma-0">
					<CardComponent 
						:isExtended="false"
						:isNews="false"
						:isPerson="false"
						:isTeam="true"
						:title="czlowiek.attributes.Name"
						:person_photo="apiUrl+czlowiek.attributes.Image.data.attributes.url"
						:subtitle="czlowiek.attributes.Description"
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
		ludzie: ''
	}),
	computed: {
	},
	methods: {
	},
	async mounted () {
		try {
			const responseOsoby = await axios.get(this.apiUrl+'/api/osobas?populate=Image&sort=id:desc')
			this.ludzie= responseOsoby.data.data
			console.log(ludzie)
		} catch (error) {
			this.error = error;
			console.log(error)
		}
	}
}
</script>
<style lang="scss">
	.czlowiek{
		&:nth-child(even){
			justify-content: end;
		}
		&:nth-child(odd){
			justify-content: start;
		}
	}
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
