<template>
	<div class="initial_box">
		<div class="initial_top">
			<div class="initial_top_title"><b>我的地址</b></div>
			<div @click="backperson" class="initial_top_mark">
				<img src="../assets/backwhite.png">
			</div>
		</div>
		<div class="initial_center">
			<div class="initial_contacts">
				<div class="initial_name"><b>联系人</b></div>
				<div class="initial_name_input">
					<input type="text" readonly="readonly"  v-model="person.name" name="">
				</div>
			</div>
			<div class="initial_contacts">
				<div class="initial_name"><b>手机</b></div>
				<div class="initial_name_input">
					<input type="text" readonly="readonly" v-model="phone" name="">
				</div>
			</div>
			<div v-show="show" class="initial_contacts">
				<div class="initial_name"><b>地址</b></div>
				<div class="initial_name_input">
					<input type="text" v-model="person.address"  placeholder="请填写详细地址" name="">
				</div>
			</div>
			<div v-show="!show" class="initial_contacts">
				<div class="initial_name"><b>地址</b></div>
				<div class="initial_name_input">
					<input type="text" v-model="person.address" readonly="readonly">
				</div>
			</div>
		</div>
		<div class="initial_bottom">
			<div class="initial_button" @click ="addaddress"><b>确定</b></div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios';
	export default{
		data(){
			return{
				person:{},
				address:"",
				show:true,
				phone:""
			}
		},
		methods:{
			backperson:function(){
				this.$router.push('/major/person');
			},
			addaddress:function(){
				if(this.show==true){
					tip="请输入正确的地址格式"
					reg=/[^/]{10,100}$/
					if(!reg1.test(this.name)){
						this.$store.commit('changetips',tips);
					}
					else{
					var self = this;
						axios.defaults.withCredentials = true;
						this.$store.commit('changecache',true);
						axios.get('http://localhost:1337/user/uuaddress?address='+self.person.address)
							.then(function (data) {
								console.log(data);
								if(data.data.err==false){
									self.person.address=self.address;
							    }
							    self.$store.commit('changecache',false);
							  })
							.catch(function (error) {
								console.log(error);
							});
					}
				}
				else{
					this.$router.push('/major/person');
				}
			}
		},
		mounted:function(){
			var block;
			this.person = window.JSON.parse(localStorage.getItem('person'))
			block = this.person.phone.substr(3, 4);
			this.phone = this.person.phone.replace(block, "****");
			if(this.person.address==null){
				this.show = true;
			}
			else{
				this.show = false;
			}
		}
	}
</script>
<style type="text/css">
	.initial_box{
		position: relative;
		width: 100%;
		height: auto;
	}
	.initial_top{
		position: fixed;
		width: 100%;
		height: 12vw;
		top: 0;
		overflow: hidden;
		background-image: linear-gradient(90deg,#0af,#0085ff);
		z-index: 1;
	}
	.initial_top_mark{
		position: relative;
		width: 8vw;
		height: 10vw;
		padding: 1vw 0 1vw 3vw;
		z-index: 5;
	}
	.initial_top_mark img{
		margin-top: 2.5vw;
		width: 6vw;
		height: 5vw;
	}
	.initial_top_title{
		position: absolute;
		width:100%;
		height: 100%;
		line-height: 12vw;
		text-align: center;
		color: white;
		z-index: 3;
		font-size: 20px;
	}
	.initial_center{
		position: relative;
		height: auto;
		padding: 12vw 0 4vw 4vw;
		background-color: white;
	}
	.initial_contacts{
		overflow: auto;
	}
	.initial_name{
		position: relative;
		width: 17vw;
		height: 8vw;
		line-height: 8vw;
		padding: 4vw 0 4vw 0;
		float: left;
		font-size: 16px;
	}
	.initial_name_input{
		position: relative;
		width: auto;	
		height: 8vw;
		line-height: 8vw;
		padding: 4vw 0 4vw 0;
		overflow: auto;
		padding-right: 3vw;
		border-style: solid;
		border-width: 0 0  0.016px 0;
		border-color: #e6e6e6;
	}
	.initial_name_input input{
		width: auto;
		width: 100%;
		height: 100%;
		border-width: 0px;
		outline: none;
		font-size: 16px;
		letter-spacing: 0.5px;
		color: black;
	}
	.initial_bottom{
		position: relative;
		width: 100%;
		height: auto;
	}
	.initial_button{
		position: relative;
		width: 90vw;
		height: 12vw;
		margin: auto;
		color: white;
		background-color: #00d762;
		border-radius: 1vw;
		margin-top: 6vw;
		text-align: center;
		line-height: 12vw;
		font-size: 19px;
	}
</style>