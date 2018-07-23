<template>
  <div id="app">
<!--     在这个里可以放一些公共的组件 -->
    <confirm v-show="confirmshow"></confirm>
    <pay></pay>
    <router-view/>
  </div>
</template>
<script src="/path/to/vue.js"></script>
<script src="/path/to/vuex.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>

    import confirm from './components/confirm.vue'
    import pay from './components/pay.vue'
    import { mapState} from 'vuex'
    import { mapGetters} from 'vuex'
    import { mapMutations } from 'vuex'
    import { mapActions } from 'vuex'
    export default {
    name: 'App',
        data(){
        return{}
        }, 
    components:{ confirm, pay },
    computed:{
        ...mapState([
        'confirmshow'
        ]),
    }, 
    }
</script>
<style>
    *{
      margin: 0px;
      padding: 0px;
      border-width: 0px;
    }
    .flex{
      position: fixed;
      width: 100px;
      height: 100px;
      z-index: 100;
      background-color: blue;
    }
    #app {
    /*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
</style>
