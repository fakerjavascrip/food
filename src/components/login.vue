<template>
		<div class="login_form">
			<div class="login_phone">
				<input type="text" v-model="phone" name="" placeholder="手机号">
			</div>
			<div class="login_password">
				<input type="password" v-model="password" name="" placeholder="密码">
			</div>
			<div class="login_prompt">
				<p>温馨提示：使用新鲜蔬注册后的手机号登录,并且代表您已同意服务</p>
			</div>
			<div class="login_submit"> 
				<button @click ='login'>登录</button>
			</div>
			<div class="login_about" @click ="retrieve">找回密码</div>
		</div>
</template> 
<script type="text/javascript">
	import axios from 'axios';
	import {mapState} from 'vuex';
	export default{
		data(){
			return{
				phone:'18149498393',
				password:'node123',
			}
		},
		methods : {
			login:function(){
				var tips;
				//验证手机号的正则
				var reg1=/^[1][3,4,5,7,8][0-9]{9}$/;
				//验证密码的正则
				var reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
				if(!reg1.test(this.phone)){
					tips = "请填写合法手机号"
					this.$store.commit('changetips',tips);
				}
				else if(!reg2.test(this.password)){
					tips = "密码错误"
					this.$store.commit('changetips',tips);
				}
				else{
					var self = this;
					this.$store.commit('changecache',true);
					axios.defaults.withCredentials = true;
					axios.get('http://localhost:1337/user/login?phone='+this.phone+'&password='+this.password)
					  .then(function (data) {
					  	console.log(data);
					    if(data.data.err==false){
						    self.$router.push('/major');
						    self.$store.commit('changecache',false);
					    }
					    else{
					    	self.$store.commit('changecache',false);
							tips = "密码错误"
							self.$store.commit('changetips',tips);
					    }
					  })
					  .catch(function (error) {
					  	self.$store.commit('changecache',false);
							tips = "服务器后台出现问题"
							self.$store.commit('changetips',tips);
					  });
				}
			},retrieve:function(){
				this.$router.push('./retrieve');
			}
		},
		computed:{
            ...mapState([
            	'tipsshow'
            ]),
		},
	}	
</script>
<style type="text/css">
	*{
		padding:0px;
		margin: 0px;
		border-width: 0px;
		outline: none;
	}
	.login_form{
		width: 100%;
		height: auto;
		position: relative;
	}
	.login_phone{
		width: auto;
		height: auto;
		position: relative;
		margin-top: 16px;
		font-size: 14px;
/*		display: block;*/
	}
	.login_password{
		margin-top: 16px;
		position: relative;
		height: auto;
		width: auto;
		font-size: 14px;
/*		display: block;*/
	}
	.login_prompt{
		position: relative;
		margin-top: 12px;
		font-size: 14px;
		width: 100%;
		height: 40px;
		color: #999;
	}
	.login_prompt p{
		font-size: 14px;
		float: left;
	}
	.login_prompt a{
		font-size: 14px;
		text-decoration: none;
		color: #2395ff;
		cursor: pointer;
	}
	.login_phone input{
		width: 100%;
		height:46px; 
/*		background-color:#fff ;*/
/*		color: #333;*/
		border-radius: 4px;
		border:1px solid #ddd;
		font-size: 14px;
/*		outline: none;*/
		outline:none;
		text-indent: 10px;
	}
	.login_phone input:focus{
		border-color: #2395ff;
	}
	.login_password input{
		width: 100%;
		height:46px;
		font-size: 14px;
/*		background-color: #fff;*/
		color: black;
		border:1px solid #ddd; 
		border-radius: 4px;
		outline:none;
		text-indent: 10px;
	}
	.login_password input:focus{
		border-color: #2395ff;
	}	
	.login_submit{
		position: relative;
		width: 100%;
		height: auto;
		margin-top: 30px;
	}
	.login_submit button{
		width: 100%;
		height: 42px;
		outline: none;
		text-align: center;
		line-height: 42px;
		border-radius: 4px;
		background-color: #4cd96f;;
		color: white;
		font-size: 16px;
		cursor: pointer;
		border: none;
	}
	.login_about{
		color: #999;
		position: relative;
		width: 100%;
		height: 14px;
		margin-top: 20px;
		text-align: center;
		font-size: 12px;
		line-height: 14px;
	}
</style>