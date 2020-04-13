<template>
	<div class="animated fadeIn">
		<div class="card">
			<div class="card-header">
		        <i class="icon-people"></i> Lista de Clientes
		    </div>
		    <div class="card-body">
		    	<div class="row">		    		
			        <div class="col-md-6">
			            <b-button variant="primary" class="active mt-3 btn-pill" :disabled="clienteSelected" @click="addCliente()"> <i class="fa fa-plus" ></i> Agregar</b-button>
			            <b-button variant="primary" @click="limpiarForm()"class="active mt-3 btn-pill" :disabled="!clienteSelected"> <i class="fa fa-eraser"></i> Limpiar</b-button>
			            <b-button variant="primary" @click="editCliente()" class="active mt-3 btn-pill" :disabled="!clienteSelected"> <i class="fa fa-edit"></i> Modificar</b-button>
			            <b-button variant="primary" @click="deleteCliente()" class="active mt-3 btn-pill" :disabled="!clienteSelected"> <i class="fa fa-trash"></i> Eliminar</b-button>
			        </div>
		    		<div class="col-md-6">
			        	<h2 class="pull-right">Clientes</h2>            
			        </div>
			    </div>
			    <br>
			    <b-row>
		          <b-col md="6" >
		          	<b-form>
		          		<b-form-group
			              label="Correo"
			              label-for="horizEmail"
			              :label-cols="2"
			              :horizontal="true">
			              <b-form-input id="horizEmail" v-model="clienteData.email" size="sm"type="text" placeholder="Ingrese correo" autocomplete="email email"></b-form-input>
			            </b-form-group>
			            <b-form-group
			              label="Nombre"
			              label-for="horizEmail"
			              :label-cols="2"
			              :horizontal="true">
			              <b-form-input id="horizEmail" v-model="clienteData.first_name" size="sm"type="text" placeholder="Ingrese nombre" autocomplete="name email"></b-form-input>
			            </b-form-group>
			            <b-form-group
			              label="Apellido"
			              label-for="horizPass"
			              :label-cols="2"
			              :horizontal="true">
			              <b-form-input id="horizPass" v-model="clienteData.last_name" size="sm"type="text" placeholder="Ingrese apellido" autocomplete=""></b-form-input>
			            </b-form-group>
			            <!--b-form-group
			              label="Telefono"
			              label-for="horizPass"
			              :label-cols="2"
			              :horizontal="true">
			              <b-form-input id="horizPass" v-model="clienteData.telefono" size="sm"type="text" placeholder="Ingrese telefono" autocomplete=""></b-form-input>
			            </b-form-group>
			            <b-form-group
			              label="Direccion"
			              label-for="horizPass"
			              :label-cols="2"
			              :horizontal="true">
			              <b-form-input id="basicTextarea" size="sm" v-model="clienteData.direccion" :textarea="true" :rows="9" placeholder="Ingrese descripcion"></b-form-input-->
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
	import clientes_services from './clientes_services'
	var items = []
	export default {
		name: 'Clientes',
		created: function () {
	      this.getAll()
	    },
		data () {
			return {
				clienteData: {
					id: '',
					first_name: '',
					last_name: '',
					email: '',
					status: '',
					created_at: '',
					updated_at: ''
				},
				clienteSelected: false,
				items: items,
				loadingData: true,
				currentPage: 1,
		        perPage: 5,
		        totalRows: items.length,
		        pageOptions: [ 5, 10, 20, 50,100, 500 ],
		        sortBy: null,
		        sortDesc: false,
		        fieldsTh: [
		          { key: 'id', label: 'Pk_Id', sortable: true },
		          { key: 'email', label: 'email', sortable: true },
		          { key: 'first_name', label: 'Correo', sortable: true },
		          { key: 'last_name', label: 'Apellido'},
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
		        clientes_services.getAll()
		          .then(data => {
		            this.items = data[1]
		            this.loadingData = false
		          })
		          .catch(error => {
		           	this.showAlert('Error', 'Server not response. ' + error, 'error')
		            this.loadingData = false
		          })
		    },
		    limpiarForm () {
		    	this.clienteData.id = '';
		    	this.clienteData.first_name = '';
		    	this.clienteData.last_name = '';
		    	this.clienteData.email = '';
		    	this.clienteSelected = false;
		    },
		    addCliente () {
		    	if (this.clienteData.email == '' || this.clienteData.first_name == '' || this.clienteData.last_name == '') {
		    		this.showAlert('Atencion', 'Datos incompletos', 'warning')
		    	} else {
		    		let dataInsert= {
		    			first_name: this.clienteData.first_name,
						last_name: this.clienteData.last_name,
						email: this.clienteData.email,
						status: 1,
						created_at: '',
						updated_at: ''
		    		}
		    		clientes_services.save( dataInsert )
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
		    editCliente () {
		    	if (this.clienteData.id == '' || this.clienteData.email == '' || this.clienteData.first_name == '' || this.clienteData.last_name == '') {
		    		this.showAlert('Atencion', 'Datos incompletos', 'warning')
		    	} else {
		    		let dataEdit = {
		    			first_name: this.clienteData.first_name,
						last_name: this.clienteData.last_name,
						email: this.clienteData.email,
						updated_at: ''
		    		}
		    		clientes_services.update(this.clienteData.id, this.clienteData)
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
		    deleteCliente () {
		    	if (this.clienteData.id == '') {
		    		this.showAlert('Atencion', 'Seleccione un cliente', 'warning')
		    	} else {
		    		clientes_services.delete(this.clienteData.id)
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
		    	this.clienteData.id = row.id;
		    	this.clienteData.first_name = row.first_name;
		    	this.clienteData.last_name = row.last_name;
		    	this.clienteData.email = row.email;
		    	//this.clienteData.telefono = row.telefono;
		    	//this.clienteData.direccion = row.direccion;
		    	this.clienteSelected = true;
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