<template>
	<div>
		<div class="top">
			<div class="top_find">
				<input class="top_find_text" type="text" placeholder="点击查找商品" name="">
				<div class="top_find_button">查找</div>
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
		}
	}
</script>
<style type="text/css">
	.middle{
		width: 100%;
		height: auto;
		background-color: white;
		padding-top: 65px;
	}
	.top{
		position: fixed;
		margin: auto;
		width: 100vw;
		background-color: #46a3ff;
		height: 65px;
		z-index:10;
	}
	.top_find{
		position: relative;
		margin: auto;
		width: 94.5%;
		height: 40px;
		top: 15px;
		text-align: center;
	}
	.top_find_text{
		text-indent: 30px;
		position: relative;
		width: 80%;
		height: 40px;
		line-height: 40px;
		font-size: 22px;
		color: gray;
		border-width: 0px;
		float: left;
    	color: rgba(0,0,0,.3);
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