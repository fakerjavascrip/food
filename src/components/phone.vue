<template>
	<div class="phone_box">
		<div class="phone_top">
			<div class="phone_top_title"><b>绑定手机</b></div>
			<div @click="backperson" class="phone_top_mark">
				<img src="../assets/backwhite.png">
			</div>
		</div>
		<div class="phone_center">
			<div class="phone_contacts">
				<div class="phone_vcode">获取验证码</div>
				<div class="phone_name">手机号</div>
				<div class="phone_name_input">
					<input type="text" readonly="readonly" v-model = "phone" name="">
				</div>
			</div>
			<div class="phone_contacts">
				<div class="phone_name">验证码</div>
				<div class="phone_name_input">
					<input type="text" oninput="if(value.length>6) value=value.slice(0,6);" v-model="vcode" @blur="vcodelose" @keyup="vcodelose" placeholder="输入验证码" name="">
				</div>
			</div>
		</div>
		<div class="phone_bottom">
			<div class="phone_button" @click = "updatephone">验证后绑定手机号码</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios';
	export default{
		data(){
			return{
				person:{},
				phone:"",
				vcode:"",
			}
		},
		methods:{
			getphone:function(){
				var block;
				this.person = window.JSON.parse(localStorage.getItem('person'));
				block = this.person.phone.substr(3, 4);
				this.phone = this.person.phone.replace(block, "****");
			},
			backperson:function(){
				this.$router.push('/major/person');
			},
			// updatephone:function(){
			// 	var patrn=/^(\w){6}$/;
			// 	if (patrn.exec(this.vcode)){
			// 		var self = this;
			// 		var address;
			// 		axios.defaults.withCredentials = true;
			// 		axios.get('http://localhost:1337/user/ubphone?nphone='+)
			// 		.then(function (data) {
			// 			if(data.data.err==false){
			// 				address = data.data.result[0];
			// 				window.localStorage.setItem('person',JSON.stringify(address));
			// 				if(address.address==null){
			// 					self.$router.push('/addaddress');
			// 				}
			// 			}
			// 			else{
			// 			    console.log("失败");
			// 			}
			// 		})
			// 		.catch(function (error) {
			// 			console.log(error);
			// 		});
			// 	}
			// },
			vcodelose:function(){
				var t = document.getElementsByClassName('phone_button')[0];
				var patrn=/^(\w){6}$/;
				if (patrn.exec(this.vcode)){
					t.style.backgroundColor="#4cd964";
				}
				else{
					t.style.backgroundColor="#ccc";
				}
			}
		},
		mounted:function(){
			this.getphone();
		}
	}
</script>
<style type="text/css">
	.phone_box{
		position: relative;
		width: 100%;
		height: auto;
	}
	.phone_top{
		position: fixed;
		width: 100%;
		height: 12vw;
		top: 0;
		overflow: hidden;
		background-image: linear-gradient(90deg,#0af,#0085ff);
		z-index: 1;
	}
	.phone_top_mark{
		position: relative;
		width: 8vw;
		height: 10vw;
		padding: 1vw 0 1vw 3vw;
		z-index: 5;
	}
	.phone_top_mark img{
		margin-top: 2.5vw;
		width: 6vw;
		height: 5vw;
	}
	.phone_top_title{
		position: absolute;
		width:100%;
		height: 100%;
		line-height: 12vw;
		text-align: center;
		color: white;
		z-index: 3;
		font-size: 20px;
	}
	.phone_center{
		position: relative;
		height: auto;
		margin-top: 15vw;
		padding: 0 0 0 4vw;
		background-color: white;
	}
	.phone_contacts{
		position: relative;
		width: 100%;
		height: 16vw;
		overflow: hidden;
	}
	.phone_name{
		position: relative;
		width: 19vw;
		height: 8vw;
		line-height: 8vw;
		padding: 4vw 0 4vw 0;
		float: left;
		font-size: 17px;
		letter-spacing: 1px;
	}
	.phone_name_input{
		position: relative;
		width: 100%;
		margin-left: 19vw;	
		height: 8vw;
		line-height: 8vw;
		padding: 4vw 0 4vw 0;
		padding-right: 3vw;
	}
	.phone_name_input input{
		width: auto;
		width: 100%;
		height: 100%;
		border-width: 0px;
		outline: none;
		font-size: 16px;
	}
	.phone_vcode{
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
	.phone_bottom{
		position: relative;
		width: 100%;
		height: auto;
	}
	.phone_button{
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