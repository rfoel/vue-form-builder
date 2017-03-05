<template>
	<div id="app" class="container">
		<div class="row">
			<div class="center">
				<img src="./assets/logo.svg">
			</div>  
		</div>
		<vue-form></vue-form>
	</div>
</template>

<script>
	import VueForm from './components/VueForm'

	export default {
		name: 'app',
		components: {
			VueForm
		}
	}
</script>