import { CommonBridge } from 'vk-hybrid'
import appVersion from './_app_version.js'
import cookies from 'cookies-js'
let mixinApp = {
  data() {
    return {
      isFromApp: cookies.get('isFromApp') === '1',
    }
  },
  methods: {
    hrefBack() {
      if (appVersion.isApp && appVersion.appVersionCompare('2.0.0')) {
        CommonBridge.historyBack()
      } else {
        window.history.back(-1)
      }
    },
  }
}
export default mixinApp
