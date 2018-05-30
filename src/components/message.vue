<template>
	<div>
		<div class="message_haha">订单信息查询</div>
		<div class="message_title" v-for="(item,index) in date">
			<div class="message_title_slide">
				<div class="message_title_mark" @click="chked(item)">
					<img src="../assets/slide.png">
				</div>
				<div class="message_title_write">
					{{item.title}}:{{index}}
				</div>
				<ul v-show="item.checked">
					<li class="message_title_write" v-for
					 ="(shop,index) in shoping">
						<div class="message_title_name">商品名 : {{shop.name}}</div>
						<div class="message_title_num">重量 : 32 kg</div>
						<div class="message_title_edit"><input type="button" value="修改" name=""></div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name:"message",
		data(){

			return{
				shows : -1,
				date:[
				{title:"2018年04月20日"},
				{title:"2018年02月24日"},
				{title:"2017年07月04日"},
				{title:"2017年01月23日"},
				{title:"2017年01月23日"}
				],
				shoping:[
				{name:"哈哈",},
				{name:"嘻嘻"},
				{name:"呼呼"}
				],
			}
		},
		methods : {
			chked:function(item){
				if(typeof item.checked=='undefined'){
					this.$set(item,"checked",true);
					// Vue.set(item,"checked",true);
				}
				else{
					item.checked = !item.checked;
				}
			}
		}
	}
</script>
<style type="text/css">
	img{
		width: 100%;
		height: 100%;
	}
	.message_haha{
		top: 10px;
		width: 94.5%;
		height: 30px;
		font-size: 25px;
		text-indent: 20px;
		position: relative;
		overflow: hidden;
		line-height: 30px;
		color: rgba(0,0,0,0.7);
	}
	.message_title{
		top: 15px;
		position: relative;
		width: 94.5%;
		height: auto;
		border-width: 1px;
		border-style: solid;
		margin: auto;
		border-color: rgba(0,0,0,0.5);
		margin-top: 10px;
	}
	.message_title_slide{
		width: 100%;
		height: auto;
		position: relative;
		overflow: hidden;
	}
	.message_title_mark{
		width: 40px;
		height: 40px;
		position: relative;
		float: right;
	}
	.message_title_slide ul{
		width: auto;
		height: auto;
		position: relative;
		overflow: hidden;
	}
	.message_title_write{
		width: auto;
		height: 40px;
		position: relative;
		border-width: 0.5px;
		border-style: solid;
		border-color: rgba(0,0,0,0.5);
		line-height: 40px;
		text-indent: 10px;
		overflow: hidden;
	}
	.message_title_num{
		width: 31%;		
		position: relative;
		float: left;
	}
	.message_title_name{
		width: 31%;
		height: 40px;
		position: relative;
		float: left
	}
	.message_title_edit{
		width: 30%;
		height: 40px;
		position: relative;
		float: right;
	}
	.message_title_edit input{
		width: 60%;
		height: 40px;
		background-color: white;
		float: right;
	}
	.show_ul{
		display: normal;
	}
	.hidden_li{
		display: none;
	}
</style>