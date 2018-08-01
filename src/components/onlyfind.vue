<template>
	<div>
		<div class="only_find_goods">
			<div v-for="(item,index) in items " class="only_show_child">
				<div class="only_show_child_first">
					<div class="only_show_child_img">
						<img v-bind:src="item.filename">
					</div>
					<div class="only_show_child_p"><b>{{goodname}}</b></div>
					<div class="only_show_child_num">
						<div class="only_show_num_mark">购买数量</div>
						<div class="only_show_num_change">
							<button class="only_show_num_reduce" @click = "ochangenum(item,-1)"><img src="../assets/reduce.png"></button>
							<input class="only_show_num_show" @blur="leaves(item)" v-model="item.number" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" type="text" name="">
							<button class="only_show_num_add" @click ="ochangenum(item,1)"><img src="../assets/add.png"></button>	
						</div>
							<select v-model="item.select" class="only_show_unit">
							  <option>斤</option>
							  <option>把</option>
							  <option>包</option>
							  <option>个</option>
							  <option>捆</option>
							  <option>根</option>
							  <option>箱</option>
							  <option>袋</option>
							</select>
							<div class="only_show_unit_mark"><img src="../assets/pull_down.png"></div>
					</div>
				</div>
				<div class="only_show_child_second">
					<div class="only_show_submit" v-show="item.display" @click="onlyshow(item)">添加订单</div>
				</div>
			</div>
		</div>
		<confirmonly v-show="confirmshow"></confirmonly>
	</div>
</template>
<script type="text/javascript">
	import { mapState} from 'vuex'
	import axios from 'axios';
	import confirmonly from './confirm.vue'
	export default{
		data(){
     		return{
     			items:[],
     			num:0,
     			onlygood:[],
     		}
		},
		components: {
			confirmonly
		},
		methods:{
			onlyfind:function(){
				axios.defaults.withCredentials = true;
				var self = this;
				axios.get('http://localhost:1337/user//ahotgood?name='+this.goodname)
				  .then(function (data) {
				  	console.log("添加成功");
				  })
				  .catch(function (error){
				    console.log(error);
				  });
				axios.get('http://localhost:1337/user/fgname?name='+this.goodname)
				  .then(function (data) {
				  	self.items = data.data.result;
				  	for(let i=0;i<self.items.length;i++){
				  		self.$set(self.items[i], 'number',0);
				  		self.$set(self.items[i],'select',"斤");
				  		self.$set(self.items[i],'display',false);
				  	}
				  })
				  .catch(function (error){
				    console.log(error);
				  });
			},
			onlyshow:function(item){
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
			ochangenum:function(item,way){
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
				item.number = item.number.toFixed(1);
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
            	'goodname',
            	'confirmshow'
            ]),
		},
		mounted :function(){
			this.onlyfind();
		}	
	}
</script>
<style type="text/css">
	*{
		border-width: 0px;
		padding:0px;
		margin: 0px;
	}
	.only_only_find_goods{
		position: relative;
		margin-top: 20px;
		width: 100%;
		height: auto;
		overflow: hidden;
	}
	.only_show_submit{
		position: relative;
		width: 20vw;
		height: 8vw;
		text-align: center;
		float: right;
		line-height: 8vw;
		font-size: 14px;
		border-radius: 3px;
		background-color: #0af;
		color: white;
	}
	.only_show_child_second{
		margin-top: 10px;
		position: relative;
		height: 8vw;
		float: right;
		width: 40%;
		padding: 0 15px 0px 15px;
	}
	.only_show_fake{
		position: relative;
		width: 100%;
		height:12.8vw;
	}
	*{
		border-width: 0px;
		padding:0px;
		margin: 0px;
	}
  	.only_show_change{
  		position: relative;
  		width: auto;
  		height: auto;
  		margin-top: 5px;
/*  		background-color: #dbdbdb;*/
  		overflow: hidden;
  	}
	.only_show_child{
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
		border-width: 0.016px;
	}
	.only_show_child_first{
		position: relative;
		height: 20vw;
		width: 94%;
		padding: 0 3% 0px 3%;
		overflow: hidden;
	}
	.only_show_child_img{
		width: 22vw;
		height: 22vw;
		position: relative;
		border-radius: 3px;
		overflow: hidden;
		float: left;
	}
	.only_show_child_img img{
		width: 21.8vw;
		height: 21.8vw;
		border-radius: 3px;
		border-style: solid;
		border-width: 0.1vw;
		border-color: gray;
	}
	.only_show_child_p{
		position: relative;
		overflow: hidden;
		width: auto;
		height: 30px;
		font-size: 18px;
		line-height: 30px;
    	color: rgba(0,0,0,.8);
    	padding-top: 1px;
    	padding-left: 20px;
	}
	.only_show_child_num{
		position: relative;
		overflow: hidden;
		width: auto;
		height: 10vw;
    	color: rgba(0,0,0,.8);
    	padding-left: 20px;
    	padding-top: 2.5px;
	}
	.only_show_num_mark{
		position: relative;
		width: auto;
		height: 10vw;
		margin-right: 10px;
		float: left;
		font-size: 14px;
		line-height: 30px;
	}
	.only_show_num_change{
		position: relative;
		float: left;
		width: 32vw;
		height: 10vw;
		overflow: hidden;
	}
	.only_show_num_reduce{
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
	.only_show_num_reduce img{
		width: 6vw;
		height: 6vw;
		border-radius: 50%;
	}
	.only_show_num_add{
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
	.only_show_num_add img{
		width: 6vw;
		height: 6vw;
		border-radius: 50%;
	}
	.only_show_num_show{
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
	.only_show_unit{
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
	.only_show_unit_mark{
		position: relative;
		margin-top: 5px;
		width: 3vw;
		height: 15px;
		padding-bottom: 2vw;
		float: left;
	}
	.only_show_unit_mark img{
		width: 100%;
		height: 100%;
	}
	.only_show_submit{
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
	.only_show_top_mark{
		position: relative;
		width: 100%;
		height: 30px;
		padding:10px 0 10px 0;
		background-color: white;
	}
	.only_show_border{
		display: flex;
		width: 120px;
		height: 30px;
		font-size: 16px;
		margin: auto;
		line-height: 30px;
		text-align: center;
		-webkit-box-align: center;
	}
	.only_show_border:before{
		content: "";
		display: block;
    	height: 1px;
    	width: 20px;
    	margin-top: 15px;
    	margin-right: 5px;
    	background-color: #999
	}
	.only_show_border:after{
		content: "";
		display: block;
    	height: 1px;
    	width: 20px;
    	float: left;
      	margin-top: 15px;
    	margin-left: 5px;
    	background-color: #999
	}
</style>