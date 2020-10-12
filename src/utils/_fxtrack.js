const sa = require('sa-sdk-javascript')
// const CONFIG = require('../../vf2e.config.js')
// import F from '../lib/F.js'
// 初始化神策配置
import cookies from 'cookies-js'
sa.init({
  server_url: 'https://sensorsdata.vipkid.com.cn/sa?project=BEES',
  name: 'sa',
  show_log: false
})

let account_id = ''

// 设置全局打点配置
function init(id) {
  account_id = id + ''
}
// const senseEnv = CONFIG.sensors.indexOf('project=BEES') > -1 ? 'PROD' : 'TEST'

function arrMatch(arr, str) {
  arr.some((item) => {
    if (str.indexOf(item) != -1) {
      return true
    } else {
      return false
    }
  })
}

function checkPlatform() {
  let ua = navigator.userAgent
  let isApp = cookies.get('isFromApp')
  let phones = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'mobile']
  let isPhone = arrMatch(phones, ua)
  let pads = ['iPad', 'iPod', 'pad']
  let isPad = arrMatch(pads, ua)
  if (isApp && isPhone) {
    return 'phone_app'
  } else if (isPad && isApp) {
    return 'pad_app'
  } else {
    return 'h5'
  }
}

function takeAccountId() {
  return cookies.get('Global') || cookies.get('user') || cookies.get('accountId') || 0
}

function getRegObj() {
  let channelId = cookies.get('user-channel') || ''
  let channelCode = cookies.get('user-channel-code') || ''
  return {
    product: 'bees',
    business: 'bees',
    platform: checkPlatform(),
    uid: takeAccountId(),
    channel_id: channelId,
    channel_code: channelCode,
    $referrer: document.referrer,
    $ua: navigator.userAgent,
    $url: location.href
  }
}

function click(clickId, obj, callbak) {
  var logname = 'vipfx_click'
  var logValue = Object.assign({ 'click_id': clickId }, getRegObj())
  obj && (logValue = Object.assign(logValue, obj))
  if (callbak) {
    sa.track(logname, logValue, callbak)
  } else {
    sa.track(logname, logValue)

  }
}

function trigger(triggerId, obj, callbak) {
  var logname = 'vipfx_trigger'
  var logValue = Object.assign({ 'trigger_id': triggerId }, getRegObj())
  obj && (logValue = Object.assign(logValue, obj))
  if (callbak) {
    sa.track(logname, logValue, callbak)
  } else {
    sa.track(logname, logValue)
  }
}
function trigger_interface_error(triggerId, obj, callbak) {
  var logname = 'vipfx_trigger_interface_error'
  var logValue = Object.assign({ 'trigger_id': triggerId }, getRegObj())
  obj && (logValue = Object.assign(logValue, obj))
  if (callbak) {
    sa.track(logname, logValue, callbak)
  } else {
    sa.track(logname, logValue)
  }
}
function trigger_interface_business_error(triggerId, obj, callbak) {
  var logname = 'vipfx_trigger_interface_business_error'
  var logValue = Object.assign({ 'trigger_id': triggerId }, getRegObj())
  obj && (logValue = Object.assign(logValue, obj))
  if (callbak) {
    sa.track(logname, logValue, callbak)
  } else {
    sa.track(logname, logValue)
  }
}

function pageview() {
  sa.track('$pageview', getRegObj())
}

init('')

function felog(obj) {
  sa.track('felog', {
    ...obj,
    log_id: account_id
  })
}

export default {
  felog: felog,
  click: click,
  trigger: trigger,
  trigger_interface_error: trigger_interface_error,
  trigger_interface_business_error: trigger_interface_business_error,
  pageview: pageview,
  init: init,
  // senseEnv: senseEnv
}

