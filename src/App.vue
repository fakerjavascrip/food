<template>
  <div id="app">
    <important></important>
  </div>
</template>
<script src="/path/to/vue.js"></script>
<script src="/path/to/vuex.js"></script>
<script>
import important from './components/important'
export default {
  components:{important},
  name: 'App',
  data(){
    return{}
  }

}
</script>
<style>
*{
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
