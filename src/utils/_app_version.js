const cookies = require('cookies-js')

let isAndroid = /Android/i.test(window.navigator.userAgent)
let isIOS = /iPhone/i.test(window.navigator.userAgent)
let isApp = false
let isFastApp = false

let isWechat = false
let isBaiduSmartProgram = false
if (/MicroMessenger/i.test(navigator.userAgent)) {
  isWechat = true
}

if (/swan\//.test(navigator.userAgent)) {
  isBaiduSmartProgram = true
}

isApp = !!(cookies.get('isFromApp') || 0)
isFastApp = (cookies.get('app_client') === 'fastApp')

function versionCompare(currVersion, afferentVerison) {
  if (!currVersion || !afferentVerison) {
    return !currVersion ? -1 : 1
  }
  if (currVersion === afferentVerison) {
    return 0
  }
  let currArr = currVersion.split('.')
  let afferentArr = afferentVerison.split('.')
  let currLength = currArr.length
  let afferentLength = afferentArr.length
  let longestLength = currLength > afferentLength ? currLength : afferentLength
  for (let i = 0; i < longestLength; i++) {
    if (i == currArr.length) {
      return -1
    }
    if (i == afferentLength.length) {
      return 1
    }
    let currValue = parseInt(currArr[i])
    let afferentValue = parseInt(afferentArr[i])
    if (currValue > afferentValue) {
      return 1
    } else if (currValue < afferentValue) {
      return -1
    }
  }
  if (longestLength === currLength) {
    return 1
  }
  if (longestLength === afferentLength) {
    return -1
  }
}
// 获取当前 App版本号
function getCurrentAppVersion() {
  let vn = '1.0.0.0' //默认设置版本
  try {
    let appEnv = cookies.get('appEnv')
    if (appEnv) {
      appEnv = JSON.parse(appEnv)
      vn = appEnv.vn
    }
  } catch (error) {
    // 版本号parse失败
  }
  return vn
}

function getAppVersion() {
  let vn = '' //默认设置版本
  try {
    let appEnv = cookies.get('appEnv')
    if (appEnv) {
      appEnv = JSON.parse(appEnv)
      vn = appEnv.vn
    }
  } catch (error) {
    //
  }
  return vn
}
// 当前的运行环境是否处于DinoTvApp
function isDinoTvAPPWebview() {
  if (isApp) {
    return /aeversion/i.test(navigator.userAgent)
  }
  return false
}

function isParentAPPWebview() {
  if (isApp) {
    return /parent/i.test(navigator.userAgent)
  }
  return false
}
// 当前版本号是否大于等于指定版本
function appVersionCompare(version) {
  if (isApp) {
    let current = getCurrentAppVersion()
    return (versionCompare(current, version) >= 0)
  }
  return false
}
// 当前版本号是否小于指定版本
function appVersionCompareLessThan(version) {
  if (isApp) {
    let current = getCurrentAppVersion()
    return (versionCompare(current, version) < 0)
  }
  return false
}

export default {
  isAndroid: isAndroid,
  isIOS: isIOS,
  isApp: isApp,
  isFastApp: isFastApp,
  is20app: isApp && !isFastApp,
  isWechat: isWechat,
  isBaiduSmartProgram: isBaiduSmartProgram,
  getAppVersion: getAppVersion,
  vn: getCurrentAppVersion(),
  appVersionCompare: appVersionCompare,
  appVersionCompareLessThan: appVersionCompareLessThan,
  isDinoTvAPPWebview: isDinoTvAPPWebview,
  isParentAPPWebview: isParentAPPWebview
}