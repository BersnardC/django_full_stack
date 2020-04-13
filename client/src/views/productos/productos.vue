<template>
	<div class="animated fadeIn">
		<div class="card">
			<div class="card-header">
		        <i class="fa fa-users"></i> Lista de Productos
		    </div>
		    <div class="card-body">
		    	<div class="row">		    		
			        <div class="col-md-6">
			            <b-button variant="primary" class="active mt-3 btn-pill" :disabled="productSelected" @click="addProduct()"> <i class="fa fa-plus"></i> Agregar</b-button>
			            <b-button variant="primary" @click="limpiarForm()"class="active mt-3 btn-pill" :disabled="!productSelected"> <i class="fa fa-eraser"></i> Limpiar</b-button>
			            <b-button variant="primary" class="active mt-3 btn-pill" :disabled="!productSelected" @click="editProduct()"> <i class="fa fa-edit"></i> Modificar</b-button>
			            <b-button variant="primary" class="active mt-3 btn-pill" :disabled="!productSelected" @click="deletedProduct()"> <i class="fa fa-trash"></i> Eliminar</b-button>
			        </div>
		    		<div class="col-md-6">
			        	<h2 class="pull-right">Productos</h2>            
			        </div>
			    </div>
			    <br>
			    <b-row>
		          <b-col md="6" >
		          	<b-form>
			            <b-form-group
			              label="Nombre"
			              label-for="horizEmail"
			              :label-cols="2"
			              :horizontal="true">
			              <b-form-input id="horizEmail" v-model="productData.name" size="sm"type="email" placeholder="Ingrese nombre" autocomplete="username email"></b-form-input>
			            </b-form-group>
			            <b-form-group
			              label="Codigo"
			              label-for="horizPass"
			              :label-cols="2"
			              :horizontal="true">
			              <b-form-input id="horizPass" v-model="productData.code_product" size="sm"type="text" placeholder="Ingrese codigo" autocomplete=""></b-form-input>
			            </b-form-group>
			            <b-form-group
			              label="Stock"
			              label-for="horizPass"
			              :label-cols="2"
			              :horizontal="true">
			              <b-form-input id="horizPass" v-model="productData.stock" min="0"size="sm"type="number" placeholder="Stock" autocomplete=""></b-form-input>
			            </b-form-group>
			          </b-form>	          
		          </b-col>
			    </b-row>
			    <hr>
			    <b-row>
		        	<b-container fluid>
		        		<!-- Main table element -->
			            <b-row class="justify-content-between">
			              <b-col md="3" class="my-1">
			                  <div class="input-group mb-3">
			                    <div class="input-group-prepend">
			                      <span class="input-group-text" id="basic-addon1">Ver</span>
			                    </div>
			                    <b-select :options="pageOptions" v-model="perPage" />
			                  </div>
			              </b-col>
			              <b-col md="3" class="my-1">
			              </b-col>
			              <b-col md="3" class="my-1">
			              </b-col>
			              <b-col md="3" class="my-1">
			                  <div class="input-group mb-3">
			                    <div class="input-group-prepend">
			                      <span class="input-group-text" id="basic-addon1">Buscar</span>
			                      <b-form-input v-model="filter"class="pull-right" placeholder="Ingrese..." />
			                    </div>
			                  </div>
			                </b-form-group>
			              </b-col>
			            </b-row>
		        		<b-row v-if="loadingData">
			              <b-col cols="12" sm="12" md="12" lg="12">
			                 <p class="text-center">
			                   <i class="fa fa-refresh fa-lg mt-4 fa-spin"></i><br>Cargando...
			                 </p>
			              </b-col>
			            </b-row>
			            <b-table class="animated fadeIn" small v-else hover bordered 			show-empty
                     		stacked="md"
                     		:items="items"
                     		:fields="fieldsTh"
                     		:current-page="currentPage"
                     		:per-page="perPage"
                     		:filter="filter"
                     		:sort-by.sync="sortBy"
                     		:sort-desc.sync="sortDesc"
                     		@filtered="onFiltered"
                     		@row-clicked="rowClicked"
            			>		            
            			</b-table>
            			<!-- User Interface controls -->
			            <b-row>          
			              <b-col md="12" class="my-1">
			                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pull-right" />
			              </b-col>            
			            </b-row>

					</b-container>
				</b-row>
		    </div>
		</div>
	</div>
</template>

