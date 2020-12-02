<template>
  <pub :name="`神策打点工具：${name}`" :initdata="initdata"/>
</template>

<script>
import jsdk from '../../lib/jsdk.js'
import pub from './_pub.vue'
/**
 * click: click,
 * trigger: trigger,
 * pageView: pageView,
 * appClick: appClick,
 * appTrigger: appTrigger
 **/
export default {
   data () {
        return {
          name: 'vkTrack',
          initdata:{
            click: 'vkTrack.click()',
            trigger: 'vkTrack.trigger()',
            pageView: 'vkTrack.pageView()',
            appClick: 'vkTrack.appClick()',
            appTrigger: 'vkTrack.appTrigger()',
          }
        }
    },
    created() {
       jsdk.vkTrack.pageView('suntao_msg_student_msg_page_view')
    },
    components: {pub}
}
</script>

<style>

</style>