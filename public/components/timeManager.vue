<template>
  <pub :name="`时间，时区相关：${name}`" :initdata="initdata"/>
</template>

<script>
import jsdk from '../../lib/jsdk.js'
import pub from './_pub.vue'
const timeManager = jsdk.timeManager

export default {
   data () {
        return {
          name: 'timeManager',
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
    components: {pub}
}
</script>

<style>

</style>