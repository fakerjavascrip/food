<template>
	<div>
		<div class="hot_box">
			<div class="hot_mark">热门搜索</div>
		</div>
		<div class="hot_show">
			<button v-for="(show,index) in vegetables" class="hot_title" @click = "hotfind(show)">{{show.name}}</button>
		</div>	
	</div>
</template>
<script type="text/javascript">
	import { mapState} from 'vuex'
	import axios from 'axios';
	export default{
		data(){
			return{
				vegetables:[]
			}
		},
		computed:{
            ...mapState([
            	'goodname'
            ]),
		},
		methods:{
			fhot:function(){
				document.getElementsByTagName("body")[0] .style.backgroundColor="white";
				axios.defaults.withCredentials = true;
				var self = this;
				axios.get('http://localhost:1337/user/fhotgood/')
				  .then(function (data) {
				    if(data.data.err==false){
				    	self.vegetables=data.data.result;
				    	for(let i=0;i<data.data.result.length;i++){
				    		self.$set(self.items[i], 'number', 1);
				    	}
				    }
				    else{
				    	console.log("失败");
				    }
				  })
				  .catch(function (error){
				    console.log(error);
				  });
			},
			hotfind:function(show){
				this.$store.commit('updateMessage', show.name);
				this.$router.push('/lookup/onlyfind');
			}
		},
		mounted :function(){
			this.fhot();
		}
	}
</script>
<style type="text/css">
	.hot_box{
		position: relative;
		width: 100%;
		height: auto;
		margin-top: 25px;
	}
	.hot_mark{
		position: relative;
		width: 100%;
		height: 36px;
		line-height: 36px;
		font-size: 18px;
		text-indent: 14px;
		font-weight: 700;
		color: #666;
		margin-bottom: 3px;	
	}
	.hot_show{
		position: relative;
		width: 94%;
		margin: auto;
		height: auto;
		overflow: hidden;
	}
	.hot_title{
		position: relative;
	    display: inline-block;
	    color: #666;
	    width: auto;
	    height: auto;
	    background-color: #f7f7f7;
	   	font-size: 14px;
	   	padding: 8px 10px 8px 10px ;
	   	margin: 13px 13px 0 0 ;
	   	text-align: center;
	   	border-radius: 5px;
	}
</style>