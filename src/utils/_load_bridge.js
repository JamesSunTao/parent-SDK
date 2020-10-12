import queryString from 'query-string'

let qs = queryString.parse(location.search)

function loadScript(url, callback) {
  let script = document.createElement('script')
  script.onload = function() {
    callback()
  }
  script.src = url
  document.head.appendChild(script)
}

if (qs.roomId) {
  let protocol = window.location.protocol
  loadScript(`${protocol}//bridge.vipkid-qa.com.cn/dist/bridge.npm.js?_${new Date().getTime()}`, () => {
    let bridge = new window.testBridge(
      qs.isMaster,
      qs.roomId,
      qs.device
    )
    bridge.initBridge()
  })
}
