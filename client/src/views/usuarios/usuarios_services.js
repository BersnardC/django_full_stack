import axios from 'axios'
import {apiDomain} from '../../config'

let axiosConfigRequest = {
  headers: {
    'Content-Type': 'application/json',
    'token': localStorage.getItem('access_token')
  }
}

export default {
	getAll (){
		return new Promise((resolve, reject) => {
			axios.get(apiDomain + '/users', {headers: {
			    'Content-Type': 'application/json',
			    'Authorization': 'JWT '+localStorage.getItem('access_token')
			  }})
				.then((response) => {
					//console.log(response)
		          	if (response.status === 200) {
						var data = ['success', response.data]
						resolve(data)
					} else {
						var data = ['error', 'Error con el servidor']
						resolve(data)
					}
		        })
		        .catch((error) => {
		          	reject(error)
		        })
		})
	},
	getBy ( idUser ) {
		return new Promise((resolve, reject) => {
			axios.get(apiDomain + '/users' + idUser + '/', { headers: {
				'Content-Type': 'application/json',
    			'token': localStorage.getItem('access_token')
			}})
				.then((response) => {					
					if (response.data.status === 'success') {
						var data = [response.data.status, response.data.truck, response.data.update_data, response.data.role, response.data.company_id]
						resolve(data)
					} else {
						var data = [response.data.status, response.data.message]
						resolve(data)
					}
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	save ( dataUser ) {
		return new Promise((resolve, reject) => {
			axios.post(apiDomain + '/users/', dataUser, { headers: {
				'Content-Type': 'application/json',
			    'Authorization': 'JWT '+localStorage.getItem('access_token')
			}})
				.then((response) => {
					console.log(response)
					var data = ['success', 'Usuario registrado']
					resolve(data)
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	update ( idUser, dataUser ) {
		return new Promise((resolve, reject) => {
			axios.put(apiDomain + '/users/' + idUser + '/' , dataUser, { headers: {
				'Content-Type': 'application/json',
			    'Authorization': 'JWT '+localStorage.getItem('access_token')
			}})
				.then((response) => {
					var data = ['success', 'Registro Actualizado']
					resolve(data)
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	delete ( idUser ) {
		return new Promise((resolve, reject) => {
			axios.delete(apiDomain + '/users/' + idUser + '/', { headers: {
				'Content-Type': 'application/json',
			    'Authorization': 'JWT '+localStorage.getItem('access_token')
			}})
				.then((response) => {
					var data = ['success', 'Registro eliminado']
					resolve(data)
				})
				.catch((error) => {
					reject(error)
				})
		})
	}
}