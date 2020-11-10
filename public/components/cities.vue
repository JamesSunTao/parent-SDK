<template>
  <pub :name="`地址数据：${name}`" :initdata="initdata"/>
</template>
<script>
import jsdk from '../../lib/jsdk.js'
import pub from './_pub.vue'
const cities = jsdk.cities

export default {
   data () {
        return {
          name: 'cities',
          initdata:{
            cities:cities[0],
          }
        }
    },
    components: {pub}
}
</script>

<style>

</style>