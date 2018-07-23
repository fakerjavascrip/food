<template>
	<div>
		<div class="notfind_box">
			<div class="notfind_say">
				<div class="notfind_say_img">
					<img src="../assets/notfind.png">
				</div>
				<div class="notfind_say_write">
					<p class="say_write_p1">本店没有您的搜索结果</p>
					<p class="say_write_p2">换个关键词试试吧</p>
				</div>
			</div>
			<div class="notfind_mark">
				<div class="notfind_show_border"><b>为你推荐</b></div>
			</div>
			<div class="notfind_show">
				<div v-for="(item,index) in items" :key="index"  class="notfind_show_child">
					<div class="notfind_show_child_first">
						<div class="notfind_show_child_img">
							<img v-bind:src="item.filename">
						</div>
						<div class="notfind_show_child_p"><b>{{item.name}}</b></div>
						<div class="notfind_show_child_num">
							<div class="notfind_show_num_mark">购买数量</div>
							<div class="notfind_show_num_change">
								<button class="notfind_show_num_reduce" @click='changenum(item,-1)'><img src="../assets/reduce.png"></button>
								<input type="text" v-model="item.number"  @blur="leaves(item)" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" class="notfind_show_num_show">
								<button class="notfind_show_num_add"  @click='changenum(item,1)'><img src="../assets/add.png"></button>	
							</div>
								<select class="notfind_show_unit">
								  <option value="斤">斤</option>
								  <option value="把">把</option>
								  <option value="包">包</option>
								  <option value="个">个</option>
								  <option value="捆">捆</option>
								  <option value="根">根</option>
								  <option value="箱">箱</option>
								  <option value="袋">袋</option>
								</select>
								<div class="notfind_show_unit_mark"><img src="../assets/pull_down.png"></div>
						</div>
					</div>
					<div class="notfind_show_child_second">
						<div class="notfind_show_submit" v-show="item.display" @click ="notshow(item)">添加订单</div>
					</div>
				</div>
			</div>
		</div>
		<notconfirm v-show="confirmshow"></notconfirm>
	</div>
</template>
<script type="text/javascript">
	import { mapState} from 'vuex'
	import axios from 'axios';
	import notconfirm from './confirm.vue'
	export default{
		name:'show',
		data(){
     		return{
     			items:[],
     			num:[],
     			notgood:[]
     		}
		}, 
		components: {
			notconfirm
		},
		methods:{
			item:function(){
				axios.defaults.withCredentials = true;
				var self = this;
				axios.get('http://localhost:1337/user/fgall/')
				  .then(function (data) {
				    if(data.data.err==false){
				    	self.items=data.data.result;
				    	for(let i=0;i<data.data.result.length;i++){
				    		self.$set(self.items[i], 'number', 0);
				    		self.$set(self.items[i], 'select', "斤");
				    		self.$set(self.items[i],'display',false);
				    	}
				    }
				    else{
				    	
				    	console.log("失败");
				    }
				  })
				  .catch(function (error){
				    console.log(error);
				  });
			},
			changenum:function(item,way){
				item.number=parseFloat(item.number);
				if(way>0){
					item.number=item.number+1;
					item.display=true;
				}
				else{
					if(item.number>=1){
						item.number=item.number-1;
						if(item.number==0){
							item.display = false;
						}
					}
				}
			},
			notshow:function(item){
				item.number=parseFloat(item.number);
				item.display = false;
				//js的深拷贝,每次开辟新的空间
				function deepCopy(p, c) {
				　　　　var c = c || {};
				　　　　for (var i in p) {
				　　　　　　if (typeof p[i] === 'object') {
				　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
				　　　　　　　　deepCopy(p[i], c[i]);
				　　　　　　} else {
				　　　　　　　　　c[i] = p[i];
				　　　　　　}
				　　　　}
				　　　　return c;
				　　}
				this.confirmgood = deepCopy(item);
				if(item.number>0){ 
					this.$store.commit('addshopping',this.confirmgood);
				}
				item.number=0;
			},
			leaves:function(item){
				if(item.number==""){
					item.number =0;
				}
				item.number = parseFloat(item.number);
				if(item.number==0){
					item.display = false;
				}
				else if(item.number>0){
					item.display=true;
				}
			}	
		},
		computed:{
            ...mapState([
            	'confirmshow'
            ]),
		},
		mounted :function(){
			this.item();
		}
	}
