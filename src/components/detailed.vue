<template>
	<div class="detailed_box">
		<div class="detailed_top">
			<div class="detailed_top_title"><b>订单详情</b></div>
			<div class="detailed_top_mark"  @click="backorder">
				<img src="../assets/backwhite.png">
			</div>
		</div>
		<div class="detailed_center">
			<div class="detailed_mark_img">
				<img src="../assets/egg.png">
			</div>
			<div class="detailed_mark_state"><b>订单已取消</b></div>
			<div class="detailed_mark_again">再去购买</div>
		</div>
		<div class="detailed_bottom">
			<div class="detailed_good_information">
				<div class="detailed_good_num">16</div>
				<div class="detailed_good_name">鸡蛋</div>
				<div class="detailed_good_unit">斤</div>
			</div>
			<div class="detailed_good_information">
				<div class="detailed_good_num">16</div>
				<div class="detailed_good_name">大白菜</div>
				<div class="detailed_good_unit">斤</div>
			</div>
			<div class="detailed_transport">
				<div class="detailed_transport_mark">配送信息</div>
				<div class="detailed_transport_time"><div class="detailed_transport_div">送达时间:</div> 尽快送达</div>
				<div class="detailed_transport_time">
					<div class="detailed_transport_div">送货地址:</div>
					<div class="detailed_transport_long">
						<p>梁博</p>
						<p>18149498392</p>
						<p>西安邮电大学长安校区东区教学楼韦曲街道西长安街 fz155</p>
					</div>
				</div>
				<div class="detailed_transport_time">
					<div class="detailed_transport_div">配送方式:</div>线下配送
				</div>
			</div>
		</div>
		<div class="detailed_bottom_bottom">
			<div class="detailed_other">
				<div class="detailed_transport_time">
					<div class="detailed_transport_div">下单方式:</div>在线下单
				</div>
				<div class="detailed_transport_time">
					<div class="detailed_transport_div">下单时间:</div>2018-06-06 22:33
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{}
		},
		methods:{
			backorder:function(){
				this.$router.push('/major/order');
			}
		}
	}
</script>
<style type="text/css">
	.detailed_box{
		position: relative;
		width: 100%;
		height: auto;
	}
	.detailed_top{
		position: fixed;
		width: 100%;
		height: 12vw;
		top: 0;
		overflow: hidden;
		background-image: linear-gradient(90deg,#0af,#0085ff);
		z-index: 1;
	}
	.detailed_top_mark{
		position: relative;
		width: 8vw;
		height: 10vw;
		padding: 1vw 0 1vw 3vw;
		z-index: 5;
	}
	.detailed_top_mark img{
		margin-top: 2.5vw;
		width: 6vw;
		height: 5vw;
	}
	.detailed_top_title{
		position: absolute;
		width:100%;
		height: 100%;
		line-height: 12vw;
		text-align: center;
		color: white;
		z-index: 3;
		font-size: 20px;
	}
	.detailed_center{
		position: relative;
		padding-top: 15.5vw;
		background-color: white;
		width: 96%;
		height: auto;
		margin: auto;
		padding-bottom: 3.5vw;
	}
	.detailed_mark_img{
		position: relative;
		width: 23vw;
		height: 23vw;
		margin: auto;
		border-radius: 50%;
		overflow: hidden;
		margin-top: 3vw;
	}
	.detailed_mark_img img{
		position: relative;
		width: 100%;
		height: 100%;
	}
	.detailed_mark_state{
		position: relative;
		width: auto;
		text-align: center;
		padding-top: 5vw;
		font-size: 20px;
		letter-spacing:3px;
	}
	.detailed_mark_again{ 
		position: relative;
		text-align: center;
		line-height: 8vw;
		width: 26vw;
		height: 8vw;
		background-color: #2395ff;
		color: white;
		border-radius: 1vw;
		margin: auto;
		margin-top: 5vw;
	}
	.detailed_bottom{
		position: relative;
		width: 96%;
		height: auto;
		margin: auto;
		margin-top: 3px;
		background-color: white;
	}
	.detailed_good_information{
		position: relative;
		width: 100%;
		height: 10vw;
		padding: 2vw 0 2vw 0;
		border-width: 0.02px;
		border-color: #e6e6e6;
		border-style: solid;
/*		overflow: hidden;*/
	}
	.detailed_good_num{
		position: relative;
		width: 100%;
		height: 10vw;
		font-size: 14px;
		line-height: 10vw;
		float: left;
		text-indent: 70vw;
	}
	.detailed_good_name{
		position: relative;
		width: 40vw;
		height: 10vw;
		margin-left: -100%;
		float: left;
		line-height: 10vw;
		text-indent: 3vw;
	}
	.detailed_good_unit{
		position: relative;
		float: left;
        margin-left: -14vw;
        right: 0vw;
        width: 14vw;
        height: 10vw;
        text-align: center;
        line-height: 10vw;
	}
	.detailed_transport{
		position: relative;
		width: 100%;
		height: auto;	
	}
	.detailed_transport_mark{
		position: relative;
		width: 100%;
		height: 8vw;
		line-height: 8vw;
		padding: 2vw;
		font-size: 17px;
	}
	.detailed_transport_time{
		position: relative;
		width: 100%;
		height: auto;
		color:#6e6e6e;
		overflow: hidden;
		padding:2vw 0 2vw 0;
	}
	.detailed_transport_div{
		position: relative;
		float: left;
		width: 22vw;
		text-align: center;
	} 
	.detailed_transport_long{
		position: relative;
		float: left;
		width: 60vw;
	}
	.detailed_transport_long p{
		line-height: 8vw;
	}
	.detailed_other{
		position: relative;
		width: 100%;
		color:#6e6e6e;
		height: auto;
	}
	.detailed_bottom_bottom{
		position: relative;
		width: 96%;
		height: auto;
		margin: auto;
		background-color: white;
		margin-top: 4vw;
		padding: 4vw 0 4vw 0;
	}
</style>