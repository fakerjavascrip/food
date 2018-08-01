<template>
	<div class="prove_box">
		<div class="prove_top">
			<div class="prove_top_title"><b>确认订单</b></div>
			<div class="prove_top_mark"  @click="backpay"><img src="../assets/backwhite.png"></div>
		</div>
		<div class="prove_address"> 
			<div class="text"  style="text-overflow:ellipsis;">{{person.address}}</div>
		</div>
		<div class="prove_who">
			<div>{{person.name}}</div>
			<div>{{person.phone}}</div>
		</div>
		<div class="prove_center">
			<div class="prove_center_date">
				<div class="prove_date_mark">下单时间</div>
				<div class="prove_date_time">当天时间({{date}})</div>
			</div>
			<div class="prove_center_kind">
				<div class="prove_kind_mark">下单方式</div>
				<div class="prove_kind_kind">线上下单</div>
			</div>
		</div>
		<div class="prove_bottom">
			<div class="prove_title"><p>精品在线蔬菜店</p></div>
			<div class="prove_goods" v-for="(item,index) in items" :key="index">
				<div class="prove_goods_img">
					<img v-bind:src="item.filename">
				</div>
				<div class="prove_goods_title">
					<div class="prove_goods_num">{{item.number}}</div>
					<div class="prove_goods_name">{{item.name}}</div>
					<div class="prove_goods_unit">{{item.select}}</div>
				</div>
			</div>
		</div>
		<div class="prove_bottom_mark">
			<div class="prove_mark_prove">
				<div class="prove_mark_mark">预计配寄时间</div>
				<div class="prove_mark_message">{{tdate}}</div>
			</div> 
			<div class="prove_mark_prove">
				<div class="prove_mark_mark">发票信息</div>
				<div class="prove_mark_message">线下发票</div>
			</div>
			<div class="prove_mark_prove">
				<div v-show="judge" class="prove_mark_mark">订单备注</div>
				<div v-show="judge" class="prove_mark_message" @click = "special">请选择<b style="font-size:20px; ">></b></div>
				<div v-show="!judge" class="prove_message">{{message}}</div>
				<div v-show="!judge" class="prove_message_mark" @click = "special">请修改 ></div>
			</div>
		</div>

		<gopay></gopay>
	</div>
</template>
<script type="text/javascript">
	import { mapState} from 'vuex'
    import gopay from './gopay.vue'
    import axios from 'axios';
	export default{
		data(){
			return{
				items:this.$store.getters.vegetables,
				judge:true,
				person:{},
				date:"",
				tdate:"",
			}
		},

	    components:{gopay},
		methods:{
			special:function(){
				this.$router.push('/determine')
			},
			backpay:function(){
				this.$store.commit('addplus');
				this.$router.push('/major');
			},
			judgemessage:function(){
				if(this.message!=""){
					this.judge=false;
				}
				else{
					this.judge=true;
				}
				this.person = window.JSON.parse(localStorage.getItem('person'));
			},
			nowdate:function(){
				var time;
				time = new Date();
				this.date= time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
				var time2 =  new Date(time.getTime() + 24*60*60*1000);
				this.tdate = time2.getFullYear()+"-"+(time2.getMonth()+1)+"-"+time2.getDate();
			}
		},
	    computed:{
	        ...mapState([
	        'message'
	        ]),
	    }, 
	    mounted:function(){
	    	this.nowdate();
	    	this.judgemessage();

	    }
	}
