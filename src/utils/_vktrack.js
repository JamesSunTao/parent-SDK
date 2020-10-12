import appVersion from './_app_version.js'
import vktrack from '../lib/vk-track.js'
const BRIDGE_API_VERSION = '2.7.0' // 开始支持track打点的app版本
import { ParentBridge } from 'vk-hybrid'
const versionCheck = appVersion.appVersionCompare(BRIDGE_API_VERSION)
const cookies = require('cookies-js')
const CONFIG = require('../../../vf2e.config.js')
const isFastApp = appVersion.isFastApp
function isFromApp() {
  return cookies.get('isFromApp') === '1'
}
vktrack.toolDebug = window.location.protocol !== 'https:'
vktrack.init({
  server_url: CONFIG.sensors,
  show_log: vktrack.toolDebug
})
vktrack.register({
  business: 'parent_h5',
  product: isFastApp ? 'parent-fast' : 'parent',
  parent_id: cookies.get('mbparentid') || '',
  student_id: cookies.get('mbstudentid') || '',
  vk_session_id: cookies.get('vk_session_id') || ''
})
if (isFromApp()) {
  if (versionCheck) {
    ParentBridge.trackPageview({
      pageName: window.location,
      event: 'enter',
      params: ''
    })
  }
}

function click(clickId, obj) {
  vktrack.click(clickId, obj)
  let logValue = {'click_id': clickId}
  if (obj) {
    logValue = Object.assign(logValue, obj)
  }
  if (isFromApp()) {
    if (versionCheck) {
      ParentBridge.trackClick({
        clickId: clickId,
        params: logValue
      })
    }
  }
}

function trigger(triggerId, obj) {
  vktrack.trigger(triggerId, obj)
  let logValue = {'trigger_id': triggerId}
  if (obj) {
    logValue = Object.assign(logValue, obj)
  }
  if (isFromApp()) {
    if (versionCheck) {
      ParentBridge.trackTrigger({
        triggerId: triggerId,
        params: logValue
      })
    }
  }
}

function appClick(clickId, obj) {
  let logValue = {'click_id': clickId}
  if (obj) {
    logValue = Object.assign(logValue, obj)
  }
  if (isFromApp()) {
    if (versionCheck) {
      ParentBridge.trackClick({
        clickId: clickId,
        params: logValue
      })
    }
  }
}

function appTrigger(triggerId, obj) {
  let logValue = {'trigger_id': triggerId}
  if (obj) {
    logValue = Object.assign(logValue, obj)
  }
  if (isFromApp()) {
    if (versionCheck) {
      ParentBridge.trackTrigger({
        triggerId: triggerId,
        params: logValue
      })
    }
  }
}

function debug(debugId, obj) {
  vktrack.debug(debugId, obj)
  let logValue = {'debug_id': debugId}
  if (obj) {
    logValue = Object.assign(logValue, obj)
  }
  if (isFromApp()) {
    if (versionCheck) {
      ParentBridge.trackClick({
        clickId: debugId,
        params: logValue
      })
    }
  }
}

export default {
  click: click,
  trigger: trigger,
  debug: debug,
  appClick: appClick,
  appTrigger: appTrigger,
}
