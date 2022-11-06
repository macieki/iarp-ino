<template>
	<div>
		<v-card
			width="isExtended ? 100% : 50%" :class="isTeam ? '' : 'adjustable-height'"
			color="surface" flat tile>
			<v-row no-gutters class="fill-height" max-height>
				<v-col cols="12" md="6" class="fill-height" v-if="isExtended">
					<v-img
						:src="featured_photo" cover class="fill-height adjustable-height"  height="100%" max-height="380"
					>
					</v-img>
				</v-col>
				<v-col class="pa-8 px-2 px-md-16" cols="isExtended ? 6 : 12">
					
						<p v-if="isPerson">Prowadzący</p>
					<v-row no-gutters>
						
						<v-col v-if="!isNews" class="flex-shrink-1 flex-grow-0">
							<v-avatar :size="$vuetify.breakpoint.mdAndUp ? '106' : '64'">
								<v-img
									:src="person_photo"
									height="100%"
								></v-img>
							</v-avatar>
						</v-col>
						<v-col class="flex-grow-1 flex-shrink-0">
							<div v-if="isNews" class="date mb-2 grey--text text--darken-1">{{date}}</div>
							<v-card-title class="pt-0 mb-2" :class="{'pl-0': isNews}">{{title}}</v-card-title>
							<v-card-subtitle class="bigger-text">{{subtitle}}</v-card-subtitle>
						</v-col>
					</v-row>
					<v-row no-gutters v-if="!isTeam">
						<v-col>
							<v-card-text class="regular-text px-0 grey--text text--darken-1">{{text}}</v-card-text>
						</v-col>
					</v-row>
				</v-col>
			</v-row>
		</v-card>
	</div>
</template>
<script>
export default {
	name: 'Card',
	data () {
		return {}
	},
	props: [
		'isExtended',
		'isTeam',
		'isNews',
		'isPerson',
		'title',
		'subtitle',
		'person_photo',
		'featured_photo',
		'text',
		'date'
	],
	computed: {
	},
	methods: {},
	mounted () {},
	created () {}
}
</script>

<style lang="scss">
	.v-avatar{

	}
	.v-card__title{
		color: var(--v-primary-base);
		line-height: 1.5rem;
		font-weight: 700;
		word-break: initial;
		font-size: 1.5rem;
	}
	.adjustable-height{
		@include md-up{
			min-height: 400px;
		}
	}
</style>