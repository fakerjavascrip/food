<template>
	<div class="aboutme_box">
		<div class="aboutme_top">
			<div class="aboutme_top_title"><b>关于我们</b></div>
			<div @click="backbegin" class="aboutme_top_mark">
				<img src="../assets/backwhite.png">
			</div>
		</div>
		<div class="aboutme_center">
			<h3>地址</h3>
			<p>长安区城南综合市场</p>
			<h3>电话</h3>
			<p>13474519158</p>
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios';
	export default{
		data(){
			return{
			}
		},
		methods:{
			backbegin:function(){
				this.$router.push('/');
			}
		},
		mounted:function(){
		}
	}
</script>
<style type="text/css">
	.aboutme_box{
		position: relative;
		width: 100%;
		height: auto;
	}
	.aboutme_top{
		position: fixed;
		width: 100%;
		height: 12vw;
		top: 0;
		overflow: hidden;
		background-image: linear-gradient(90deg,#0af,#0085ff);
		z-index: 1;
	}
	.aboutme_top_mark{
		position: relative;
		width: 8vw;
		height: 10vw;
		padding: 1vw 0 1vw 3vw;
		z-index: 5;
	}
	.aboutme_top_mark img{
		margin-top: 2.5vw;
		width: 6vw;
		height: 5vw;
	}
	.aboutme_top_title{
		position: absolute;
		width:100%;
		height: 100%;
		line-height: 12vw;
		text-align: center;
		color: white;
		z-index: 3;
		font-size: 20px;
	}
	.aboutme_center{
		position: relative;
		padding: 12vw 4vw 0 4vw;
	}
	.aboutme_center h3{
		position: relative;
		padding: 5vw 0 1vw 0;
		font-size: 16px;
	}
	.aboutme_center p{
		position: relative;
		padding: 2vw 0 2vw 0;
	}
</style>