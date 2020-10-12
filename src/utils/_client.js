const cookies = require('cookies-js')

function getClient() {
  let userAgent = navigator.userAgent
  let isIphone = /iPhone/i.test(userAgent)
  let isAndroid = /Android/i.test(userAgent)
  let isWechat = /micromessenger/i.test(userAgent)
  let appEnv = null
  let appVer = ''
  let isApp = !!cookies.get('isFromApp')
  if (isApp) {
    try {
      appEnv = JSON.parse(cookies.get('appEnv'))
      appVer = appEnv ? '_' + appEnv.vn : ''
    } catch (e) {
      // appEnv parse 失败
    }
  }

  return {
    platform: isIphone ? 'iPhone' : isAndroid ? 'Android' : 'Other',
    client: isApp ? 'App' + appVer : isWechat ? 'Wechat' : 'Other'
  }
}

export default getClient()

