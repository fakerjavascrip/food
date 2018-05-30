<template>
	<div>
		<ul class="change">
			<li v-for="(item,index) in items " class="show_child">
				<div class="show_child_img">
					<img src="https://img.meituan.net/100.100.90/xianfudwm/6621d4d2092d5b03fa9cabf3c2947695170846.jpg">
				</div>
				<div class="show_child_p">{{item.message}}</div>
				<div class="show_child_number">
					<input type="text" placeholder="点击输入" name="">
				</div>
				<div class="show_child_ok">
					<input type="button" value="提交"  name="">
				</div>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'show',
		data(){
     		return{
     			items:[
     			{message:"哈哈"},
     			{message:"嘻嘻"},
     			{message:"呼呼"},
     			{message:"哈哈"},
     			{message:"嘻嘻"},
     			{message:"呼呼"},
     			{message:"哈哈"},
     			{message:"嘻嘻"},
     			{message:"呼呼"}
     			]
     		}
		}
	}
</script>
<style type="text/css">
  ul{
    padding: 0px;
    margin: 0px;
  }
	.show_child{
		width: 94.5%;
		height: 120px;
		position: relative;
		margin: auto;
		margin-top: 10px;
		list-style: none;
		border-width: 1px;
		border-style: solid;
		border-color: rgba(0,0,0,.3);
	}
	.show_child_img{
		width: 100px;
		height: 100px;
		padding: 10px;
		position: relative;
		float: left;
	}
	.show_child_img img{
		width: 100%;
		height: 100%;
	}
	.show_child_p{
		top: 10px;
		position: relative;
		overflow: hidden;
		width: auto;
		height: 30px;
		text-align: center;
		font-size: 24px;
		line-height: 30px;
    	color: rgba(0,0,0,.8);
	}
	.show_child_number{
		position: relative;
		overflow: hidden;
		width: auto;
		top: 10px;
		height: 30px;
		line-height: 30px;

	}
	.show_child_number input{
		position: relative;
		width: 100%;
		height: 30px;
		line-height: 26px;
		text-indent: 20px;
		border-width: 0px;
		font-size: 18px;
		color: rgba(0,0,0,.5);
	}
	.show_child_ok{
		position: relative;
		overflow: hidden;
		width: auto;
		height: 30px;
		top: 15px;
		line-height: 30px;
	}
	.show_child_ok input{
		position: relative;
		width: 50%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 18px;
		margin-left: 25%;
	}
</style>