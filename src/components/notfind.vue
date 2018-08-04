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
								<input type="text" v-model="item.number" @click = "popupshow(item)" class="notfind_show_num_show">
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
				this.$store.commit('changecache',true);
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
				    	self.$store.commit('changecache',false);
				    }
				    else{
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
					else{
						item.number=0;
						item.display = false;
					}
				}
				item.number=item.number.toFixed(1);
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
					this.$store.commit('addshopshow',this.confirmgood);
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
			},
			popupshow:function(item){
				this.$store.commit('obtain',false);
				this.$store.commit('openpopup',item);
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
		height: 28vw;
		overflow: hidden;
		justify-content:center;
		display: flex;
		line-height: 22px;
		margin:10px 0 0 0;
		background-color: white;
	}
	.notfind_say_img{
		position: relative;
		width: 26vw;
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
		position: relative;
		width: 100%;
		height: 28vw;
		margin: auto;
		padding-top: 10px;
		padding-bottom: 15px;
		list-style: none;
		background-color: white;
		border-style: solid;
		border-color: #dbdbdb;
		border-width: 0.016px;	}
	.notfind_show_child_first{
		position: relative;
		height: 20vw;
		width: 94%;
		padding: 0 3% 0px 3%;
		overflow: hidden;
	}
	.notfind_show_child_second{
		margin-top: 10px;
		position: relative;
		height: 8vw;
		float: right;
		width: 40%;
		padding: 0 15px 0px 15px;
	}
	.notfind_show_child_img{
		width: 22vw;
		height: 22vw;
		position: relative;
		border-radius: 3px;
		overflow: hidden;
		float: left;
	}
	.notfind_show_child_img img{
		width: 21.8vw;
		height: 21.8vw;
		border-radius: 3px;
		border-style: solid;
		border-width: 0.1vw;
		border-color: gray;
	}
	.notfind_show_child_p{
		position: relative;
		overflow: hidden;
		width: auto;
		height: 10vw;
		font-size: 18px;
		line-height: 30px;
    	color: rgba(0,0,0,.8);
    	padding-left: 10px;
	}
	.notfind_show_child_num{
		position: relative;
		overflow: hidden;
		width: auto;
		height: 10vw;
    	color: rgba(0,0,0,.8);
    	padding-left: 10px;
    	margin-top: 2.5px;
	}
	.notfind_show_num_mark{
		position: relative;
		width: auto;
		height: 10vw;
		margin-right: 10px;
		float: left;
		font-size: 14px;
		line-height: 30px;
	}
	.notfind_show_num_change{
		position: relative;
		float: left;
		width: 32vw;
		height: 10vw;
		overflow: hidden;
	}
	.notfind_show_num_reduce{
		width: 6vw;
		height: 6vw;
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
		width: 6vw;
		height: 6vw;
		border-radius: 50%;
	}
	.notfind_show_num_add{
		margin-top: 2.5px;
		width: 6vw;
		height: 6vw;
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
		width: 6vw;
		height: 6vw;
		border-radius: 50%;
	}
	.notfind_show_num_show{
		position: relative;
		width: 12vw;
		height: 8vw;
		border-width: 1px;
		border-style: solid;
		border-color: #999;
		float: left;
		text-align: center;
		line-height: 30px;
		font-size: 14px;
		margin: 0 1vw 0 1vw;
		outline: none;
		border-radius: 15px;
	}
	.notfind_show_unit{
		position: relative;
		float: left;
		width: 10vw;
/*		margin-left: 10px;*/
		height: 10vw;
		outline: none;
		appearance:none;
		line-height: 10vw;
		background-color: white;
		font-size: 14px;
		border-radius: 3px;
		text-indent: 4vw;
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