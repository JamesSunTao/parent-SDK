<template>
    <div class="main-warp">
       <h3 class="tit">JSDK 工具库</h3>
       <!-- app版本相关 -->
       <appVersion/>
       <!-- 时间，时区处理 -->
       <timeManager/>

       <ul>
           <li>newAddress (newAddress: <i>{{newAddress[0].name}}</i>)</li>
           <li>axios : <i>axios请求封装</i></li>
       </ul>
       <!--  点击触发  -->
       <clipboard/>
       <!-- 强制刷新 -->
       <forceDisableCache/>
       <!-- 神策打点 -->
       <vkTrack/>
    </div>
</template>

<script>
import jsdk from '../lib/jsdk'
import appVersion from './components/appVersion.vue'
import timeManager from './components/timeManager.vue'
import clipboard from './components/clipboard.vue'
import forceDisableCache from './components/forceDisableCache.vue'
import vkTrack from './components/vkTrack.vue'
// import vktrack from 'vk-track'
export default {
    name:'App',
    data () {
        return {
          activeIndex2: '1',
          num: 0,
          isApp: jsdk.appVersion.isApp,
          newAddress: jsdk.newAddress.data
        }
    },
    components:{
      appVersion,
      timeManager,
      clipboard,
      forceDisableCache,
      vkTrack
    },
    mounted () {
      debugger
      // console.log(jsdk.vkRem.setRem())
      
    },
    methods: {
      jsdkAdd(){
        console.log('add jsdk')
        this.num = jsdk.add(1,2)
      }
    }
}
</script>
<style lang="stylus">
  .main-warp
    h4
      margin: 0
    .tit
      text-align: center
    i
      color: orange
  section
    margin-top: 10px
    box-sizing : border-box
    padding: 10px
    background : #e5e5e5
    border-radius : 4px
</style>