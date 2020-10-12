import { ParentBridge } from 'vk-hybrid'

window.onload = function() {
  try {
    ParentBridge.trackRecordLaunchTime({
      url: location.href
    })
  } catch (e) {
    //
  }
}