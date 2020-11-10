
import appVersion from './_app_version.js'
export default function(cb) {
  let workerOk = true
  if (appVersion.isApp && appVersion.isIOS) {
    let versionList = window.navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/)[1].split('_')
    workerOk = !(versionList[0] >= 13 && versionList[1] >= 5)
  }
  try {
    if (workerOk) {
      let bfWorker = new Worker(window.URL.createObjectURL(new Blob(['1'])))
      window.addEventListener('unload', function() {
        // 这里绑个事件，构造一个闭包，以免 worker 被垃圾回收导致逻辑失效
        bfWorker.terminate()
      })
    } else {
      window.addEventListener('pageshow', function() {
        if (event.persisted) {
          cb && cb()
        }
      }, false)
    }
  } catch (e) {
    window.console.log('not support webWorker')
  }
}