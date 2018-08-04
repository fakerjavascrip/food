<template>
	<div v-show="popup" class="popup_box">
		<div class="popup_cover"></div>
		<div class="popup_show">
			<div class="popup_mark">修改购买数量</div>
			<div class="popup_num">
				<div class="popup_input">
					<input v-model="items.number" @blur="leaves()" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" @focus="initial"  type="text" name="">
				</div>
			</div>
			<div class="popup_enter">
				<div class="popup_choice_left" @click ="notshow">我再想想</div>
				<div class="popup_choice_right" @click="entershow">确定</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {mapState} from 'vuex';
	export default{
		data(){
			return{
				num:false
			}
		},
		methods:{
			notshow:function(){
				if(this.num){
					this.items.number = this.num;
					this.$store.commit('closepopup');
				}
				else{
					this.$store.commit('closepopup');
				}
			},
			entershow:function(){
				if(this.items.number>0){
					this.items.display = true;
				}
				if(this.items.number==0){
					if(this.second){
						this.$store.commit('reduceshopping',this.items);
					}
					else{
						this.items.display = false;
					}
				}
				this.$store.commit('closepopup');
			},
			initial:function(){
				console.log(this.items);
				this.num = this.items.number;			
			},
			leaves:function(){
				if(this.items.number==""){
					this.items.number =0;
				}
				this.items.number = parseFloat(this.items.number);
				this.items.number = this.items.number.toFixed(1);
			}
		},
		computed:{
			...mapState([
				'popup',
				'popnum'
			]),
			second:{
			    get () {
			      return this.$store.state.second
			    },
			},
			items:{
				get(){
					return this.$store.getters.doneTodos
				}
			},
		},
		mounted:function(){
		}
	}
</script>
<style type="text/css">
	*{
		margin: 0px;
	}
	.popup_box{
		position: fixed;
		width: 100%;
		height:100vh;
		z-index: 1000;
	}
	.popup_cover{
		position: absolute;
		width: 100%;
		height: 100vh;
		background-color: gray;
		opacity: 0.3;
		bottom: 0px;
	}
	.popup_show{
		position: relative;
		width: 70vw;
		height:22vh;
		background-color: white;
		margin: auto;
		margin-top: 25vh;
		overflow: hidden;
	}
	.popup_mark{
		position: relative;
		padding: 2vh;
		width: auto;
		height: 4vh;
		line-height: 4vh;
		font-size: 17px;
	}
	.popup_num{
		position: relative;
		width: auto;
		height: 5vh;
		padding: 2vh;
	}
	.popup_input{
		position: relative;
		width: 25vw;
		height: 5vh;
		line-height: 5vh;
		margin: auto;
		border-width: 1px;
		border-color: black;
		border-style: solid;
	}
	.popup_input input{
		position: relative;
		width: 100%;
		height: 100%;
		outline: none;
		text-align: center;
		font-size: 17px;
	}
	.popup_enter{
		position: relative;
		width: auto;
		padding: 0 1vw 0.5vh 1vw;
		height: 4.5vh;
		line-height: 4.5vh;
		overflow: hidden;
		color: white;
	}
	.popup_choice_left{
		position: relative;
		width: 49.5%;
		margin-right: 0.5%;
		height: 100%;
		float: left;
		text-align: center;
		background-color: gray;
	}
	.popup_choice_right{
		position: relative;
		width: 49.5%;
		height: 100%;
		margin-left: 0.5%;
		float: left;
		text-align: center;
		background-color: #2395ff;
		font-size: 17px;
		letter-spacing: 0.5vw;
	}
</style>