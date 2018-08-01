<template>
	<div>
		<div class="order_center">
			<div v-for="(item,index) in items" :key="index"  class="order_center_good">
				<div class="order_time">
				    <div class="order_time_title">{{item.date}}</div>
					<div class="order_time_state">{{item.mark}}</div>
				</div>
				<div class="order_find">
					<div class="order_find_sublime" @click = "changedate(index)">查看订单</div>
				</div>
			</div>
		</div>
		<div class="order_bottom">
			<div class="order_bottom_color">
				<div class="order_bottom_box">
					<div class="order_border">暂无更多</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios'
	export default{
		data(){
			return {
				items:[],
			}
		},
		methods : {
			finddate:function(){
				//查找日期
				var self = this;
		    	var now = new Date();
				var  time= now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
				axios.defaults.withCredentials = true;
				axios.get('http://localhost:1337/user/ufdate/')
				  .then(function (data) {
				    if(data.data.err==false){
				    	//如果没有订单的时候前往的路由
				    	if(data.data.result.length==0){
				    		self.$router.push('/major/order/noorder');
				    	}
				    	self.items=data.data.result;
				    	for(let i=0;i<data.data.result.length;i++){
				    		if(time==data.data.result[i].date){
				    			self.$set(self.items[i], 'mark', "订单未送达")
				    		}
				    		else{
				    			self.$set(self.items[i], 'mark', "订单已送达");
				    		}
				    	}
				    }
				    else{
				    	console.log("失败");
				    }
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
			},
			changedate:function(index){
				this.$store.commit('updatedate',this.items[index].date);
				
				this.$router.push('/detailed');
			}
		},
		mounted:function(){
			this.finddate();
		}
	}
</script>
<style type="text/css">
	.order_center{
		position: relative;
		padding-top: 12vw;
		width: 100%;
		height: auto;
		background-color: #f5f5f5;
	}
	.order_center_good{
		position: relative;
		width: 100%;
		height: auto;
		background-color: white;
		margin-top: 3vw;
	}
	.order_time{
		position: relative;
		width: 100%;
		height: auto;
/*		border-width:  0px  0px  0.004vw 0px;*/
		border-color: #e6e6e6;
		border-style: solid;
		overflow: hidden;
	}
	.order_time_title{
		position: relative;
		width: 75%;
		height: 10vw;
		padding:3vw 0 3vw 0;
		float: left;
		text-indent: 7vw;
		line-height: 10vw;
		font-size: 20px;
	}
	.order_time_state{
		position: relative;
		width: 100%;
		height: 10vw;
		padding:3vw 0 3vw 0;
		margin-left:75%; 
		line-height: 10vw;
		font-size: 15px;
	}
	.order_goodname{
		position: relative;
		width: 100%;
		height: auto;
/*		border-width:  0px  0px  0.004vw 0px;*/
		border-color: #e6e6e6;
		border-style: solid;
	}
	.order_goodname_title{
		position: relative;
		width: 100%;
		height: 10vw;
		font-size: 15px;
		line-height: 10vw;
/*		padding:2vw 0 2vw 0;*/
		text-indent: 7vw;
	}
	.order_find{
		position: relative;
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	.order_find_sublime{
		position: relative;
		width: 20vw;
		height: 6vw;
		text-align: center;
		line-height: 6vw;
		float: right;
		right: 5vw;
		border-radius: 1vw;
		margin: 3.5vw 0 3.5vw 0;
		border-color:  #2395ff;
		border-width: 1px;
		border-style: solid;
		color: #2395ff;
	}
	.order_bottom{
		position: relative;
		width: 100%;
		height: auto;
		background-color: #f5f5f5;
		padding-top: 2vw;
	}
	.order_bottom_box{
		padding: 3vw 0 2vw 0;
		position: relative;
		width: 160px;
		height: 30px;
		margin: auto;
		overflow: hidden;
	}
	.order_border{
		display: flex;
		width: auto;
		height: 30px;
		font-size: 16px;
		margin: auto;
		line-height: 30px;
		text-align: center;
		-webkit-box-align: center;
	}
	.order_border:before{
		content: "";
		display: block;
    	height: 1px;
    	width: 40px;
    	margin-top: 15px;
    	margin-right: 5px;
    	background-color: #999
	}
	.order_border:after{
		content: "";
		display: block;
    	height: 1px;
    	width: 40px;
    	float: left;
      	margin-top: 15px;
    	margin-left: 5px;
    	background-color: #999
	}
</style>