/**
 * 小程序web-view跳转h5拦截器，配合小程序做错误处理，跳转小程序路由页面以及鉴权设置
 */
import axios from 'axios'
import queryString from 'query-string'
import jarvis from '@parent/jarvis'
import appVersion from './_app_version.js'
import {ParentBridge} from 'vk-hybrid'
require('../lib/gt.js')
window.wx = require('../lib/jweixin-1.3.2.js')
const qs = queryString.parse(window.location.search)
const VKWXTOKEN = 'vkWxToken'
const cookies = require('cookies-js')
let comeFromMP = Boolean(qs[VKWXTOKEN])
axios.interceptors.request.use(function(config) {
  let cookie_auth = comeFromMP ? decodeURI(qs[VKWXTOKEN] || '') : cookies.get('Authorization')
  if (cookie_auth) {
    config.headers['Authorization'] = cookie_auth.replace(/"/g, '')
  }
  if (!comeFromMP) {
    let cookie_session = cookies.get('vk_session_id')
    config.headers['vk-session-id'] = cookie_session
  }
  if (config.method == 'get') {
    !config.params && (config.params = {})
    config.params['_t'] = new Date().getTime()
  }
  return config
})
axios.interceptors.response.use( response => {
  return response
}, error => {
  if (error.response && error.response.status === 401) {
    if (comeFromMP) {
      window.wx.miniProgram.navigateTo({url: '/pages/index/index'})
    } else {
      let advertisementAc = qs.advertisementAc || ''
      if (advertisementAc) {
        // 添加渠道支持
        window.location.href = `/login?redirect_uri=${encodeURIComponent(window.location.href)}&ac=${advertisementAc}`
      } else {
        window.location.href = `/login?redirect_uri=${encodeURIComponent(window.location.href)}`
      }
    }
  } else if (error.response && error.response.status === 402) {
    return new Promise( (resolve, reject) => {
      // 续约
      jarvis.renewal('mobile', '10001').then(() => {
        error.response.config.headers['Authorization'] = jarvis.authorization.get('mobile').Authorization
        // 重新发起请求
        axios.request(error.response.config)
          .then(res => {
            resolve(res)
          })
          .catch(errInfo => {
            reject(errInfo)
          })
      }).catch(() => {
        //续约失败跳转登录
        if (appVersion.isApp) {
          ParentBridge.userLogin({
            phone: '',
            loginType: 'pwd'
          }).then(data => {
            if (data && data.data && data.data.state == 'success') {
              window.location.reload()
            } else {
              ParentBridge.userLogout({
                phone: '',
                loginType: 'pwd'
              })
            }
          }).catch(() => {
            ParentBridge.userLogout({
              phone: '',
              loginType: 'pwd'
            })
          })
          return
        } else {
          if (comeFromMP) {
            window.wx.miniProgram.navigateTo({url: '/pages/index/index'})
          } else {
            let advertisementAc = qs.advertisementAc || ''
            if (advertisementAc) {
              window.location.href = `/login?redirect_uri=${encodeURIComponent(window.location.href)}&ac=${advertisementAc}`
            } else {
              window.location.href = `/login?redirect_uri=${encodeURIComponent(window.location.href)}`
            }
          }
          return
        }
      })
    })
  } else if (error.response && error.response.status === 410) {
    let res = error.response.headers
    return new Promise((resolve, reject) => {
      window.initGeetest({
        gt: res['vk-gt'],
        challenge: res['vk-gt-challenge'],
        offline: !res['vk-gt-initsuccess'], //false
        new_captcha: !res['vk-gt-newcaptcha'], //false
        product: 'bind',
        width: '280px'
      }, captchaObj => {
        captchaObj.onReady(() => {
          captchaObj.verify()
        }).onSuccess(() => {
          let result = captchaObj.getValidate()
          let nowConfig = error.response.config
          error.response.config.headers['vk-gt-challenge'] = result.geetest_challenge
          error.response.config.headers['vk-gt-validate'] = result.geetest_validate
          error.response.config.headers['vk-gt-seccode'] = result.geetest_seccode
          error.response.config.headers['vk-gt-type'] = 2
          if (nowConfig.method == 'get') {
            !nowConfig.params && (nowConfig.params = {})
            nowConfig.params[nowConfig.params.t ? 't' : '_t'] = new Date().getTime()
          }
          axios.request(error.response.config)
            .then(res => {
              resolve(res)
            })
            .catch(err => {
              reject(err)
            })
        }).onError(() => {
          window.location.reload()
        }).onClose(() => {
          reject({
            response: {//只有点击触发极验的时候需要 用来恢复可以点击的状态
              data: {
                msg: 'VFE_Geetest_Close'
              }
            }
          })
        })
      })
    })
  } else {
    return Promise.reject(error)
  }
})
export default axios
