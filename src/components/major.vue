<template>
	<div>
		<div class="middle_index">
			<router-view/>
		</div>
<!-- 		主页的四个导航栏 -->
		<div class="major_mark" v-show="!plus" style="position:fixed;">
			<div class="major_mark_title">
				<div class="nocolor" v-bind:class="{colorful:first }">首页</div>
				<div class="nocolor" v-bind:class="{colorful:second }">订单</div>
				<div class="nocolor" v-bind:class="{colorful:third }">我的</div>
			</div>
	      <router-link tag="div" to="/major">
	        <div class="mark_child" @click = "cfirst"><img src="../assets/homepage.png"></div>
	      </router-link>
	      <router-link tag="div" to="/major/order">
	        <div class="mark_child" @click = "csecond"><img src="../assets/order.png"></div>
	      </router-link>
	      <router-link tag="div"  to="/major/person">
	        <div class="mark_child" @click ="cthird"><img src="../assets/person.png"></div>
	      </router-link>
		</div>
		<confirm v-show="confirmshow"></confirm>
	</div>
</template>
<script type="text/javascript">
	import { mapState} from 'vuex'
	import { mapGetters} from 'vuex'
	import { mapMutations } from 'vuex'
	import { mapActions } from 'vuex'
	import confirm from './confirm.vue'
	export default{
		name:"important",
		data(){
			return{
				show:false,
				first:true,
				second:false,
				third:false
			}
		},
		components: {
			confirm
		},
		computed: {
            ...mapState([
           	'confirmshow',
           	'plus'
            ]),
        }, 
        methods:{
		    add(){
		    	this.$store.commit('increment');
		    },
		    cfirst:function(){
        		this.first=true;
        		this.second=false;
        		this.third=false;
		    },
		    csecond:function(){
        		this.first=false;
        		this.second=true;
        		this.third=false;
		    },
		    cthird:function(){
        		this.first=false;
        		this.second=false;
        		this.third=true;		    	
		    }
        },
        mounted:function(){
        	if(this.$route.path=='/major'){
        		this.first=true;
        		this.second=false;
        		this.third=false;
        	}
        	else if(this.$route.path=='/major/order'){
        		this.first=false;
        		this.second=true;
        		this.third=false;
        	}
        	else if(this.$route.path=='/major/person'){
        		this.first=false;
        		this.second=false;
        		this.third=true;
        	}
        } 
	}
</script>
<style type="text/css">
/*	body{
		overflow: hidden;
	}*/
	.major_prove{
		position:fixed;
		width: 100%;
		height: 12.8vw;
		z-index: 50;
		bottom: 0px;
		background-color: white;
	}
	.major_prove_ok{
		position: relative;
		width: 70%;
		height: 12.8vw;
		float: left;
		font-size: 18px;
		line-height: 12.8vw;
		color: white;
		background-color: rgba(61,61,63,0.9);
		text-align: center;
	}
	.major_shopping{
		position: relative;
		width: 13.8vw;
		height: 13.8vw;
		background-color: #444;
		border-radius: 13.8vw;
		left: 4vw;
		bottom: 2.8vw;
	}
	.major_shopping_inside{
		position: relative;
		width: 11.5vw;
		height: 11.5vw;
		background-color: #444;
		border-radius: 10.8vw;
		background-color: #3190e8;
		left: 1vw;
		top: 1.2vw;
	}
	.major_shopping_inside img{
		margin-top: 2.4vw;
		width: 7.2vw;
		height: 7.2vw;
	}
	.major_prove_prove{
		position: relative;
		width: 30%;
		height: 12.8vw;
		float: right;
		font-size: 16px;
		line-height: 12.8vw;
		color: white;
		background-color: #38ca73;
		text-align: center;
		float: left;
		font-weight: 700;
	}
	.major_mark{
		position: fixed;
		z-index:50;
		width: 100%;
		height: 12.8vw;
		bottom: 0px;
		color: white;
		background-color: white;
		border-width: 0.1px 0 0 0;
		border-style: solid;
		border-color: #cdcdcd;
		overflow: hidden;
	}
	.mark_child{
		position: relative;
		width: 33.3333333%;
		height: 10.4vw;
		text-align: center;
		line-height: 6vh;
		font-size: 20px;
		float: left;
		color: #5b5b5b;		
		z-index:20;
	}
	.mark_child img{
		width: auto;
		height: 6vw;
		margin-top: 1.4vw;
	}
	.major_mark_title{
		position: absolute;
		width: 100%;
		height: 5vw;
		line-height: 5vw;
		bottom: 0px;
		overflow: hidden;
	}
	.nocolor{
		width: 33.3333333%;
		height: 100%;
		float: left;
		text-align: center;
		font-size: 11px;
		color: #8e8e93;
/*		color: #0089dc;*/
	}
	.colorful{
		color: #0089dc;
	}
</style>