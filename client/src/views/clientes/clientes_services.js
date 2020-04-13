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
			axios.get(apiDomain + '/clients', { headers: {
				'Content-Type': 'application/json',
    			'token': localStorage.getItem('access_token')
			}})
				.then((response) => {
		          	if (response.data.status === 'success') {
						var data = [response.data.status, response.data.data]
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
	getBy ( idCliente ) {
		return new Promise((resolve, reject) => {
			axios.get(apiDomain + '/clients' + idCliente + '/', { headers: {
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
	save ( dataCliente ) {
		return new Promise((resolve, reject) => {
			axios.post(apiDomain + '/clients/create', dataCliente, { headers: {
				'Content-Type': 'application/json',
			    'token': localStorage.getItem('access_token')
			}})
				.then((response) => {
					var data = [response.data.status, response.data.message]
					resolve(data)
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	update ( idCliente, dataCliente ) {
		return new Promise((resolve, reject) => {
			axios.put(apiDomain + '/clients/u/' + idCliente , dataCliente, { headers: {
				'Content-Type': 'application/json',
			    'token': localStorage.getItem('access_token')
			}})
				.then((response) => {
					var data = [response.data.status, response.data.message]
					resolve(data)
				})
				.catch((error) => {
					reject(error)
				})
		})
	},
	delete ( idCliente ) {
		return new Promise((resolve, reject) => {
			axios.delete(apiDomain + '/clients/d/' + idCliente, { headers: {
				'Content-Type': 'application/json',
			    'token': localStorage.getItem('access_token')
			}})
				.then((response) => {
					var data = [response.data.status, response.data.message]
					resolve(data)
				})
				.catch((error) => {
					reject(error)
				})
		})
	}
}