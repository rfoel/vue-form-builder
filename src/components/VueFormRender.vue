<template>
	<div>
		<div class="row">
			<div class="col s12">
				<div class="row" v-for="(opt, index) in schema" :key="index">
					<div class="input-field" v-if="['text','email','checkbox','password'].includes(opt.type)">
						<input :id="opt.name" :type="opt.type" class="validate" :required="opt.required">
						<label :for="opt.name">{{opt.label}}</label>
						<!-- <a class="btn tooltipped" data-position="bottom" data-delay="50" data-tooltip="I am tooltip">Hover me!</a> -->

					</div>
<!-- 
					<div class="input-field" v-if="opt.type == 'date'">
						<input :id="opt.name" :type="opt.type" class="datepicker" :required="opt.required">
						<label :for="opt.name">{{opt.label}}</label>
						<a class="btn tooltipped" data-position="bottom" data-delay="50" data-tooltip="I am tooltip">Hover me!</a>

					</div> -->

					<div v-if="opt.type == 'select'">
						<label>{{opt.label}}</label>
						<select class="browser-default">
							<option  v-for="(option, index) in opt.values" :key="index" :value="option.value" >{{option.label}}</option>
						</select>
					</div>

					<div class="input-field" v-if="opt.type == 'textarea'">
						<textarea :id="opt.name" class="materialize-textarea"></textarea>
						<label :for="opt.name">{{opt.label}}</label>
					</div>

					<div v-if="['radio-group','checkbox-group'].includes(opt.type)">
						<label>{{opt.label}}</label>
						<p v-for="option in opt.values">
							<input :name="opt.name" :type="(opt.type == 'radio-group')? 'radio' : 'checkbox'" :id="concatId(opt,option)" :value="option.value"/>
							<label :for="concatId(opt,option)">{{option.label}}</label>
						</p>
					</div>

					<div v-if="opt.type == 'file'">
						<label>{{opt.label}}</label>
						<div class="file-field input-field">
							<div class="btn">
								<span>File</span>
								<input type="file" :multiple="opt.multiple">
							</div>
							<div class="file-path-wrapper">
								<input class="file-path validate" type="text" :placeholder="opt.description">
							</div>
						</div>	
					</div>
					<div v-if="opt.type == 'switch'">
						<label>{{opt.label}}</label>
						<div class="switch">
							<label>
								{{opt.labelInactive}}
								<input type="checkbox" :name="opt.name">
								<span class="lever"></span>
								{{opt.labelActive}}
							</label>
						</div>
					</div>

					<div v-if="opt.type == 'range'">
						<label>{{opt.label}}</label>
						<p class="range-field">
							<input type="range" :id="opt.name" :min="opt.values.min" :max="opt.values.max" />
						</p>
					</div>
					

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'vue-form',
		props: ['schema'],
		data () {
			return {
				
			}
		},
		methods:{
			concatId: function(item,option){	
				return item.type + option.value;
			}},
			computed: {},
			watch: {},
		// mounted: function () {
		//   this.$nextTick(function () {
		//     $('.tooltipped').tooltip({delay: 50});
		//   })
		// },
	}
</script>

<style>

</style>