<script>
	import productos_services from './productos_services'

	var items = [];
	export default {
		name: 'Productos',
		created: function () {
	      this.getAll()
	    },
		data () {
			return {
				productData: {
					id: '',
					name: '',
					code_product: '',
					stock: '',
					created_at: '',
					updated_at: ''
				},
				productSelected: false,
				items: items,
				loadingData: true,
				currentPage: 1,
		        perPage: 10,
		        totalRows: items.length,
		        pageOptions: [ 10, 20, 50 ],
		        sortBy: null,
		        sortDesc: false,
		        fieldsTh: [
		          	{ key: 'id', label: 'Id', sortable: true },
		          	{ key: 'name', label: 'Nombre', sortable: true },
		          	{ key: 'code_product', label: 'Codigo'},
		        	{ key: 'created_at', label: 'Creado'},
		         	{ key: 'updated_at', label: 'Actualizado'}
		        ],
		        filter: null
			}
		},
		computed: {
	      sortOptions () {
	        // Create an options list from our fields
	        return this.fieldsTh
	          .filter(f => f.sortable)
	          .map(f => { return { text: f.label, value: f.key } })
	      }
	    },
	    methods: {
	    	onFiltered (filteredItems) {
		    	// Trigger pagination to update the number of buttons/pages due to filtering
		    	this.totalRows = filteredItems.length
		    	this.currentPage = 1
		    },
		    reload () {
		        this.getAll()
		    },
		    getAll () {
		        this.loadingData = true
		        productos_services.getAll()
		          .then(data => {
		            this.items = data[1]
		            this.loadingData = false
		          })
		          .catch(error => {
		            this.$swal('Error', 'Server not response. ' + error, 'error')
		            this.loadingData = false
		          })
		    },
		    addProduct() {
		    	if (this.productData.name == '' || this.productData.code_product == '' || this.productData.stock == '') {
		    		this.showAlert('Atencion', 'Datos incompletos', 'warning')
		    	} else {
		    		let dataInsert= {
		    			name: this.productData.name,
						code_product: this.productData.code_product,
						stock: this.productData.stock,
						created_at: '',
						updated_at: ''
		    		}
		    		productos_services.save( dataInsert )
		    			.then(data => {
		    				this.showAlert(data[0], data[1], data[0])
							if (data[0] == 'success') {
								this.limpiarForm()
								this.getAll()								
							}
						})
						.catch(error => {
							this.showAlert('Error', 'Servidor no responde', 'error')
						})
		    	}
		    },
		    editProduct ( item ) {
		    	if (this.productData.id == '' || this.productData.name == '' || this.productData.code_product == '' || this.productData.stock == '') {
		    		this.showAlert('Atencion', 'Datos incompletos', 'warning')
		    	} else {
		    		let dataEdit = {
		    			name: this.productData.name,
						code_product: this.productData.code_product,
						stock: this.productData.stock,
						updated_at: ''
		    		}
		    		productos_services.update(this.productData.id, this.productData)
		    			.then(data => {
		    				this.showAlert(data[0], data[1], data[0])		    				
							if (data[0] == 'success') {
								this.limpiarForm()
								this.getAll()
							}
						})
						.catch(error => {
							this.showAlert('Error', 'Servidor no responde', 'error')
						})
		    	}
		    },
		    deletedProduct ( item ) {
		    	if (this.productData.id == '') {
		    		this.showAlert('Atencion', 'Seleccione un cliente', 'warning')
		    	} else {
		    		productos_services.delete(this.productData.id)
		    		 	.then(data => {
		    				this.showAlert(data[0], data[1], data[0])		    				
							if (data[0] == 'success') {
								this.limpiarForm()
								this.getAll()
							}
						})
						.catch(error => {
							this.showAlert('Error', 'Servidor no responde', 'error')
						})
		    	}
		    },
		    rowClicked(row) {
		    	this.productData.id = row.id;
		    	this.productData.name = row.name;
		    	this.productData.code_product = row.code_product;
		    	this.productData.stock = row.stock;
		    	this.productSelected = true;
			},
			limpiarForm () {
		    	this.productData.id = '';
		    	this.productData.name = '';
		    	this.productData.code_product = '';
		    	this.productData.stock = '';
		    	this.productSelected = false;
		    },
		    showAlert (title, message, type) {
				this.$message({
		          showClose: true,
		          message: title + '. ' + message,
		          type: type
		        });
			}
	    }
	}
</script>
<style>
  form .form-group{
    margin-bottom: 0 !important;
  }
  .table tbody tr:hover {
    background-color: rgb(222, 225, 229);
    color: #030303;
    cursor: pointer;
  }
  .table td {
    padding: 3px !important;
  }
</style>