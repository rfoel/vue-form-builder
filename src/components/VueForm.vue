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
					<li v-for="item in formItems">
						<div class="collapsible-header">
							<i :class="item.icon"></i>{{item.label}}
							<div class="right">
								<i :class="item.fixed? 'mdi mdi-pin' : 'mdi mdi-pin-off'" @click.stop="item.fixed = !item.fixed" aria-hidden="true"></i>
								<i class="mdi mdi-delete" @click.stop="destroy(item)" aria-hidden="true"></i>
							</div>
						</div>
						<div class="collapsible-body">
							<input type="checkbox" :id="item.name + '-required'" :checked="item.required" @click.stop="item.required = !item.required"  />
							<label :for="item.name + '-required'" :checked="item.required">Required</label>
							<br>
							<br>
							<div class="input-field">
								<input :id="item.name + '-label'" type="text" v-model="item.label">
								<label class="active" :for="item.name + '-label'">Label</label>
							</div>
							<div class="input-field">
								<input :id="item.name + '-name'" type="text" v-model="item.name">
								<label class="active" :for="item.name + '-name'">Name</label>
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
					type: "checkbox-group"
				},
				{
					icon: "mdi mdi-checkbox-multiple-marked-circle-outline",
					label: "Radio group",
					type: "radio-group"
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

				return input
			},
			destroy (item) {
				console.log(item);
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

<style>
	.mdi {
		font-size: 1.4em;
		vertical-align: bottom;
	}

	.collection-item {
		cursor: move;
	}

	.mdi-pin, .mdi-pin-off{
		cursor: pointer;
	}

	.dropArea {
		background: #f5f5f5;
		min-height: 100px;
		padding: 10px 0;
	}

	.collapsible-header {
		width: 100%;
	}

	.collapsible-body {
		width: 100%;
		background: #fff;
	}
</style>
