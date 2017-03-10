<template>
	<div>
		<div class="row">
			<div class="col s12 m4">
				<draggable element="ul" :list="components" class="collection dragArea" :options="componentsOptions" :clone="onClone">
					<li v-for="component in components" class="collection-item">
						<i :class="component.icon"></i> {{component.label}}
					</li>
				</draggable>
			</div>

			<div class="col s12 m8">
				<draggable element="ul" data-collapsible="accordion" :list="formItems" class="collapsible dropArea" :options="formOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
					<li v-for="(item, index) in formItems" :key="index">
						<div class="collapsible-header">
							<i :class="item.icon"></i>{{item.label}}
							<div class="right">
								<i :class="item.fixed? 'mdi mdi-pin' : 'mdi mdi-pin-off'" @click.stop="item.fixed = !item.fixed" aria-hidden="true"></i>
								<i class="mdi mdi-delete" @click.stop="destroy(index)" aria-hidden="true"></i>
							</div>
						</div>
						<div class="collapsible-body">
							<input type="checkbox" :id="item.name + '-required'" :checked="item.required" @click.stop="item.required = !item.required"  />
							<label :for="item.name + '-required'">Required</label>
							<br>
							<br>
							<div class="input-field">
								<input :id="item.name + '-description'" type="text" v-model="item.description">
								<label :for="item.name + '-description'">Help text</label>
							</div>
							<div class="input-field">
								<input :id="item.name + '-label'" type="text" v-model="item.label">
								<label class="active" :for="item.name + '-label'">Label</label>
							</div>
							<div v-if="['checkbox-group', 'radio-group', 'select'].includes(item.type)">
								<label>Values</label>
								<draggable element="ul" :list="item.values" class="collection" :options="{group:{name:'item.values'}}">
									<li v-for="(option, index) in item.values" :key="index" class="collection-item grey lighten-5">
										<div class="row no-margin-bot">
											<div class="col s5 input-field">
												<input :id="'option-label-' + index" type="text" v-model="option.label">
												<label class="active" :for="'option-label-' + index">Label</label>
											</div>
											<div class="col s5 input-field">
												<input :id="'option-value-' + index" type="text" v-model="option.value">
												<label class="active" :for="'option-value-' + index">Value</label>
											</div>
											<div class="col s2" v-if="item.values.length > 2">
												<i class="mdi mdi-close" @click.stop="removeOption(item.values, index)"></i>
											</div>											
										</div>
									</li>
								</draggable>
								<div class="row">
									<a class="btn right waves-effect" @click.stop="addOption(item.values)">Add option</a>
								</div>
							</div>
						</div>
					</li>
				</draggable>
			</div>
		</div>

		<div class="row">
			<div class="col s12 grey lighten-4">
				<pre>{{listString}}</pre>
			</div>
		</div>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'

	export default {
		name: 'vue-form',
		components: { draggable },
		data () {
			return {
				components: [
				{
					icon: "mdi mdi-checkbox-marked-outline",
					label: "Checkbox",
					type: "checkbox"
				},
				{
					icon: "mdi mdi-checkbox-multiple-marked-outline",
					label: "Checkbox group",
					type: "checkbox-group",
					values: [
					{
						label: "Option 1",
						value: "option-1",
						selected: false
					},
					{
						label: "Option 2",
						value: "option-2",
						selected: false
					},
					{
						label: "Option 3",
						value: "option-3",
						selected: false
					}
					]
				},
				{
					icon: "mdi mdi-checkbox-multiple-marked-circle-outline",
					label: "Radio group",
					type: "radio-group",
					values: [
					{
						label: "Option 1",
						value: "option-1",
						selected: false
					},
					{
						label: "Option 2",
						value: "option-2",
						selected: false
					},
					{
						label: "Option 3",
						value: "option-3",
						selected: false
					}
					]
				},
				{
					icon: "mdi mdi-textbox",
					label: "Text field",
					type: "text"
				},
				{
					icon: "mdi mdi-file-document-box",
					label: "Textarea",
					type: "textarea"
				},
				{
					icon: 'mdi mdi-menu',
					label: 'Select',
					type: 'select',
					values: [
					{
						label: "Option 1",
						value: "option-1",
						selected: false
					},
					{
						label: "Option 2",
						value: "option-2",
						selected: false
					},
					{
						label: "Option 3",
						value: "option-3",
						selected: false
					}
					]
				}
				],
				formItems:[],
				isDragging: false,
				delayedDragging:false
			}
		},
		methods:{
			onMove ({relatedContext, draggedContext}) {
				const relatedElement = relatedContext.element;
				const draggedElement = draggedContext.element;
				return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
			},
			onClone (el) {
				var input = JSON.parse(JSON.stringify(el));
				input.name = input.type + '-' + Date.now();
				input.fixed = false;
				input.required = false;
				input.description = '';

				return input
			},
			destroy (index) {
				this.formItems.splice(index, 1)
			},
			addOption (values) {
				values.push({
					label: "Option "+(values.length+1),
					value: "option-"+(values.length+1)
				})
			},
			removeOption (values, index) {
				values.splice(index, 1)
			}
		},
		computed: {
			componentsOptions () {
				return  {
					sort: false,
					group:{
						name:'components', 
						pull:'clone', 
						put:false 
					}
				}
			},
			formOptions () {
				return  {
					handle: '.collapsible-header',
					group:{
						name:'components'
					}
				}
			},
			listString(){
				return this.formItems;  
			}
		},
		watch: {
			isDragging (newValue) {
				if (newValue){
					this.delayedDragging= true
					return
				}
				this.$nextTick( () =>{
					this.delayedDragging =false
				})
			}
		}
	}
</script>

<style lang="less">
	.mdi {
		font-size: 1.4em;
		vertical-align: bottom;
	}

	.collection-item {
		cursor: move;
	}

	.mdi-pin, .mdi-pin-off, .mdi-close {
		cursor: pointer;
	}

	.dropArea {
		background: #f5f5f5;
		min-height: 270px;
		padding: 10px 0;
	}

	.collapsible-header {
		width: 100%;
	}

	.collapsible-body {
		width: 100%;
		background: #fff;
	}

	.no-margin-bot {
		margin-bottom: 0 !important;

		input {
			margin-bottom: 0 !important;
		}
	}
</style>
