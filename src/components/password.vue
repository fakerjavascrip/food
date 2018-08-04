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
					<input type="password" v-model="password.old"  @blur="oldlose" placeholder="旧密码" name="">
					<span v-show="show.first">密码长度为 6－20 位数字和字母</span>
				</li>
				<li class="password_mark">
					<input type="password" v-model="password.new1" @blur="new1lose" placeholder="新密码" name="">
					<span v-show="show.second">密码长度为 6－20 位数字和字母</span>
				</li>
				<li class="password_mark">
					<input type="password" v-model="password.new2" @blur="new2lose" placeholder="确认密码" name="">
					<span v-show="show.third">两次密码输入不一致</span>
				</li>
			</ul>
		</div>
		<div class="password_bottom">
			<div class="password_button" @click="newpassword">确认并保存</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios'; 
	export default{
		data(){
			return{
				password:{
					old:"",
					new1:"",
					new2:"",
				},
				show:{
					first:false,
					second:false,
					third:false
				}
			}
		},
		methods:{
			backperson:function(){
				this.$router.push('/major/person');
			},
			oldlose:function(){
				var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
				if(this.password.old.match(reg)||this.password.old==""){
				    this.show.first = false;
				}
				else{
					this.show.first = true;
				} 
				//修改button的样式，原生js而不是用vue1的修改class
				var t=document.getElementsByClassName('password_button')[0];
				if(this.password.old!=""&&this.password.new1!=""&&this.password.new2!=""&&this.show.first==false&&this.show.second==false&&this.show.third==false){
					t.style.backgroundColor="#3199e8";
				}
				else{
					t.style.backgroundColor="#ccc";
				}
			},
			new1lose:function(){
				var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
				if(this.password.new1.match(reg)||this.password.new1==""){
				    this.show.second = false;
				}
				else{
					this.show.second = true;
				}
				if(this.password.new1!=this.password.new2&&this.password.new2!=""&&this.password.new1!=""&&this.show.second==false){
					this.show.third = true;
				}
				var t=document.getElementsByClassName('password_button')[0];
				if(this.password.old!=""&&this.password.new1!=""&&this.password.new2!=""&&this.show.first==false&&this.show.second==false&&this.show.third==false){
					t.style.backgroundColor="#3199e8";
				}
				else{
					t.style.backgroundColor="#ccc";
				} 
			},
			new2lose:function(){
				//不用加验证字母加数字的正则只需要新密码2和1比较即可
				var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
				if(this.show.second==false&&this.password.new1!=""&&this.password.new1!=this.password.new2){
					this.show.third=true;
				}
				else{
						this.show.third = false;
				}
				var t=document.getElementsByClassName('password_button')[0];
				if(this.password.old!=""&&this.password.new1!=""&&this.password.new2!=""&&this.show.first==false&&this.show.second==false&&this.show.third==false){
					t.style.backgroundColor="#3199e8";
				}
				else{
					t.style.backgroundColor="#ccc";
				}
			},
			clearsession:function(){
				var self = this;
				this.$store.commit('changecache',true);
				axios.defaults.withCredentials = true;
				axios.get('http://localhost:1337/user/close/')
				.then(function(data){
					self.$store.commit('changecache',false);
				})
				.catch(function(error){
					console.log(err);
				})
			},
			newpassword:function(){
				//点击上传和验证密码和修改密码
				//当三个数据都填入且正确的时候
				if(this.password.old!=""&&this.password.second!=""&&this.show.first==false&&this.show.second==false&&this.show.third==false){
					var self = this;
					var address;
					this.$store.commit('changecache',true);
					axios.defaults.withCredentials = true;
					axios.get('http://localhost:1337/user/upcipher?password='+this.password.old+'&npassword='+this.password.new1)
					.then(function (data) {
						if(data.data.err==false){
							self.clearsession();
							self.$router.push('/');
							self.$store.commit('changecache',false);
						}
						else{
						}
					})
					.catch(function (error) {
						console.log(error);
					});
				}
			}
		},
		mounted:function(){
				var self = this;
				var address;
				this.$store.commit('changecache',true);
				axios.defaults.withCredentials = true;
				axios.get('http://localhost:1337/user/ufperson/')
				.then(function (data) {
					if(data.data.err==false){
						address = data.data.result[0];
						window.localStorage.setItem('person',JSON.stringify(address));
						if(address.address==null){
							self.$router.push('/addaddress');
						}
						self.$store.commit('changecache',false);
					}
					else{
					    console.log("失败");
					}
				})
				.catch(function (error) {
					console.log(error);
				});
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
		height: auto;
		padding: 1.5vw 0 1.5vw 0;
	}
	.password_center span{
		color: red;
		font-size: 14px;
	}
	.password_center input{
		width: 100%;
		height: 11vw;
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
		background-color: #ccc;
		border-radius: 1vw;
		margin-top: 4vw;
		text-align: center;
		line-height: 12vw;
		font-size: 19px;
		font-weight: 800;
	}

</style>