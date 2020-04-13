import axios from 'axios'
import {apiDomain} from '../config'

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
}
export default {
  desconnect_session () {
    return new Promise((resolve, reject) => {
      axios.post(apiDomain + '/auth/logout', {}, axiosConfig)
        .then((response) => {
          var result = response.status;
          resolve(result)
        })
        .catch((error) => {
          reject(new Error(error));
        })

    })
  },
  logout () {
    this.clearStorage();
  },
  clearStorage () {
    localStorage.removeItem('access_token');
    localStorage.removeItem('full_name');
    localStorage.removeItem('user_id');
  },
  isLoguedIn () {
    return !!localStorage.getItem('access_token');
  },
  login (email, password) {
    return new Promise((resolve, reject) => {
      axios.post(apiDomain + '/api-token-auth/', {email: email, password: password}, axiosConfig)
        .then((response) => {
          var loggResp = '';
          console.log(response)
          if (response.status === 200) {
            localStorage.setItem('access_token', response.data.token);
            //localStorage.setItem('user_id', checkData.user_id);
            localStorage.setItem('full_name', email)
            loggResp = ['success', 'Login Exitoso']
            resolve(loggResp);
          } else {
            console.log('fail');
            loggResp = ['failed', 'Login fallido']
            resolve(loggResp);
          }
        })
        .catch((error) => {
          reject(new Error(error));
        })
    })
  },
  getUser (user) {
    return new Promise((resolve, reject) => {
      axios.post(apiDomain + '/forgot_password/', {email: user}, { headers: {
				'Content-Type': 'application/json' }})
        .then((response) => {
          var loggResp = '';
          if (response.data.status === 'success') {
            loggResp = ['success', response.data.message, response.data.message1];
            resolve(loggResp);
          } else {
            loggResp = ['warning', response.data.message, response.data.message1];
            resolve(loggResp);
          }
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
}
