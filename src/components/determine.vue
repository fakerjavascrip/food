<template>
	<div class="determine_box">
		<div class="determine_top">
			<div class="determine_top_title"><b>订单备注</b></div>
			<div class="determine_top_mark"  @click="backprove"><img src="../assets/backwhite.png"></div>
		</div>
		<div class="determine_center">
			<div class="determine_center_box">
				<textarea name="a" v-model="information" placeholder="填写额外对今天订单备注的信息"></textarea>
			</div>
		</div>
		<div class="determine_bottom">
			<button class="determine_bottom_button" @click= "changemessage">确定</button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import { mapState} from 'vuex'
	export default{
		data(){
			return{
				information:""
			}
		},
		methods:{
			backprove:function(){
				this.$router.push('/prove');
			},
			changemessage:function(){
				this.$store.commit('newmessage',this.information);
				this.$router.push('/prove');
			},
			assignment:function(){
				if(this.message!=""){
					this.information = message;
				}
			}
		},
		computed:{
			...mapState([
				'message'
				])
		},
		mounted:function(){
			this.assignment();
		}
	}
</script>
<style type="text/css">
	.determine_box{
		position: relative;
		width: 100%;
		height: 100vh;
		background-color: #f9f9f9;
	}
	.determine_top{
		position: fixed;
		width: 100%;
		height: 12vw;
		top: 0;
		overflow: hidden;
/*		padding-bottom: 4vw;*/
		background-image: linear-gradient(90deg,#0af,#0085ff);
		z-index: 1;
	}
	.determine_top_mark{
		position: relative;
		width: 8vw;
		height: 10vw;
		padding: 1vw 0 1vw 3vw;
		z-index: 5;
	}
	.determine_top_mark img{
		margin-top: 2.5vw;
		width: 6vw;
		height: 5vw;
	}
	.determine_top_title{
		position: absolute;
		width:100%;
		height: 100%;
		line-height: 12vw;
		text-align: center;
		color: white;
		z-index: 3;
		font-size: 20px;
	}
	.determine_center{
		position: relative;
		width: 100%;
		height: auto;
		padding-top: 12vw;
		padding-bottom: 20vw;
		background-color: white;
	}
	.determine_center_box{
		position: relative;
		width: 92vw;
		height: 25vw;
		margin: 7vw 4vw 0vw 4vw;
		background-color: #f9f9f9;
	}
	.determine_center_box textarea{
		position: relative;
		word-break:break-all;
		word-wrap: break-word;
		width: 90%;
		height: 88%;
		padding: 6% 5% 6% 5%;
		outline: none;
		line-height: 6vw;
		font-size: 15px;
		color: #666;
		background-color: #f9f9f9;
		border-radius: 4vw;
	}
	.determine_bottom{
		position: relative;
		width: 94%;
		height: 13vw;
		margin: auto;
		padding-top:4vw; 
	}
	.determine_bottom_button{
		width: 100%;
		height: 100%;
		background-color: #00e067;
		text-align: center;
		font-size: 18px;
		line-height: 13vw;
		border-radius: 1vw;
		outline: none;
		color: white;
	}
</style>