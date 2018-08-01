<template>
	<div class="order_box">
		<div class="order_top">
			<div class="order_top_title"><b>订单</b></div>
		</div>
		<div class="order_order">
			<router-view/>		
		</div>		
	</div>
</template>
<script>
	export default{
		data(){
			return{
			}
		},
		methods : {
		},
		mounted:function(){
		}
	}
</script>
<style type="text/css">
	.order_box{
		position: relative;
		width: 100%;
		height: height;
	}
	.order_top{
		position: fixed;
		width: 100%;
		height: 12vw;
		top: 0;
		overflow: hidden;
		background-image: linear-gradient(90deg,#0af,#0085ff);
		z-index: 1;
	}
	.order_top_mark{
		position: relative;
		width: 8vw;
		height: 10vw;
		padding: 1vw 0 1vw 3vw;
		z-index: 5;
	}
	.order_top_mark img{
		margin-top: 2.5vw;
		width: 6vw;
		height: 5vw;
	}
	.order_top_title{
		position: absolute;
		width:100%;
		height: 100%;
		line-height: 12vw;
		text-align: center;
		color: white;
		z-index: 3;
		font-size: 20px;
	}
</style>