</script>
<style type="text/css">
	.notfind_box{
		position: relative;
		width: 100%;
		height: auto;
		background-color: #f8f8f8;
	}
	.notfind_say{
		margin: auto;
		position: relative;
		width: 100%;
		height: 100px;
		overflow: hidden;
		justify-content:center;
		display: flex;
		line-height: 22px;
		margin:10px 0 0 0;
		background-color: white;
	}
	.notfind_say_img{
		position: relative;
		width: 80px;
		height: auto;
		margin-top: 20px;
	}
	.notfind_say_img img{
		width: 100%;
		height: auto;
	}
	.notfind_say_write{
		position: relative;
		width: auto;
		height: 40px;
		margin-top: 25px;
		margin-left: 5px;
	}
	.say_write_p1{
		font-size: 14px;
		color: #666;
	}
	.say_write_p2{
		font-size: 12px;
		color: #999;
	}
	.notfind_mark{
		position: relative;
		width: 100%;
		height: 50px;
		background-color: #f8f8f8;
	}
	.notfind_show{
		position: relative;
		width: 100%;
		height: auto;
	}
	.notfind_mark{
		position: relative;
		width: 100%;
		height: 30px;
		padding:10px 0 10px 0;
		background-color: #f8f8f8;
		color: #333;
	}
	.notfind_show_border{
		display: flex;
		width: 120px;
		height: 30px;
		font-size: 16px;
		margin: auto;
		line-height: 30px;
		text-align: center;
		-webkit-box-align: center;
	}
	.notfind_show_border:before{
		content: "";
		display: block;
    	height: 1px;
    	width: 20px;
    	margin-top: 15px;
    	margin-right: 5px;
    	background-color: #999
	}
	.notfind_show_border:after{
		content: "";
		display: block;
    	height: 1px;
    	width: 20px;
    	float: left;
      	margin-top: 15px;
    	margin-left: 5px;
    	background-color: #999
	}
	.notfind_show_child{
		width: 100%;
		height: 95px;
		position: relative;
		margin: auto;
		margin-top: 1px;
		padding-top: 10px;
		padding-bottom: 15px;
		list-style: none;
		background-color: white;
		margin-bottom: 10px;
	}
	.notfind_show_child_first{
		position: relative;
		height: 75px;
		width: 94%;
		padding: 0 3% 0px 3%;
		overflow: hidden;
	}
	.notfind_show_child_second{
		position: relative;
		height: 20px;
		width: 100%;
		padding: 0 15px 0px 15px;
	}
	.notfind_show_child_img{
		width: 74px;
		height: 74px;
		position: relative;
		border-radius: 3px;
		overflow: hidden;
		float: left;
	}
	.notfind_show_child_img img{
		width: 73px;
		height: 73px;
		border-radius: 3px;
		border-style: solid;
		border-width: 0.2px;
		border-color: gray;
	}
	.notfind_show_child_p{
		position: relative;
		overflow: hidden;
		width: auto;
		height: 30px;
		font-size: 18px;
		line-height: 30px;
    	color: rgba(0,0,0,.8);
    	padding-left: 10px;
	}
	.notfind_show_child_num{
		position: relative;
		overflow: hidden;
		width: auto;
		height: 30px;
    	color: rgba(0,0,0,.8);
    	padding-left: 10px;
    	margin-top: 2.5px;
	}
	.notfind_show_num_mark{
		position: relative;
		width: auto;
		height: 30px;
		margin-right: 10px;
		float: left;
		font-size: 14px;
		line-height: 30px;
	}
	.notfind_show_num_change{
		position: relative;
		float: left;
		width: 130px;
		height: 30px;
		overflow: hidden;
	}
	.notfind_show_num_reduce{
		width: 22px;
		height: 21px;
		float: left;
		font-size: 14px;
		margin: 5px 5px 0px 0px;
		outline: none;
		background-color: white;
		border-width: 0.5px;
		border-style: solid;
		border-color: #0af;
		border-radius: 50%;
	}
	.notfind_show_num_reduce img{
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}
	.notfind_show_num_add{
		margin-top: 2.5px;
		width: 22px;
		height: 22px;
		margin: 5px 0px 0px 5px;
		float: left;
		outline: none;
		background-color: white;
		border-width: 0.5px;
		border-style: solid;
		border-color: #0af;
		border-radius: 50%;
	}
	.notfind_show_num_add img{
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}
	.notfind_show_num_show{
		position: relative;
		width: 60px;
		height: 28px;
		border-width: 1px;
		border-style: solid;
		border-color: #999;
		float: left;
		text-align: center;
		line-height: 30px;
		font-size: 14px;
		margin: 0 5px 0 5px;
		outline: none;
		border-radius: 15px;
	}
	.notfind_show_unit{
		position: relative;
		float: left;
		width: 40px;
/*		margin-left: 10px;*/
		height: 30px;
		outline: none;
		appearance:none;
		line-height: 30px;
		background-color: white;
		font-size: 14px;
		border-radius: 3px;
		text-indent: 18px;
	}
	.notfind_show_unit_mark{
		position: relative;
		margin-top: 5px;
		width: 15px;
		height: 15px;
		padding-bottom: 10px;
		float: left;
	}
	.notfind_show_unit_mark img{
		width: 100%;
		height: 100%;
	}
	.notfind_show_submit{
		position: relative;
		width: 65px;
		height: 20px;
		text-align: center;
		float: right;
		margin-right: 40px;
		line-height: 20px;
		font-size: 14px;
		border-radius: 3px;
		background-color: #0af;
		color: white;
	}
</style>