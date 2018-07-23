<template>
	<div>
		<div class="top">
			<div class="top_find">
				<input @click = "lookup" type="button" value="搜索需要的商品名称" name="">
			</div>
		</div>
		<div class="middle">
			<show></show>
		</div> 
	</div>
</template>
<script type="text/javascript"> 
import show from './show'
	export default{
		components:{ show },
		name:'recomd',
		data(){
			return{}
		},
		methods:{
			//点击后跳转查询的路由
			lookup:function(){
				this.$router.push('/lookup');
			},
		}
	}
</script>
<style type="text/css">
	.middle{
		width: 100%;
		height: auto;
		background-color: white;
		padding-top: 60px;
	}
	.top{
		position: fixed;
		margin: auto;
		width: 100%;
		background-color: #0af;
		/*#46a3ff*/
		height: 60px;
		z-index:10;
	}
	.top_find{
		position: relative;
		margin: auto;
		width: 92%;
		height: 40px;
		top: 10px;
		text-align: center;
	}
	.top_find input{
		position: relative;
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		border-width: 0px;
		float: left;
    	color: #999;
    	text-align: center;
    	background-color: white;
    	font-family: simsun;
    	outline: none;

	}
	.top_find_button{
		position: relative;
		width: 20%;
		height: 40px;
		float: left;
		text-align: center;
		line-height: 40px;
		font-size: 20px;
		color: white;
	}
</style>