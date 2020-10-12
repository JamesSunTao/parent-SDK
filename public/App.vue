<template>
    <div class="main-warp">
       <h3 class="tit">JSDK 工具库</h3>
       <ul>
           <li>appVersion (isApp: <i>{{isApp}}</i>)</li>
           <li>timeManager (isBJTimeZone: <i>{{timeManager}}</i>)</li>
           <li>newAddress (newAddress: <i>{{newAddress[0].name}}</i>)</li>
       </ul>
       <!-- <p @click="jsdkAdd()">jsdk-add</p>
       {{num}} -->
    </div>
</template>

<script>
import jsdk from '../lib/jsdk'
export default {
    name:'App',
    data () {
        return {
            activeIndex2: '1',
            num: 0,
            isApp: jsdk.appVersion.isApp,
            timeManager: new jsdk.timeManager().isTimezoneBJ(),
            newAddress: jsdk.newAddress.data
        }
    },
    mounted () {
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
    .tit
      text-align: center
    i
      color: orange
</style>