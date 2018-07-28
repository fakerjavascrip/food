<template>
	<div class="unread_box">
		<div class="unread_top">
			<div class="unread_top_title"><b>留言板</b></div>
<!-- 			<div class="unread_top_mark">
				<img src="../assets/backwhite.png">
			</div>	 -->		
		</div>
		<div class="unread_center">
			<div class=""></div>
		</div>
		<div class="unread_bottom">
			<div class=""></div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{}
		},
		methods:{

		}
	}
</script>
<style type="text/css">
	.unread_top{
		position: fixed;
		width: 100%;
		height: 12vw;
		top: 0;
		overflow: hidden;
		background-image: linear-gradient(90deg,#0af,#0085ff);
		z-index: 1;
	}
	.unread_top_mark{
		position: relative;
		width: 8vw;
		height: 10vw;
		padding: 1vw 0 1vw 3vw;
		z-index: 5;
	}
	.unread_top_mark img{
		margin-top: 2.5vw;
		width: 6vw;
		height: 5vw;
	}
	.unread_top_title{
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