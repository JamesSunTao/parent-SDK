<template>
  <section>
     <h4 @click="isShow = !isShow">{{name}}</h4>
     <ul v-show="isShow">
       <li v-for= "(key, value, index) in initdata" :key='`${name,index}`'>
         {{value}}: <i>{{key}}</i>
       </li>
     </ul>
  </section>
</template>

<script>
export default {
  props: {
    initdata: {
      type: Object,
      required: true
    },
    name,
  },
  data() {
    return {
      isShow: false
    }
  }
}
</script>
<style lang="stylus">
  ul {
    background: #f3f3f3;
    box-sizing: border-box;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 4px;
  }
</style>