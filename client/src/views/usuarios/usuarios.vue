<template>
	<div class="animated fadeIn">
		<div class="card">
			<div class="card-header">
		        <i class="fa fa-users"></i> Lista de Usuarios
		    </div>
		    <div class="card-body">
		    	<div class="row">		    		
			        <div class="col-md-6">
			            <b-button variant="primary" class="active mt-3 btn-pill" :disabled="userSelected" @click="addUser()"> <i class="fa fa-plus"></i> Agregar</b-button>
			            <b-button variant="primary" @click="limpiarForm()"class="active mt-3 btn-pill" :disabled="!userSelected"> <i class="fa fa-eraser"></i> Limpiar</b-button>
			            <b-button variant="primary" class="active mt-3 btn-pill" :disabled="!userSelected" @click="editUser()"> <i class="fa fa-edit"></i> Modificar</b-button>
			            <b-button variant="primary" @click="deleteUser()"class="active mt-3 btn-pill" :disabled="!userSelected"> <i class="fa fa-trash"></i> Eliminar</b-button>
			        </div>
		    		<div class="col-md-6">
			        	<h2 class="pull-right">Usuarios</h2>            
			        </div>
			    </div>
			    <br>
			    <b-row>
		          <b-col md="6" >
		          	<b-form>
			            <b-form-group
			              label="Correo"
			              label-for="email"
			              :label-cols="2"
			              :horizontal="true">
			              <b-form-input id="email" v-model="userData.email" size="sm"type="text" placeholder="Ingrese Correo" autocomplete="email"></b-form-input>
			            </b-form-group>
			            <b-form-group
			              label="País"
			              label-for="country"
			              :label-cols="2"
			              :horizontal="true">
			              <b-form-input id="country" v-model="userData.country" size="sm"type="text" placeholder="Ingrese País" autocomplete=""></b-form-input>
			            </b-form-group>
			            <b-form-group
			              label="Clave"
			              label-for="pass"
			              :label-cols="2"
			              :horizontal="true">
						  <b-input-group>
			                  <b-form-input size="sm" v-model="userData.password" placeholder="Ingrese Clave" id="pass" :type="typePass">
			                  </b-form-input>
			                    <b-button size="sm" v-b-popover.hover.top="showPassMessage" @click="showEvent()"variant="primary"><span :class="classPass"></span></b-button>
			              </b-input-group>
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
			            <b-row v-else>
			            	<b-table class="animated fadeIn" small hover bordered 	 show-empty
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
			            </b-row>
            			<!-- User Interface controls -->
			            <b-row>          
			              <b-col md="12" class="my-1">
			                <b-pagination size="sm" :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0 pull-right" />
			              </b-col>            
			            </b-row>

					</b-container>
				</b-row>
		    </div>
		</div>
	</div>
</template>

<script>
	import usuarios_services from './usuarios_services'

	var items = []
	export default {
		name: 'Usuarios',
		created: function () {
	      this.getAll()
	    },
		data () {
			return {
				userData: {
					id: '',
					country: '',
					email: '',
					token: '',
					status: '',
					password: '',
				},
				userSelected: false,
				items: items,
				loadingData: true,
				currentPage: 1,
		        perPage: 10,
		        totalRows: items.length,
		        classPass: 'fa fa-eye',
		        typePass: 'password',
		        showPassMessage: 'Ver clave',
		        showPass: false,
		        pageOptions: [ 5,10, 20, 50,100, 500 ],
		        sortBy: null,
		        sortDesc: false,
		        fieldsTh: [
		          { key: 'id', label: 'ID', sortable: true },
		          { key: 'email', label: 'email', sortable: true },
		          { key: 'country', label: 'País'},
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
		        this.items = items // borrar esto - solo es ejemplo
		        usuarios_services.getAll()
		          .then(data => {
		            if (data[0] == 'success') {
		            	this.items = data[1]
		            	this.loadingData = false
		            } else {
		            	this.showAlert('Error', data[1], 'error')
		            	this.loadingData = false
		            }
		          })
		          .catch(error => {
		            this.showAlert('Error', 'Servidor no responde. ' + error, 'error')
		            this.loadingData = false
		          })
		    },
		    addUser () {
		    	if (this.userData.email == '' || this.userData.country == '' || this.userData.password == '') {
		    		this.showAlert('Atencion', 'Datos incompletos', 'warning')
		    	} else {
		    		let dataUser = {
		    			email : this.userData.email,
		    			country : this.userData.country,
		    			password : this.userData.password,
		    		}
		    		usuarios_services.save(dataUser)
		    			.then(data => {
		    				this.showAlert(data[0], data[1], data[0])
		    				this.limpiarForm()
							if (data[0] == 'success') {
								this.getAll()
							}
						})
						.catch(error => {
							this.showAlert('Error', 'Servidor no responde', 'error')
						})
		    	}
		    },
		    editUser () {
		    	if (this.userData.id == '' || this.userData.email == '' || this.userData.password == '') {
		    		this.showAlert('Atencion', 'Datos incompletos', 'warning')
		    	} else {
		    		let dataUser = {
		    			email : this.userData.email,
		    			country : this.userData.country,
		    			password : this.userData.password
		    		}
		    		usuarios_services.update(this.userData.id, dataUser)
		    			.then(data => {
		    				this.showAlert(data[0], data[1], data[0])
		    				this.limpiarForm()
							if (data[0] == 'success') {
								this.getAll()
							}
						})
						.catch(error => {
							this.showAlert('Error', 'Servidor no responde', 'error')
						})
		    	}
		    },
		    deleteUser () {
		    	if (this.userData.id == '') {
		    		this.showAlert('Atencion', 'Seleccione un usuario a borrar', 'warning')
		    	} else {
		    		usuarios_services.delete(this.userData.id)
		    			.then(data => {
		    				this.showAlert(data[0], data[1], data[0])
		    				this.limpiarForm()
							if (data[0] == 'success') {
								this.getAll()
							}
						})
						.catch(error => {
							this.showAlert('Error', 'Servidor no responde', 'error')
						})
		    	}
		    },
		    rowClicked(row) {
		    	this.userData.id = row.id;
		    	this.userData.country = row.country;
		    	this.userData.email = row.email;
		    	this.userSelected = true;
			},
			limpiarForm() {
				this.userData.id = '';
				this.userData.country = '';
				this.userData.email = ''
				this.userData.password = ''
				this.userSelected = false;
			},
			showAlert (title, message, type) {
				this.$message({
		          showClose: true,
		          message: title + '. ' + message,
		          type: type
		        });
			},
			showEvent () {
				if (this.showPass) {
					this.typePass = 'password'
					this.classPass = 'fa fa-eye'
					this.showPassMessage = 'Ver clave',
					this.showPass = false
				} else {
					this.typePass = 'text'
					this.classPass = 'fa fa-eye-slash'
					this.showPassMessage = 'Ocultar clave'
					this.showPass = true
				}
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