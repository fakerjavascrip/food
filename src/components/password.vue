<template>
	<div class="password_box">
		<div class="password_top">
			<div class="password_top_title"><b>修改密码</b></div>
			<div @click="backperson" class="password_top_mark">
				<img src="../assets/backwhite.png">
			</div>
		</div>
		<div class="password_center">
			<ul>
				<li class="password_mark">
					<input type="text" placeholder="旧密码" name="">
				</li>
				<li class="password_mark">
					<input type="text" placeholder="新密码" name="">
				</li>
				<li class="password_mark">
					<input type="text" placeholder="确认密码" name="">
				</li>
			</ul>
		</div>
		<div class="password_bottom">
			<div class="password_button">确认并保存</div>
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
	.password_box{
		position: relative;
		width: 100%;
		height: auto;
	}
	.password_top{
		position: fixed;
		width: 100%;
		height: 12vw;
		top: 0;
		overflow: hidden;
		background-image: linear-gradient(90deg,#0af,#0085ff);
		z-index: 1;
	}
	.password_top_mark{
		position: relative;
		width: 8vw;
		height: 10vw;
		padding: 1vw 0 1vw 3vw;
		z-index: 5;
	}
	.password_top_mark img{
		margin-top: 2.5vw;
		width: 6vw;
		height: 5vw;
	}
	.password_top_title{
		position: absolute;
		width:100%;
		height: 100%;
		line-height: 12vw;
		text-align: center;
		color: white;
		z-index: 3;
		font-size: 20px;
	}
	.password_center{
		position: relative;
		width: auto;
		height: auto;
		padding-top: 12vw;
		background-color: white;
	}
	.password_center ul{
		padding: 3vw;	
	}
	.password_center li{
		width: 100%;
		height: 11vw;
		padding: 1.5vw 0 1.5vw 0;
	}
	.password_center input{
		width: 100%;
		height: 100%;
		background-color: #f2f2f2;
		text-indent: 2vw;
		font-size: 16px;
		outline-color: #0af;
		outline: 
	}
	.password_bottom{
		position: relative;
		width: 100%;
		height: auto;
	}
	.password_button{
		position: relative;
		width: 90vw;
		height: 12vw;
		margin: auto;
		color: white;
		background-color: #3199e8;
		border-radius: 1vw;
		margin-top: 4vw;
		text-align: center;
		line-height: 12vw;
		font-size: 19px;
	}

</style>