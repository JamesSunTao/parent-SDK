<template>
  <pub :name="`版本相关：${name}`" :initdata="initdata"/>
</template>

<script>
/**
 *  isAndroid: isAndroid,
 *  isIOS: isIOS,
 *  isApp: isApp,
 *  isFastApp: isFastApp,
 *  is20app: isApp && !isFastApp,
 *  isWechat: isWechat,
 *  isBaiduSmartProgram: isBaiduSmartProgram,
 *  getAppVersion: getAppVersion,
 *  vn: getCurrentAppVersion(),
 *  appVersionCompare: appVersionCompare,
 *  appVersionCompareLessThan: appVersionCompareLessThan 
 **/ 
import jsdk from '../../lib/jsdk.js'
import pub from './_pub.vue'
const {isAndroid, isIOS, isFastApp, isApp, is20app, isWechat, isBaiduSmartProgram,vn, appVersionCompare, appVersionCompareLessThan} = jsdk.appVersion
export default {
   data () {
        return {
          name: 'appVersion',
          initdata: {
            isAndroid,
            isIOS,
            isFastApp,
            isApp,
            is20app,
            isWechat,
            isBaiduSmartProgram,
            getCurrentAppVersion: vn,
            appVersionCompare: appVersionCompare('3.15','3.15'),
            appVersionCompareLessThan: appVersionCompareLessThan('3.15','3.05'),
          }
        }
    },
    components: {pub}
}
</script>

<style>

</style>