<template>
    <div class="main-warp">
       <h3 class="tit">JSDK 工具库</h3>
       <!-- app版本相关 -->
       <appVersion/>
       <!-- 时间，时区处理 -->
       <timeManager/>

       <ul>
           <li>newAddress (newAddress: <i>{{newAddress[0].name}}</i>)</li>
       </ul>
       <!--  点击触发  -->
       <clipboard/>
       <forceDisableCache/>
    </div>
</template>

<script>
import jsdk from '../lib/jsdk'
import appVersion from './components/appVersion.vue';
import timeManager from './components/timeManager.vue'
import clipboard from './components/clipboard.vue';
import forceDisableCache from './components/forceDisableCache.vue'
import vktrack from 'vk-track'
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
      forceDisableCache
    },
    mounted () {
      vktrack.toolDebug = true
      vktrack.init({
        app_id: '0638377803f80262',
        show_log: vktrack.toolDebug
      })
      vktrack.pageView('suntao_msg_student_msg_page_view')
      console.log(jsdk.axios)
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