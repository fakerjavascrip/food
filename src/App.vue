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
    import gopay from './components/gopay.vue'
    import { mapState} from 'vuex'
    import { mapGetters} from 'vuex'
    import { mapMutations } from 'vuex'
    import { mapActions } from 'vuex'
    export default {
    name: 'App',
        data(){
        return{
        	shop:[],
        	confirmm:false,
        	amount: 0,
        	plus:false,
        }
        }, 
    components:{ confirm, pay ,gopay},
    computed:{
        ...mapState([
        'confirmshow',
        ]),
    },
    methods:{
        updatedata:function(){
        	this.amount = JSON.parse(localStorage.getItem('amount'));
        	console.log(this.amount);
        	if(this.amount>0){
	        	// this.shop = JSON.parse(localStorage.getItem('shop'));
				function deepCopy(p, c) {
				　　　　var c = c || {};
				　　　　for (var i in p) {
				　　　　　　if (typeof p[i] === 'object') {
				　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
				　　　　　　　　deepCopy(p[i], c[i]);
				　　　　　　} else {
				　　　　　　　　　c[i] = p[i];
				　　　　　　}
				　　　　}
				　　　　return c;
					}
				this.shop = deepCopy(JSON.parse(localStorage.getItem('shop')));
	        	this.confirmm = JSON.parse(localStorage.getItem('confirmshow'));
	        	this.plus = JSON.parse(localStorage.getItem('plus'));
	        	this.$store.commit('updateshop',this.shop);
	        	this.$store.commit('updateconfirmm',this.confirmm);
	        	this.$store.commit('updateamount',this.amount);
	        	this.$store.commit('updateplus',this.plus);

        	}        
        }
    },
    mounted:function(){
        this.updatedata();
    } 
    }
</script>
<style>
    body{
      background-color: #f5f5f5;
    }
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
