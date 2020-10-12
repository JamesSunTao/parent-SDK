import appVersion from './_app_version.js'
import vktrack from 'vk-track'
import { ParentBridge } from 'vk-hybrid'
const BRIDGE_API_VERSION = '2.7.0' // 开始支持track打点的app版本
const versionCheck = appVersion.appVersionCompare(BRIDGE_API_VERSION)
const cookies = require('cookies-js')
const isFastApp = appVersion.isFastApp
function isFromApp() {
  return cookies.get('isFromApp') === '1'
}
vktrack.toolDebug = true
vktrack.init({
  app_id: '0638377803f80262',
  show_log: vktrack.toolDebug
})
vktrack.register({
  business: 'great',
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
      params: void 0
    })
  }
}

function click(clickId, obj) {
  vktrack.click(clickId, obj)
  let logValue = { click_id: clickId }
  if (obj) {
    logValue = Object.assign(logValue, obj)
  }
  if (isFromApp()) {
    if (versionCheck) {
      ParentBridge.trackClick({
        clickId: clickId,
        params: logValue,
      })
    }
  }
}

function trigger(triggerId, obj) {
  vktrack.trigger(triggerId, obj)
  let logValue = { trigger_id: triggerId }
  if (obj) {
    logValue = Object.assign(logValue, obj)
  }
  if (isFromApp()) {
    if (versionCheck) {
      ParentBridge.trackTrigger({
        triggerId: triggerId,
        params: logValue,
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
        params: logValue,
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
        params: logValue,
      })
    }
  }
}

function pageView(pageViewId, obj) {
  vktrack.pageView(pageViewId, obj)
  let logValue = { pageViewId: pageViewId }
  if (obj) {
    logValue = Object.assign(logValue, obj)
  }
  if (isFromApp()) {
    if (versionCheck) {
      ParentBridge.trackPageview({
        pageName: window.location,
        event: 'enter',
        params: logValue
      })
    }
  }
}

export default {
  click: click,
  trigger: trigger,
  pageView: pageView,
  appClick: appClick,
  appTrigger: appTrigger,
}
