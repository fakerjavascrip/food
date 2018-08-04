<template>
<!-- 		提交订单的按钮 -->
		<div class="gopay_prove" v-show="true">
			<div class="gopay_prove_ok">暂无线上优惠</div>
			<div class="gopay_prove_prove" @click = "gopay">确定下单</div>
		</div>
</template>
<script type="text/javascript">
	import { mapState} from 'vuex'
	import { mapGetters} from 'vuex'
	import { mapMutations } from 'vuex'
	import { mapActions } from 'vuex'
	import axios from 'axios'
	export default{
		data(){
			return{
				goods: this.$store.getters.vegetables,
			}
		},
		computed: {
            ...mapState([
           	'plus',
           	'amount',
           	'confirmshow',
           	'message',
            ]),
        }, 
        methods:{
		    gopay:function(){
		    	var date = new Date();
				var  time= date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
				var self =this;
		    	this.$store.commit('changecache',true);
		    	axios.defaults.withCredentials = true;
		    	if(this.message!=""){
			    	axios.get('http://localhost:1337/user/umessage?message='+this.message+'&date='+time)
			    	.then(function(data){
			    		if(data.data.err==false){
			    			console.log("留言成功");
			    			self.$store.commit('changecache',false);
			    		}
			    		else{
			    			console.log("留言上传失败")
			    		}
			    	}).catch(function(error){
			    		console.log(error);
			    	})
		    	}
		    	else if(this.message){
		    		console.log("留言为空");
		    	}
		    	this.$store.commit('changecache',true);
		    	axios.get('http://localhost:1337/user/customers?goods='+JSON.stringify(this.goods)+"&time="+time)
		    	.then(function(data){
		    		if(data.data.err==false){
		    			//提交订单后跳转
		    			self.$router.push('/major');
		    			//提交订单后清楚localstorage和vuex中的订单数据
		    			self.$store.commit('cleargoods');
		    			//清掉订单的信息
		    			//将显示都清掉
		    			self.$store.commit('changecache',false);
		    		}
		    		else{
		    			alert("数据失败");
		    		}
		    	}).catch(function(error){
		    		console.log(error);
		    	})

		    }
        }, 
	}
</script>
<style type="text/css">
	.gopay_prove{
		position:fixed;
		width: 100%;
		height: 12.8vw;
		z-index: 50;
		bottom: 0px;
		background-color: white;
		z-index: 600;
	}
	.gopay_prove_ok{
		position: relative;
		width: 72%;
		height: 12.8vw;
		float: left;
		font-size: 18px;
		line-height: 12.8vw;
		color: white;
		background-color: #3c3c3c;
		text-indent: 3vw;
	}
	.gopay_shopping{
		position: relative;
		width: 13.8vw;
		height: 13.8vw;
		background-color: #444;
		border-radius: 13.8vw;
		left: 4vw;
		bottom: 2.8vw;
	}
	.gopay_shopping_num{
		position: relative;
		width: 4.2vw;
		height: 4.2vw;
		background-color: red;
		border-radius: 4.2vw;
		color: white;
		text-align: center;
		line-height: 4.2vw;
		font-size: 12px;
		left: 8vw;
		z-index: 6;

	}
	.gopay_shopping_inside{
		position: relative;
		width: 11.5vw;
		height: 11.5vw;
		background-color: #444;
		border-radius: 10.8vw;
		background-color: #3190e8;
		left: 1vw;
		top: -2vw;
		z-index: 5;
	}
	.gopay_shopping_inside img{
		margin-top: 2.4vw;
		width: 7.2vw;
		height: 7.2vw;
	}
	.gopay_prove_prove{
		position: relative;
		width: 28%;
		height: 12.8vw;
		float: right;
		font-size: 16px;
		line-height: 12.8vw;
		color: white;
		background-color: #00e067;
		text-align: center;
		float: left;
		font-weight: 700;
	}
</style>