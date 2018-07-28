<template>
	<div style="z-index: 15">
		<div class="confirm_color" @click ="hidden"></div>
		<div class="confirm_box">
			<div class="confirm_content">
				<div class="confirm_top">
					<div class="confirm_mark"></div>
				    <div class="confirm_mark_title">已选商品</div>
				    <div class="confirm_mark_clear" @click = "cleargoods">清空</div>
				</div>
				<div class="confirm_center">
					<div class="confirm_vegetables" v-for="(item,index) in itemgood">
						<div class="confirm_title">{{item.name}}</div>
						<div class="confirm_unit"><span>{{item.select}}</span></div>
						<div class="confirm_num">
							<button class="confirm_num_reduce" @click='changenum(item,-1)'><img src="../assets/reduce.png"></button>
							<input type="text" v-model="item.number" @blur="leaves(item)" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" class="confirm_num_show">
							<button class="confirm_num_add"  @click='changenum(item,1)'><img src="../assets/add.png"></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios';
	import {mapState} from 'vuex'
	export default{
		data(){
			return{
				itemgood:this.$store.getters.vegetables
			}
		},
		methods:{
			// addgood:function(){
			// 	this.items=this.$store.getters.vegetables;
			// 	console.log(this.items);
			// },
			changenum:function(item,mark){
				item.number=parseFloat(item.number);
				if(mark==1){
					item.number=item.number+1;
				}
				else if(mark==-1&&item.number>=1){
					item.number=item.number-1;
					if(item.number==0){
						this.$store.commit('reduceshopping',item);
					}
				}
			},
			cleargoods:function(){
				this.$store.commit('cleargoods');
			},
			hidden:function(){
				this.$store.commit('changeconfirm');
			},
			leaves:function(item){
				if(item.number==""){
					item.number =0;
				}
				item.number = parseFloat(item.number);
				if(item.number==0){
					this.$store.commit('reduceshopping',item);
				}
			}
		},
		computed: {
            ...mapState([
           	'amount',
           	'confirmshow'
            ]),
        }, 
	}
</script>
<style type="text/css">
	.confirm_color{
		position: fixed;
		width: 100%;
		height: 100vh;
		background-color: gray;
		opacity: 0.4;
		bottom: 0px;
	}
	.confirm_box{
		position: fixed;
		width: 100%;
		height: auto;
		bottom: 12.8vw;
		z-index: 100;
		max-height: 55vh;
		overflow: auto;
	}
	.confirm_content{
		width: 100%;
		height: 100%;
		position: relative;
		background-color: white;
		overflow: hidden;
	}
	.confirm_top{
		width: 100%;
		height: 6vh;
		margin: auto;
		margin-top: 2vh;
		position: relative;
		font-size: 21px;
		line-height: 6vh;
		text-indent: 15px;
		overflow: hidden;
		background-color: #eceff1;
		color: #666;
	}
	.confirm_mark{
		position: relative;
		width: 4px;
		height: 3vh;
		background-color: #2395ff;
		margin-left: 12px;
		margin-top: 1.5vh;
		float: left;
	}
	.confirm_mark_title{
		position: relative;
		float: left;
		width: auto;
		font-size: 17px;
	}
	.confirm_mark_clear{
		position: relative;
		width: auto;
		padding: 0 7vw 0 0;
		float: right;
		font-size: 17px;
	}
	.confirm_center{
		width: 100%;
		height: auto;
		position: relative;
		margin: auto;
/*		padding: 0 0 4vh 0;*/
	}
	.confirm_vegetables{
		position: relative;
		width: 100%;
		height: 6vh;
		border-style: solid;
		border-color:#dbdbdb;
		border-width: 0.1px 0 0.1px 0;
		padding: 3vw 0 3vw 0;
	}
	.confirm_title{
		position: relative;
		width: 45vw;
		height: 100%;
		line-height: 6vh;
		font-size: 18px;
		float: left;
		text-indent: 25px;
	}
	.confirm_unit{
		position: relative;
		width: 15vw;
		height: 100%;
		font-size: 18px;
		line-height: 6vh;
		float: left;
		color: #ff5339;
	}
	.confirm_num{
		position: relative;
		width: 40vw;
		height: 100%;
		float: left;
	}
	.confirm_num_reduce{
		width: 3.4vh;
		height: 3.4vh;
		float: left;
		font-size: 14px;
		margin: 1.3vh 0 0px 0px;
		outline: none;
		background-color: white;
		border-width: 0.5px;
		border-style: solid;
		border-color: #0af;
		border-radius: 50%;
	}
	.confirm_num_reduce img{
		width: 3vh;
		height: 3vh;
		border-radius: 50%;
	}
	.confirm_num_add{
		width: 3.4vh;
		height: 3.4vh;
		margin: 1.3vh 0px 1.3vh 0vh;
		float: left;
		outline: none;
		background-color: white;
		border-width: 0.5px;
		border-style: solid;
		border-color: #0af;
		border-radius: 50%;
	}
	.confirm_num_add img{
		width: 3vh;
		height: 3vh;
		border-radius: 50%;
	}
	.confirm_num_show{
		position: relative;
		width: 60px;
		height: 4vh;
		border-width: 1px;
		border-style: solid;
		border-color: #999;
		float: left;
		text-align: center;
		line-height: 30px;
		font-size: 14px;
		margin: 1vh 2vh 0 2vh;
		outline: none;
		border-radius: 15px;
	}
	.confirm_bottom{
		position: relative;
		width: 100%;
		height: 8vh;
		bottom: 0px;
		overflow: hidden;
	}
	.confirm_button_back{
		position: relative;
		width: 60%;
		height: 100%;
		font-weight: 700;
		outline: none;
		color: white;
		font-size: 24px;
		line-height: 8vh;
		text-indent: 70px;
		float: left;
/*		border-radius: 150px 0 0 0 ;*/
		background-color: rgba(61,61,63,.9);
	}
	.confirm_button_confirm{
		position: relative;
		width: 40%;
		height: 100%;
		outline: none;
		color: white;
		font-size: 24px;
		line-height: 8vh;
		text-align: center;
		font-weight: 700;
		float: left;
		background-color:#38ca73;
	}
</style>
