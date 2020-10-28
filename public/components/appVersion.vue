<template>
  <section>
     <h4>版本相关：appVersion</h4>
     <ul>
       <li v-for= "(key, value, index) in initdata" :key='`${name,index}`'>
         {{value}}: <i>{{key}}</i>
       </li>
     </ul>
  </section>
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
const {isAndroid, isIOS, isFastApp, isApp, is20app, isWechat, isBaiduSmartProgram,vn, appVersionCompare, appVersionCompareLessThan} = jsdk.appVersion
export default {
   data () {
        return {
          name: 'appVersion',
          initdata:{
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
}
</script>

<style>

</style>