import axios from './_vkaxios.js'
import jarvis from '@parent/jarvis'
function getRequest(url) {
  return (params) => {
    params.studentId = params.studentId ? params.studentId : (jarvis.authorization.get('mobile').studentId || '')
    return new Promise((resolve, reject) => {
      axios.get(`/rest/gw/${url}`, {
        params: params
      }).then(res => {
        if (res.data.code === 0 || res.data.code === 200) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }).catch(err => {
        throw err.status
      })
    })
  }
}
const getConfig = getRequest('parent-portal/api/app/configer/getConfig')
export default getConfig