</script>
<style type="text/css">
	*{
		margin: 0px;
		padding: 0px;
		border-width: 0px;
	}
	.prove_box{
		position: relative;
		width: 100%;
		height: auto;
/*		从左到右的过度*/
		background-image: linear-gradient(90deg,#0af,#0085ff);
		padding-bottom: 18vw;
		overflow: hidden;
	}
	.prove_top{
		position: fixed;
		width: 100%;
		height: 12vw;
		top: 0;
		overflow: hidden;
/*		padding-bottom: 4vw;*/
		background-image: linear-gradient(90deg,#0af,#0085ff);
		z-index: 1;
	}
	.prove_address{
		position: relative;
		width: 90%;
		margin: auto;
		height: 7vw;
		line-height: 7vw;
		padding-top: 18vw;
		font-size: 24px;
		color: white;
		font-weight: 700;
	}
	.prove_address .text{
		white-space:nowrap; 
		width:100%; 
		overflow:hidden; 
	}
	.prove_who{
		position: relative;
		width: 100%;
		height: auto;
		padding-top: 1vw;
		overflow: hidden;
		background-image: linear-gradient(90deg,#0af,#0085ff);
	}
	.prove_top_mark{
		position: relative;
		width: 8vw;
		height: 10vw;
		padding: 3vw 0 3vw 3vw;
		z-index: 5;
	}
	.prove_top_mark img{
		margin-top: 2.5vw;
		width: 6vw;
		height: 5vw;
	}
	.prove_top_title{
		position: absolute;
		width:100%;
		height: 100%;
		line-height: 12vw;
		text-align: center;
		color: white;
		z-index: 3;
		font-size: 20px;
	}
	.prove_who div{
		width: auto;
		height: 6vw;
		position: relative;
		float: left;
		color: white;
		text-align: center;
		padding: 2vw 6vw 2vw 6vw;
	}
	.prove_center{
		position: relative;
		width: 96%;
		height: auto;
		background-color: white;
		margin: auto;
		overflow: hidden;
		margin-bottom: 6vw;
	}
	.prove_center_date{
		position: relative;
		width: 100%;
		height: 10vw;
		overflow: hidden;
		padding: 3vw 0 3vw 0;
	}
	.prove_date_mark{
		position: relative;
		color: black;
		width: 45vw;
		height: 10vw;
		padding-left: 5vw;
		line-height: 10vw;
		float: left;
	}
	.prove_date_time{
		position: relative;
		color: #2395ff;
		width: auto;
		line-height: 10vw;
		height: 10vw;
		font-size: 17px;
	}
	.prove_center_kind{
		position: relative;
		width: 100%;
		height: 10vw;
		overflow: hidden;
		padding: 3vw 0 3vw 0;
	}
	.prove_kind_mark{
		position: relative;
		color: black;
		width: 45vw;
		height: 10vw;
		padding-left: 5vw;
		line-height: 10vw;
		float: left;	
	}
	.prove_kind_kind{
		position: relative;
		color: #2395ff;
		width: auto;
		line-height: 10vw;
		height: 10vw;
		font-size: 17px;
		text-indent: 20vw;
	}	
	.prove_bottom{
		position: relative;
		width: 96%;
		height: auto;
		background-color: white;
		padding-bottom: 3vw;
		overflow: hidden;
		margin: auto;
		margin-top: 2vw;
		margin-bottom: 6vw;
	}
	.prove_goods{
		position: relative;
		width: 100%;
		height: auto;
		overflow: hidden;
		padding: 3vw 0 3vw 0;
		display:flex;
		border-style: solid;
		border-width: 0.02px 0 0 0.02px;
		border-color: #e6e6e6;
	}
	.prove_title{
		position: relative;
		width: 100%;
		padding: 5vw 0 5vw 0;
		font-weight: 700;
		font-size: 18px;
		text-indent: 5vw;
	}
	.prove_goods_img{
		flex: 0 0 auto;
		position: relative;
		width: 13vw;
		height: 13vw;
		float: left;
		padding-left: 5vw;
	}
	.prove_goods_img img{
		width: 100%;
		height: 100%;
	}
	.prove_goods_title{
		position: relative;
		flex: 1 1 auto;
		padding: 0 10vw 0 14vw;
		overflow: hidden;
	}
	.prove_goods_name{
		position: relative;
		width: 20vw;
		height: 12vw;
		margin-left: -100%;
		float: left;
		line-height: 12vw;
		left: -10vw;
	}
	.prove_goods_num{
		position: relative;
		width: 100%;
		height: 12vw;
		float: left;
		line-height: 12vw;
		text-align: center;
	}
	.prove_goods_unit{
		position: relative;
		width: 10vw;
		height:12vw;
		margin-left: -10vw;
		float: left;
		right: -10vw;
		line-height: 12vw;
		color:#ff4a07;
	}
	.prove_bottom_mark{
		position: relative;
		width: 96%;
		height: auto;
		background-color: white;
		margin: auto;
		margin-top: 2vw;
	}
	.prove_mark_prove{
		position: relative;
		width: 100%;
		height: 6vw;
		font-size: 16px;
		padding: 6vw 0 6vw 0;
		border-style: solid;
		border-width: 0.02px 0 0 0.02px;
		border-color: #e6e6e6;
		color: #333;
		overflow:hidden;
	}
	.prove_mark_mark{
		position: relative;
		width: 40vw;
		height: 100%;
		float: left;
		line-height: 6vw;
		font-weight: 500;
		text-indent: 3vw;
	}
	.prove_mark_message{
		position: relative;
		width: 100%; 
		height: 100%;
		margin-left: 40vw;
		line-height: 6vw;
		text-indent: 28vw;
		color: #bbb;
	}
	.prove_message{
		position: relative;
		width: 70vw;
		height: 100%;
		float: left;
		line-height: 6vw;
		font-weight: 500;
		text-indent: 3vw;
		overflow: hidden;
	}
	.prove_message_mark{
		position: relative;
		width: 100%; 
		height: 100%;
		margin-left: 70vw;
		line-height: 6vw;
		font-weight: 700;
		font-size: 19px;
		color: #bbb;
	}
</style>