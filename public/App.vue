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
       <!-- <p @click="jsdkAdd()">jsdk-add</p>
       {{num}} -->
    </div>
</template>

<script>
import jsdk from '../lib/jsdk'
import appVersion from './components/appVersion.vue';
import timeManager from './components/timeManager.vue'
import vkTrack from 'vk-track'
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
      timeManager
    },
    mounted () {
      debugger
        vkTrack.trigger('Parent_class_UA_source_trigger')

        console.log(this.timeManager)
        // add(1,5)
        jsdk.add(1,2)
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