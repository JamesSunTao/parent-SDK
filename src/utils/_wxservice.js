import axios from 'axios'
import '../lib/jweixin-1.3.2.js'
function isInWechat() {
  var ua = navigator.userAgent
  return /MicroMessenger/i.test(ua)
}

function wxready() {

  var jsApiList = [
    'onMenuShareTimeline',    //朋友圈分享
    'onMenuShareAppMessage',  //分享到朋友
    'chooseImage',            //选择照片
    'uploadImage',            //上传照片
    'downloadImage',          //下载照片
    'previewImage'            //预览照片
  ]
  var register = function(config, resolve, reject) {
    window.wx.config({
      debug: false,
      appId: config.appId,
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      signature: config.signature,
      jsApiList: jsApiList
    })

    window.wx.ready(function() {
      resolve(config)
    })

    window.wx.error(function(error) {
      reject(error)
    })
  }

  var fetchConfig = function(resolve, reject) {
    axios.get('/rest/wechat/api/wechat/getConfig', {
      params: {
        url: encodeURIComponent(location.href)
      }
    })
      .then((res) => {
        if (res.data.result === 0) {
          let config = res.data.data
          if (!config.jsApiList) config['jsApiList'] = jsApiList
          resolve(config)
        } else {
          reject(res)
        }
      })
      .catch((error) => {
        reject(error.response)
      })
  }

  return new Promise(function(resolve, reject) {
    //先去获取配置信息
    fetchConfig(resolve, reject)
  }).then(function(config) {
    //验证配置字段信息
    return new Promise(function(resolve, reject) {
      register(config, resolve, reject)
    })
  })
    .catch((err) => {
      // 失败流程
      window.console.log(err)
    })
}

export default {
  isInWechat,
  wxready
}
