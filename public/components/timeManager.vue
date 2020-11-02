<template>
  <section>
     <h4>时间，时区处理：timeManager</h4>
     <ul>
       <li v-for= "(key, value, index) in initdata" :key='`${name,index}`'>
         {{value}}: <i>{{key}}</i>
       </li>
     </ul>
  </section>
</template>
<script>
import jsdk from '../../lib/jsdk.js'
const timeManager = jsdk.timeManager

export default {
   data () {
        return {
          name: 'appVersion',
          initdata:{
            isTimezoneBJ:timeManager.isTimezoneBJ(),
            dateGMT: timeManager.dateGMT(1603873051000),
            dateTimeFormat: timeManager.dateTimeFormat(1603873051000,'yyyy-MM-dd hh:mm'),
            isToday: timeManager.isToday(1603873051000,1603873051000),
            isTomorrow: timeManager.isTomorrow(1603873051000,1603873051000),
            dateBeijing: timeManager.dateBeijing(1603873051000),
          }
        }
    },
}
</script>

<style>

</style>