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
const {isTimezoneBJ, dateGMT, dateTimeFormat, isToday} = jsdk.timeManager

export default {
   data () {
        return {
          name: 'appVersion',
          initdata:{
            isTimezoneBJ:isTimezoneBJ(),
            dateGMT: dateGMT(1603873051000),
            dateTimeFormat: dateTimeFormat(1603873051000,'yyyy-MM-dd hh:mm'),
            isToday: isToday(1603873051000,1603873051000)
          }
        }
    },
}
</script>

<style>

</style>