<template>
	<div class="register_form">
		<div class="register_input">
			<input type="text" name="" v-model="name" placeholder="店铺名">
		</div>
		<div class="register_input">
			<input type="text" name="" v-model="phone" placeholder="手机号">
		</div>
		<div class="register_input">
			<input type="text" name="" v-model = "password" placeholder="密码">
		</div>
		<div class="register_input" >
			<input type="text" name="" v-model="vcode" placeholder="验证码">	
			<button @click = "getvcode" class="register_vcode">获取验证码</button>
		</div>
		<input type="button" @click = "register" class="register_submit" value="注册" />
		<div class="login_about" @click = "inabout">关于我们</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios';
	export default{
		data(){
			return{
				name:"",
				phone:"",
				password:"",
				vcode:"",
			}
		},
		methods : {
			register:function(){
				var tips;
				var reg1,reg2,reg3,reg4;
				//店铺名正则
				reg1=/[^/]{1,15}$/
				//手机正则
				reg2=/^[1][3,4,5,7,8][0-9]{9}$/;
				//密码正则
				reg3=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
				//验证码正则
				reg4=/^\d{4}$/;
				if(!reg1.test(this.name)){
					tips = "请输入合法的店铺名";
					this.$store.commit('changetips',tips);
				}
				else if(!reg2.test(this.phone)){
					tips = "请输入合法的手机号";
					this.$store.commit('changetips',tips);
				}
				else if(!reg3.test(this.password)){
					tips = "密码格式错误";
					this.$store.commit('changetips',tips);
				}
				else if(!reg4.test(this.vcode)){
					tips= "验证码错误";
					this.$store.commit('changetips',tips);
				}
				else{
					this.$store.commit('changecache',true);
					axios.get('http://localhost:1337/user/register',{
						params:{
							name: this.name,
							phone: this.phone,
							password: this.password,
							vcode: this.vcode
						}
					}).then(function (response) {
					    self.$store.commit('changecache',false);
					    this.$router.push('/');
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
				}
			},
			getvcode: function(){
				var reg2=/^[1][3,4,5,7,8][0-9]{9}$/;
				var tips;
				if(!reg2.test(this.phone)){
					tips = "请输入合法的手机号";
					this.$store.commit('changetips',tips);
				}
				else{
					axios.get('http://localhost:1337/user/vcode',{
						params:{
							phone: this.phone,
						}
					}).then(function (response) {
					    console.log(response);
					  })
					  .catch(function (error) {
					    console.log(error);
					  });
				}
			},
			inabout:function(){
				this.$router.push('/aboutme');
			}
		}
	}
</script>
<style type="text/css">
	*{
		padding: 0px;
		margin: 0px;
		border: none;
	}
	.register_form{
		position: relative;
		width: 100%;
		height: auto;
		margin: auto;
	}
	.register_input{
		width: auto;
		height: auto;
		position: relative;
		margin-top: 16px;
		font-size: 14px;
	}
	.register_input input{
		width: 100%;
		height:46px; 
		color: #333;
		border-radius: 4px;
		border:1px solid #ddd;
/*		outline: none;*/
		outline:none;
		text-indent: 10px;
		font-size: 14px;
	}
	.register_input input:focus{
		border-color: #2395ff;
	}
	.register_vcode{
		position: absolute;
		width: 70px;
		height: 19px;
		line-height: 19px;
		text-align: center;
		font-size: 14px;
		padding:0px;
		display: inline-block;
		color: #2395ff;
		top: 50%;
		right: 8%;
		transform: translateY(-50%);
		background-color:white;
		outline: none;
		border: none;
	}
	.register_submit{
		position: relative;
		width: 100%;
		height: 42px;
		outline: none;
		text-align: center;
		line-height: 42px;
		border-radius: 4px;
		background-color: #4cd96f;
		color: white;
		font-size: 14px;
		cursor: pointer;
		margin-top: 20px;
	}
</style>