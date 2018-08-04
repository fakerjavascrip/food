<template>
	<div class="retrieve_box">
		<div class="retrieve_top">
			<div class="retrieve_top_title"><b>找回密码</b></div>
			<div @click="backbegin" class="retrieve_top_mark">
				<img src="../assets/backwhite.png">
			</div>
		</div>
		<div class="retrieve_center">
			<div class="retrieve_contacts">
				<div class="retrieve_vcode" @click="getvcode">获取验证码</div>
				<div class="retrieve_name">手机号</div>
				<div class="retrieve_name_input">
					<input type="text"  placeholder="输入手机号" v-model = "phone" name="">
				</div>
			</div>
			<div class="retrieve_contacts">
				<div class="retrieve_name">验证码</div>
				<div class="retrieve_name_input">
					<input type="text" oninput="if(value.length>6) value=value.slice(0,6);" v-model="vcode" @blur="vcodelose" @keyup="vcodelose" placeholder="输入验证码" name="">
				</div>
			</div>
		</div>
		<div class="retrieve_bottom">
			<div class="retrieve_button" @click = "getpassword">验证后获取密码</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios';
	export default{
		data(){
			return{
				phone:"",
				vcode:""

			}
		},
		methods:{
			backbegin:function(){
				this.$router.push('/');
			},
			vcodelose:function(){
				var t = document.getElementsByClassName('retrieve_button')[0];
				var patrn=/^(\w){6}$/;
				if (patrn.exec(this.vcode)){
					t.style.backgroundColor="#4cd964";
				}
				else{
					t.style.backgroundColor="#ccc";
				}
			},
			getpassword:function(){
				var tips;
				//验证码正则
				var reg=/^\d{4}$/; 
				if(!reg.test(this.vcode)){
					tips = "请填写合法验证码"
					this.$store.commit('changetips',tips);
				}
				else{
					//上传验证码密码发给手机号
				}
			},
			getvcode:function(){
				var tips;
				//手机正则
				var reg=/^[1][3,4,5,7,8][0-9]{9}$/;
				if(!reg.test(this.phone)){
					tips = "请填写合法手机号"
					this.$store.commit('changetips',tips);
				}
				else{
					alert("你好");
					//获取验证码
				}
			}
		},
		mounted:function(){
		}
	}
</script>
<style type="text/css">
	.retrieve_box{
		position: relative;
		width: 100%;
		height: auto;
	}
	.retrieve_top{
		position: fixed;
		width: 100%;
		height: 12vw;
		top: 0;
		overflow: hidden;
		background-image: linear-gradient(90deg,#0af,#0085ff);
		z-index: 1;
	}
	.retrieve_top_mark{
		position: relative;
		width: 8vw;
		height: 10vw;
		padding: 1vw 0 1vw 3vw;
		z-index: 5;
	}
	.retrieve_top_mark img{
		margin-top: 2.5vw;
		width: 6vw;
		height: 5vw;
	}
	.retrieve_top_title{
		position: absolute;
		width:100%;
		height: 100%;
		line-height: 12vw;
		text-align: center;
		color: white;
		z-index: 3;
		font-size: 20px;
	}
	.retrieve_center{
		position: relative;
		padding: 12vw 4vw 0 4vw;
	}
	.retrieve_center h3{
		position: relative;
		padding: 5vw 0 1vw 0;
		font-size: 16px;
	}
	.retrieve_center p{
		position: relative;
		padding: 2vw 0 2vw 0;
	}
	.retrieve_center{
		position: relative;
		height: auto;
		margin-top: 15vw;
		padding: 0 0 0 4vw;
		background-color: white;
	}
	.retrieve_contacts{
		position: relative;
		width: 100%;
		height: 16vw;
		overflow: hidden;
	}
	.retrieve_name{
		position: relative;
		width: 19vw;
		height: 8vw;
		line-height: 8vw;
		padding: 4vw 0 4vw 0;
		float: left;
		font-size: 17px;
		letter-spacing: 1px;
	}
	.retrieve_name_input{
		position: relative;
		width: 100%;
		margin-left: 19vw;	
		height: 8vw;
		line-height: 8vw;
		padding: 4vw 0 4vw 0;
		padding-right: 3vw;
	}
	.retrieve_name_input input{
		width: auto;
		width: 100%;
		height: 100%;
		border-width: 0px;
		outline: none;
		font-size: 16px;
	}
	.retrieve_vcode{
		position: absolute;
		width: 26vw;
		height: 8vw;
		line-height: 8vw;
		text-align: center;
		margin: 4vw 0 4vw 0;
		color: white;
		border-radius: 1px;
		right: 4vw;
		background-color: #0097ff;
		z-index: 1;
	}
	.retrieve_bottom{
		position: relative;
		width: 100%;
		height: auto;
	}
	.retrieve_button{
		position: relative;
		width: 90vw;
		height: 12vw;
		margin: auto;
		color: white;
		border-radius: 1vw;
		margin-top: 6vw;
		text-align: center;
		line-height: 12vw;
		font-size: 16.5px;
		font-weight: 700;
		background-color: #ccc;
	}
</style>

您的验证码为${code},该验证码5分钟内有效，请勿泄露于他人。