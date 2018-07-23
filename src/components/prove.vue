<template>
	<div class="prove_box">
		<div class="prove_top">
			<div class="prove_top_title"><b>确认订单</b></div>
			<div class="prove_top_mark"><img src="../assets/backwhite.png"></div>
		</div>
		<div class="prove_who">
			<div>梁博</div>
			<div>18149498392</div>
		</div>
		<div class="prove_center">
			<div class="prove_center_date">
				<div class="prove_date_mark">下单时间</div>
				<div class="prove_date_time">当天时间(2017-7-21)</div>
			</div>
			<div class="prove_center_kind">
				<div class="prove_kind_mark">下单方式</div>
				<div class="prove_kind_kind">线上下单</div>
			</div>
		</div>
		<div class="prove_bottom">
			<div class="prove_goods">
				<div class="prove_goods_name">鸡蛋</div>
				<div class="prove_goods_num">123</div>
				<div class="prove_goods_unit">斤</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{}
		}
	}
</script>
<style type="text/css">
	.prove_box{
		position: relative;
		width: 100%;
		height: auto;
/*		从左到右的过度*/
		background-image: linear-gradient(90deg,#0af,#0085ff);
	}
	.prove_top{
		position: relative;
		width: 100%;
		height: auto;
		overflow: hidden;
		padding-bottom: 10vw;
	}
	.prove_who{
		position: relative;
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	.prove_top_mark{
		width: 8vw;
		height: 10vw;
		padding: 1vw 0 1vw 3vw;
	}
	.prove_top_mark img{
		margin-top: 2.5vw;
		width: 6vw;
		height: 5vw;
	}
	.prove_top_title{
		position: absolute;
		width:100%;
		height: 100%;
		line-height: 12vw;
		text-align: center;
		color: white;
		font-size: 20px;
	}
	.prove_who div{
		width: auto;
		position: relative;
		float: left;
		color: white;
		text-align: center;
		padding: 2vw 6vw 2vw 6vw;
	}
	.prove_center{
		position: relative;
		width: 96%;
		height: auto;
		background-color: white;
		margin: auto;
		overflow: hidden;
	}
	.prove_center_date{
		position: relative;
		width: 100%;
		height: 10vw;
		overflow: hidden;
		padding: 3vw 0 3vw 0;
	}
	.prove_date_mark{
		position: relative;
		color: black;
		width: 45vw;
		height: 10vw;
		padding-left: 5vw;
		line-height: 10vw;
		float: left;
	}
	.prove_date_time{
		position: relative;
		color: #2395ff;
		width: auto;
		line-height: 10vw;
		height: 10vw;
		font-size: 17px;
	}
	.prove_center_kind{
		position: relative;
		width: 100%;
		height: 10vw;
		overflow: hidden;
		padding: 3vw 0 3vw 0;
	}
	.prove_kind_mark{
		position: relative;
		color: black;
		width: 45vw;
		height: 10vw;
		padding-left: 5vw;
		line-height: 10vw;
		float: left;	
	}
	.prove_kind_kind{
		position: relative;
		color: #2395ff;
		width: auto;
		line-height: 10vw;
		height: 10vw;
		font-size: 17px;
		text-indent: 20vw;
	}	
	.prove_bottom{
		position: relative;
		width: 98%;
		height: auto;
		background-color: white;
		overflow: hidden;
		margin: auto;
		margin-top: 2vw;
	}
	.prove_goods{
		position: relative;
		float: left;
		width: 100%;
		height: auto;
		overflow: hidden;
		padding: 5vw 0 5vw 0;
	}
	.prove_goods_name{
		position: relative;
		width: auto;
		height: auto;
		float: left;
	}
	.prove_goods_num{
		position: relative;
		width: auto;
		height: auto;
		float: left;
	}
	.prove_goods_unit{
		position: relative;
		width: auto;
		height:auto;
		float: left;
	}
</style>