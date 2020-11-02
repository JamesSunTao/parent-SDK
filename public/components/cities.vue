<template>
  <section>
     <h4>地址数据：cities</h4>
     <ul>
       <li v-for= "(key, value, index) in initdata" :key='`${name,index}`'>
         {{value}}: <i>{{key}}</i>
       </li>
     </ul>
  </section>
</template>
<script>
import jsdk from '../../lib/jsdk.js'
const cities = jsdk.cities

export default {
   data () {
        return {
          name: 'cities',
          initdata:{
            cities:cities[0].,
          }
        }
    },
}
</script>

<style>

</style>