<template>
	<div>
		<div class="lookup_top"> 
			<div class="lookup_back"><img @click ="back" src="../assets/back.png"></div>
			<form class="lookup_form">
				<div class="lookup_input">
					<input @input="timelyfind" type="text" :value="goodname" placeholder="输入商家，商品名称">
				</div>
				<div class="lookup_mark">
						<div @click = "onlyfind">搜索</div>
				</div>
			</form>
		</div>
		<div class="lookup_center">
			<router-view/>
		</div>
		<div class="lookup_bottom"></div>
	</div>
</template>
<script type="text/javascript">
	import { mapState} from 'vuex'
	import { mapActions} from 'vuex'
	import { mapMutations } from 'vuex'
	import axios from 'axios';
	export default{
		data(){
			return{
				good:[],
			}
		},
		computed:{
            ...mapState([
            	'goodname'
            ]),
		},
		methods:{ 
			back:function(){
				//退出该路由时初始化搜索框的里的值
				this.$store.commit('updateMessage', "");
				this.$router.push('/major');  
			},
			onlyfind:function(){
				this.$store.commit('changecache',true);
				axios.defaults.withCredentials = true;
				var self = this;
				axios.get('http://localhost:1337/user/fgname?name='+this.goodname)
				  .then(function (data) {
				    if(data.data.err==false){
				    	self.$router.push('/lookup/onlyfind');
				    }
				    else{
				    	self.$router.push('/lookup/notfind');
				    }
				    self.$store.commit('changecache',false);
				  })
				  .catch(function (error){
				    console.log(error);
				  });
			}, 
			timelyfind(e){
				this.$store.commit('updateMessage', e.target.value);
				if(this.goodname=="")
				{
					this.$router.push('/lookup');
				}
				else{
					this.$router.push('/lookup/timelyfind');
				}
			},
			lula:function(){
				this.$router.push('/lookup');
			},
		    add(){
		    	this.$store.commit('increment');
		    },
			item:function(){
				this.$store.commit('changecache',true);
				axios.defaults.withCredentials = true;
				var self = this;
				axios.get('http://localhost:1337/user/fgall/')
				  .then(function (data) {
				    if(data.data.err==false){
				    	self.items=data.data.result;
				    	for(let i=0;i<data.data.result.length;i++){
				    		self.$set(self.items[i], 'number', 1);
				    	}
				    	self.$store.commit('changecache',false);
				    }
				    else{
				    	console.log("失败");
				    }
				  })
				  .catch(function (error){
				    console.log(error);
				  });
			},
		},
		mounted:function(){
			this.lula();
		}
	}
</script>
<style type="text/css">
	*{
		margin: 0px;
		padding: 0px;
		border-width: 0px;
		outline: none;
	}
	.lookup_top{
		position: relative;
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	.lookup_center{
		position: relative;
		width: 100%;
		height: auto;
	}
	.lookup_bottom{
		position: relative;
		width: 100%;
		height: auto;
	}
	.lookup_back{
		position: relative;
		width: 10%;
		height: 36px;
		margin-top: 10px;
		float: left;
	}
	.lookup_back img{
		position: relative;
		width: 36px;
		height: 36px;
	}
	.lookup_input{
		position: relative;
		float: left;
		width: 84%;
		height: 30px;
		font-size: 16px;
	}
	.lookup_input input{
		width: 100%;
		height: 30px;
		outline: none;
		border-width: 0px;
		background-color:#f8f8f8;
		color: #666;
		text-indent: 30px;
		line-height: 36px;
		font-size: 14px;
		border-radius: 3px;
	}
	.lookup_mark{
		position: relative;
		float: left;
		width: 16%;
		text-align: center;
		height: 30px;
		line-height: 30px;
		font-size: 16px;
	}
	.lookup_mark button{
		width: 100%;
		height: 100%;
		background-color: white;
		color: #333;
		font-weight: 700;
		font-size: 18px;
		line-height: 30px;
		outline: none;
		border-width: 0px;
		border: none;
	}
	.lookup_form{
		position: relative;
		float: left;
		overflow: hidden;
		margin-left: 2%;
		width: 88%;	
		margin-top: 13px;
	}
</style>