<template>
	<div>
		<div class="row">
			<div  class="col m4">
				<draggable element="ul" :list="components" class="collection dragArea" :options="componentsOptions">
					<li v-for="component in components" class="collection-item">
						<i :class="component.icon"></i> {{component.label}}
					</li>
				</draggable>
			</div>

			<div  class="col m8">
				<draggable element="ul" :list="formItems" class="collection dropArea" :options="formOptions" :move="onMove" @start="isDragging=true" @end="isDragging=false">
					<li v-for="item in formItems" class="collection-item">
						<i :class="item.icon"></i>{{item.label}}<i :class="item.fixed? 'mdi mdi-pin right' : 'mdi mdi-pin-off right'" @click=" item.fixed=! item.fixed" aria-hidden="true"></i> 
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
		components: {
			draggable,
		},
		data () {
			return {
				components: [
				{
					label: "Checkbox",
					type: "checkbox",
					fixed: false,
					icon: "mdi mdi-checkbox-marked-outline"
				},
				{
					label: "Checkbox group",
					type: "checkbox-group",
					fixed: false,
					icon: "mdi mdi-checkbox-multiple-marked-outline"
				},
				{
					label: "Radio group",
					type: "radio-group",
					fixed: false,
					icon: "mdi mdi-checkbox-multiple-marked-circle-outline"
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
	}
</style>
