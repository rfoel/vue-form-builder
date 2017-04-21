<template>
	<div>
		<div class="row">
			<div class="col s12 m4">
				<draggable element="ul" :list="components" class="collection dragArea" :options="componentsOptions" :clone="onClone">
					<li v-for="component in components" class="collection-item">
						<i :class="getIcon(component.type)"></i> {{component.label}}
					</li>
				</draggable>
				<div v-if="formItems.length > 0">
					<a class="btn right waves-effect red" @click.stop="clearItems()">Clear</a>
				</div>
			</div>

			<div class="col s12 m8">
				<draggable element="ul" data-collapsible="accordion" :list="formItems" :class="['collapsible dropArea', !formItems.length ? 'empty' : '']" :options="formOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false" data-content="Drag and drop your fields here">
					<li v-for="(item, index) in formItems" :key="index">
						<div class="collapsible-header">
							<i :class="getIcon(item.type)"></i>{{item.label}}
							<div class="right">
								<i :class="item.fixed? 'mdi mdi-pin' : 'mdi mdi-pin-off'" @click.stop="item.fixed = !item.fixed" aria-hidden="true"></i>
								<i class="mdi mdi-delete" @click.stop="destroy(index)" aria-hidden="true"></i>
							</div>
						</div>
						<div class="collapsible-body">
							<input type="checkbox" :id="item.name + '-required'" :checked="item.required" @click.stop="item.required = !item.required"  />
							<label :for="item.name + '-required'">Required</label>
							<div v-if="['select', 'file'].includes(item.type)">
								<br>
								<input type="checkbox" :id="item.name + '-multiple'" :checked="item.multiple" @click.stop="item.multiple = !item.multiple"  />
								<label :for="item.name + '-multiple'">Multiple</label>
							</div>
							<div class="input-field">
								<input :id="item.name + '-description'" type="text" v-model="item.description">
								<label :for="item.name + '-description'">Help text</label>
							</div>
							<div class="input-field">
								<input :id="item.name + '-label'" type="text" v-model="item.label">
								<label class="active" :for="item.name + '-label'">Label</label>
							</div>

							<div v-if="item.type == 'range'">
								<div class="input-field">
									<input :id="item.name + '-label'" type="number" v-model.number="item.values.min">
									<label class="active" :for="item.name + '-label'">Min</label>
								</div>

								<div class="input-field">
									<input :id="item.name + '-label'" type="number" v-model.number="item.values.max">
									<label class="active" :for="item.name + '-label'">Max</label>
								</div>
							</div>

							<div v-if="['text', 'password', 'email'].includes(item.type)">
								<label>Type</label>
								<select v-model="item.type"  class="browser-default">
									<option  v-for="(option, index) in optionType" :key="index" :value="option.value" >{{option.label}}</option>
								</select>
							</div>

							<div v-if="item.type == 'switch'">
								<div class="input-field">
									<input :id="item.name + '-labelActive'" type="text" v-model="item.labelActive">
									<label class="active" :for="item.labelActive + '-labelActive'">Label active</label>
								</div>
								<div class="input-field">
									<input :id="item.name + '-labelInactive'" type="text" v-model="item.labelInactive">
									<label class="active" :for="item.name + '-labelInactive'">Label inactive</label>
								</div>
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
											<div class="middle" v-if="item.values.length > 2">
												<i class="mdi mdi-close" @click.stop="removeOption(item.values, index)"></i>
											</div>
										</div>
									</li>
								</draggable>
								<div class="row">
									<a class="btn right waves-effect vue-green" @click.stop="addOption(item.values)">Add option</a>
								</div>
							</div>
						</div>
					</li>
				</draggable>
			</div>
		</div>

		<input type="hidden" name="inputs" :value="listString">

<!-- 		<div class="row">
			<div class="col s12 grey lighten-4">
				<pre>{{listString}}</pre>
			</div>
		</div>

		<div id="preview" class="modal">
			<div class="modal-content">
				<h4>Preview:</h4>
				<vue-form-render :schema="formItems"></vue-form-render>
			</div>
		</div> -->
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	import VueFormRender from './VueFormRender.vue'

	export default {
		name: 'vue-form',
		components: { draggable, VueFormRender },
		data () {
			return {
				components: [
				{
					label: "Checkbox",
					type: "checkbox"
				},
				{
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
					label: "Text field",
					type: "text",
				},
				{
					label: "Textarea",
					type: "textarea"
				},
				{
					label: 'Select',
					type: 'select',
					multiple: false,
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
					label: "File input",
					type: "file",
					multiple: false
				},
				{
					label: "Date field",
					type: "date",
				},
				{
					label: "Switch field",
					type: "switch",
					labelActive: 'Active',
					labelInactive: 'Inactive'
				},
				{
					label: "Range Field",
					type: "range",
					values: {
						min:0,
						max:100
					}
				},
				],
				formItems:[],
				optionType: [
				{
					label: "Text",
					value: "text",
				},
				{
					label: "Email",
					value: "email",
				},
				{
					label: "Password",
					value: "password",
				},
				],
				icons:{
					'checkbox': "mdi mdi-checkbox-marked-outline",
					'checkbox-group': "mdi mdi-checkbox-multiple-marked-outline",
					'radio-group': "mdi mdi-checkbox-multiple-marked-circle-outline",
					'text': "mdi mdi-textbox",
					'textarea': "mdi mdi-file-document-box",
					'select': 'mdi mdi-menu',
					'file': "mdi mdi-file",
					'date': "mdi mdi-calendar",
					'switch': "mdi mdi-toggle-switch",
					'range': "mdi mdi-ray-vertex"
				},
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
					label: "Option "+ Date.now(),
					value: "option-"+ Date.now()
				})
			},
			removeOption (values, index) {
				values.splice(index, 1)
			},
			clearItems () {
				this.formItems =[];
			},
			getIcon(type) {
				return this.icons[type];
			},
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
				return JSON.stringify(this.formItems);
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

<style>
	.vue-green {
		background: #41b883 !important;
	}

	.mdi {
		font-size: 1.4em;
	}

	.mdi-pin, .mdi-pin-off, .mdi-close {
		cursor: pointer;
	}

	.mdi:before {
		vertical-align: bottom;
	}

	.collection-item {
		cursor: move;
	}

	.dropArea {
		position: relative;
		background: #f5f5f5;
		min-height: 440px;
		padding: 10px 0;
	}

	.dropArea.empty {
		opacity: 0.5;
		border: 1px dashed black;
		border-width: 3px;
		box-shadow: none;
	}

	.dropArea.empty:after {
		content: attr(data-content);
		position: absolute;
		text-align: center;
		top: 50%;
		left: 0;
		width: 100%;
	}

	.collapsible-header {
		width: 100%;
	}

	.collapsible-body {
		padding: 1rem 2rem !important;
		width: 100%;
		background: #fff;
	}

	.middle {
		height: 56px;
		line-height: 56px;
		text-align: center
	}

	.no-margin-bot {
		margin-bottom: 0 !important;

	}

	input {
		margin-bottom: 5px !important;
	}

	.sortable-ghost {
		opacity: 0;
	}
</style>
