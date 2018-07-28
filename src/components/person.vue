<template>
	<div class="person_box">
		<div class="person_top">
			<div class="person_top_title"><b>账户信息</b></div>
		</div>
		<div class="person_center">
			<ul>
				<li>
					<b>店铺名</b>
					<span style="color: #666;">哔哩哔哩 ></span>
				</li>
			</ul>
			<h2>账号绑定</h2>
			<ul>
				<li>
					<b>手机</b>
					<span @click="changephone">181****8392 ></span>
				</li>
			</ul>
			<h2>安全设置</h2>
			<ul>
				<li>
				<b>登陆密码</b>
				<span @click = "changepassword">修改密码 ></span>
				</li>
			</ul>
			<h2>送货地址</h2>
			<ul>
				<li @click="changeaddress">
				<b >我的地址</b>
				<span>></span>
				</li>
			</ul>
		</div>
		<div class="person_bottom"><b>退出登录</b></div>	
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {}
		},
		methods:{
			changephone:function(){
				this.$router.push("/phone");
			},
			changeaddress:function(){
				this.$router.push('/addaddress');
			},
			changepassword:function(){
				this.$router.push('/password');
			}
		}
	}
</script>
<style type="text/css">
	.person_box{
		position: relative;
		width: 100%;
		height: auto;
	}
	h2{
		padding: 2.5vw 4vw 2.5vw 4vw;
		font-size: 12px;
		color: #999;
		letter-spacing: 0.5px;
	}
	.person_top{
		position: fixed;
		width: 100%;
		height: 12vw;
		top: 0;
		overflow: hidden;
		background-image: linear-gradient(90deg,#0af,#0085ff);
		z-index: 1;
	}
	.person_top_mark{
		position: relative;
		width: 8vw;
		height: 10vw;
		padding: 1vw 0 1vw 3vw;
		z-index: 5;
	}
	.person_top_mark img{
		margin-top: 2.5vw;
		width: 6vw;
		height: 5vw;
	}
	.person_top_title{
		position: absolute;
		width:100%;
		height: 100%;
		line-height: 12vw;
		text-align: center;
		color: white;
		z-index: 3;
		font-size: 20px;
	}
	.person_center{
		position: relative;
		padding-top: 12vw;
		width: 100%;
	}
	.person_center ul{
		width: 100%;
		height: auto;
		background-color: white;
	}
	.person_center li{
		padding: 4vw;
	}
	.person_center b{
		font-size: 18px;
		float: left;
		letter-spacing: 2px;
	}
	.person_center span{
		float: right;
		color:#0097ff;
		font-size: 17px;
		letter-spacing: -0.5px;
	}
	.person_bottom{
		position: relative;
		color: #ff5339;
		font-size: 17px;
		padding: 4vw 0 4vw 0;
		text-align: center;
		background-color: white;
		margin-top: 6vw;
	}
</style>