<template>
  <section class="no-padding">
     <pub :name="`复制到剪切板：${name}`" :initdata="initdata"/>
     <button @click="copyUrl">复制</button>
  </section>
</template>

<script>
import jsdk from '../../lib/jsdk.js'
import pub from './_pub.vue'

export default {
   data () {
        return {
          name: 'xeClipboard',
          initdata:{
            xeClipboard:'vipkid 剪切板插件3',
          }
        }
    },
    components: {pub},
    methods: {
      copyUrl(){
        let _this = this
        jsdk.xeClipboard.copy(_this.initdata.xeClipboard)
      }
    }
}
</script>

<style>
  .no-padding {
    padding: 0;
  }
</style>