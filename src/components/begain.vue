<template>
	<div class="box">
<!-- 		上框 -->
		<div class="login">
			<div id="login_top">
				<div class="logo">订了么</div>
				<div class="choice">
					<div v-bind:class="{ login_in:isactive,login_in_child:active }" @click = "loginchange" class="login_in">账号登陆</div>
					<div v-bind:class="{ login_up:active,login_up_child:isactive }" @click = "registerchange" class="login_up">账号注册</div>
				</div>
			</div>
			<div id="login_center">
				<component :is="changeable"></component>
			</div>
		</div>
	</div>
</template>
<script>
	import login from './login.vue'
	import register from './register.vue' 
	export default{        name:"message",
		data(){
			return{
				 changeable: login,
				 active: true,
				 isactive: false,
			}
		},
		methods : {
			loginchange: function(){
				this.changeable = login;
				this.active = true;
				this.isactive = false;  

			},
			registerchange: function(){
				this.changeable = register;
				this.active = false;
				this.isactive =true;
			},
			clearall: function(){
				this.$store.commit('cleargoods');
				var t = document.getElementsByTagName('body')[0];
				t.style.backgroundColor="#fff";
			}
		},
		mounted:function(){
			this.clearall();
		}
	}
</script>
<style type="text/css">
	*{
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		padding: 0px;
		margin: 0px;
	}
	.box{
		position: relative;
		width: 100%;
		height: auto;
		padding-top: 40px;
	}
	.login{
		position: relative;
		width: 74%;
		height: auto;
		margin: auto;
	}
	#login_top{
		width: 100%;
		height: auto;
		position: relative;
	}
	#login_center{
		width:100%;
		height: auto;
		position: relative;
		margin: auto;
	}
	.logo{
		width: 140px;
		height: 56px;
		margin: auto;
		overflow: hidden;
		color: #2395ff;
		font-size: 40px;
		text-align: center;
		line-height: 45px;
		font-weight: 550;
		font-family: SimSun;
		letter-spacing:-7px;
	}
	.choice{
		margin: auto;
		margin-top: 40px;
		position: relative;
		width: 100%;
		height: 28px;
		overflow: hidden;
		justify-content:center;
		display: flex;
		line-height: 22px;
	}
	.login_in{
		position: relative;
		width: 58px;
		height: 22px;
		font-size: 14px;
		line-height: 22px;
		margin:  0 20px 0 20px; 
		font-weight: 700;
		text-align: center;
	}
	.login_in_child{
		position: relative;
		width:58px;
		height: 22px;
		font-size: 14px;
		line-height: 22px;
		margin:  0 20px 0 20px; 
		color: #2395ff;
		font-weight: 700;
		text-align: center;
		color: #2395ff;
	}
	.login_in_child:after{
		padding-top: 1px;
		content: "";
		width: 100%;
		display: block;
		border-bottom: 2px solid #2395ff;
	}
	.login_up{
		position: relative;
		width: 58px;
		height: 22px;
		font-size: 14px;
		line-height: 22px;
		margin:  0 20px 0 20px;
		text-align: center;
	}
	.login_up_child{
		position: relative;
		width: 58px;
		height: 22px;
		font-size: 14px;
		line-height: 22px;
		margin:  0 20px 0 20px;
		text-align: center;
		color: #2395ff;
	}
	.login_up_child:after{
		padding-top: 1px;
		content: "";
		display: block;
		border-bottom: 2px solid #2395ff;
		font-weight: 700;
		color: #2395ff;
	}
</style>