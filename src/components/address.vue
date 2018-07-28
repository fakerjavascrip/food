<template>
	<div class="address_box">
		<div class="address_top">
			<div class="address_top_title"><b>我的地址</b></div>
			<div @click="backperson" class="address_top_mark">
				<img src="../assets/backwhite.png">
			</div>
		</div>
		<div class="address_center">
			<p>
				<span class="address_username"><b>梁博</b></span>
				<span>先生</span>
				<span>18149498392</span>
			</p>
			<p>西安邮电大学长安校区东区外国语学院西安邮电大学长安校区301</p>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{}
		},
		methods:{
			backperson:function(){
				this.$router.push('/major/person');
			}
		}
	}
</script>
<style type="text/css">
	.address_box{
		position: relative;
		width: 100%;
		height: auto;
	}
	.address_top{
		position: fixed;
		width: 100%;
		height: 12vw;
		top: 0;
		overflow: hidden;
		background-image: linear-gradient(90deg,#0af,#0085ff);
		z-index: 1;
	}
	.address_top_mark{
		position: relative;
		width: 8vw;
		height: 10vw;
		padding: 1vw 0 1vw 3vw;
		z-index: 5;
	}
	.address_top_mark img{
		margin-top: 2.5vw;
		width: 6vw;
		height: 5vw;
	}
	.address_top_title{
		position: absolute;
		width:100%;
		height: 100%;
		line-height: 12vw;
		text-align: center;
		color: white;
		z-index: 3;
		font-size: 20px;
	}
	.address_center{
		position: relative;
		height: auto;
		padding: 16vw 4vw 4vw 4vw;
		background-color: white;
		color:#666;
	}
	.address_center span{
		font-size: 17px;
	}
	.address_username{
		color: black;
		font-size: 18px;
	}
</style>