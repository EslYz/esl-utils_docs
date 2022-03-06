<template>
  <div id="app" v-watermarker="{text: '测试水印', textColor: 'rgba(180, 180, 180, .3)'}">
    <img alt="Vue logo">

    <button v-copy="copyText">复制</button>


    <button v-debounce="{func: debounceClick, params: {data: 'a'}, wait: 500}">debounce测试</button>

    <div v-longpress="longPress" prop="test customer props" style="width: 200px;height: 200px; background-color: #5da6ff">
      <div id="drags" style="background-color: red; width: 50px;height: 50px" v-draggable="callback"></div>
      长按测试</div>

<!--    <img v-lazy="'https://w.wallhaven.cc/full/dp/wallhaven-dpv8lj.jpg'">-->

    <div>{{a.b}}</div>
    <button @click="a.b++">add</button>

<!--    <div :class="(function (){return ['test test1']})()"></div>-->
<!--    <div>{{cptAdd(a.b)}}</div>-->

<!--    <button @click="c.value++">add c</button>-->
<!--    <div>c = {{c.value}}</div>-->

    <div>
      {{obTest.name}}
      <button @click="obTest.name = '李四'">测试 Vue.observable</button>
    </div>

    <div>
      {{testNum}}
      <button @click="addNum">测试 Vue.observable num</button>
    </div>

  </div>
</template>
<style>
.test{
  width: 200px;
  height: 200px;
  background-color: black;
}
.test1{
  border-radius: 5px;
}
</style>
<script>
import Vue from 'vue'
export default {
  name: 'App',
  components: {
  },
  beforeCreate() {
  },
  created() {
    this.obTest = Vue.observable(this.testObject)
    this.testNum = Vue.observable(this.num)
    console.log(this.a)
  },
  data() {
    this.testObject= {
      name: '张三'
    }
    this.num = 1
    return {
      a: {
        b: 1
      },
      d: 1,
      c: Object.freeze({value: 1}),
      copyText: 'test v copy'
    }
  },
  computed: {
    cptAdd() {
      return function (num) {
        return num+ this.a.b
      }
    }
  },
  watch: {
    'a.b': function (oldVal, newVal) {
      console.log(oldVal, newVal)
    }
  },
  methods: {
    addNum(e) {
      console.log(e)
      this.testNum++
      this.$forceUpdate()
      console.log(this.testNum)
    },
    longPress(e) {
      console.log(e)
    },
    debounceClick(customerData, e) {
      console.log('debounce click func ,', customerData, e)
    },
    callback(e) {
      console.log(e)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
