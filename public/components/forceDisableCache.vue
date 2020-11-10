<template>
  <pub :name="`强制刷新：${name}`" :initdata="initdata"/>
</template>

<script>
import jsdk from '../../lib/jsdk.js'
import pub from './_pub.vue'
const {forceDisableCache} = jsdk
setTimeout(() => {
  forceDisableCache(function() {
    location.reload()
  })
}, 1000)
export default {
   data () {
        return {
          name: 'forceDisableCache',
          initdata:{
            forceDisableCache: '强制刷新init',
          }
        }
    },
    components: {pub}
}
</script>

<style>

</style>