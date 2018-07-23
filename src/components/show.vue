<template>
	<div>
		<div class="show_change">
			<div class="show_top_mark">
				<div class="show_border">推荐蔬菜</div>
			</div>
			<div v-for="(item,index) in items" :key="index"  class="show_child">
				<div class="show_child_first">
					<div class="show_child_img">
						<img v-bind:src="item.filename">
					</div>
					<div class="show_child_p"><b>{{item.name}}</b></div>
					<div class="show_child_num">
						<div class="show_num_mark">购买数量</div>
						<div class="show_num_change">
							<button class="show_num_reduce" @click='changenum(item,-1)'><img src="../assets/reduce.png"></button>
							<input type="text" v-model="item.number"  @blur="leaves(item)"  onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" class="show_num_show">
							<button class="show_num_add"  @click='changenum(item,1)'><img src="../assets/add.png"></button>	
						</div>
							<select v-model="item.select" class="show_unit">
							  <option v-for="(itemt,index) in currency" :value="itemt.unit">{{itemt.unit}}</option>
							</select>
							<div class="show_unit_mark"><img src="../assets/pull_down.png"></div>
					</div>
				<div class="show_child_second">
					<div class="show_submit" v-show = "item.display" @click="addshow(item)">添加订单</div>
				</div>
				</div>
			</div>
			<div class="show_fake"></div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios';
	import { mapState} from 'vuex'
	export default{
		name:'show',
		data(){
     		return{
     			items:[],
     			num:[],
     			//加单位的属性
     			currency:[{unit:"斤"},{unit:"把"},{unit:"包"},{unit:"个"},{unit:"捆"},{unit:"根"},{unit:"箱"},{unit:"袋"}],
     			select:"斤",
     			confirmgood:[],
     			shoppinggood:[],
     		}
		}, 
		methods:{
			citem:function(){
				axios.defaults.withCredentials = true;
				var self = this;
				axios.get('http://localhost:1337/user/fgall/')
				  .then(function (data) {
				    if(data.data.err==false){
				    	self.items=data.data.result;
				    	for(let i=0;i<data.data.result.length;i++){
				    		self.$set(self.items[i], 'number', 0);
				    		self.$set(self.items[i], 'select', "斤");
				    		self.$set(self.items[i], 'display', false);
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
			addshow(item){
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
		mounted :function(){
			this.citem();
		},
		computed:{
            ...mapState([
            	'number'
            ]),
		},
	}
</script>
<style type="text/css">
	.show_submit{
		position: relative;
		width: 65px;
		height: 20px;
		text-align: center;
		float: right;
		line-height: 20px;
		font-size: 14px;
		border-radius: 3px;
		background-color: #0af;
		color: white;
	}
	.show_child_second{
		margin-top: 10px;
		position: relative;
		height: 20px;
		float: right;
		width: 40%;
		padding: 0 15px 0px 15px;
	}
	.show_fake{
		position: relative;
		width: 100%;
		height:12.8vw;
	}
	*{
		border-width: 0px;
		padding:0px;
		margin: 0px;
	}
  	.show_change{
  		position: relative;
  		width: auto;
  		height: auto;
  		margin-top: 5px;
  		background-color: #cdcdcd;
  		overflow: hidden;
  	}
	.show_child{
		width: 100%;
		height: 95px;
		position: relative;
		margin: auto;
		margin-top: 1px;
		padding-top: 10px;
		padding-bottom: 15px;
		list-style: none;
		background-color: white;
	}
	.show_child_first{
		position: relative;
		height: 100px;
		width: 94%;
		padding: 0 3% 0px 3%;
		overflow: hidden;
	}
	.show_child_img{
		width: 100px;
		height: 100px;
		position: relative;
		border-radius: 3px;
		overflow: hidden;
		float: left;
	}
	.show_child_img img{
		width: 99px;
		height: 99px;
		border-radius: 3px;
		border-style: solid;
		border-width: 0.2px;
		border-color: gray;
	}
	.show_child_p{
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
	.show_child_num{
		position: relative;
		overflow: hidden;
		width: auto;
		height: 30px;
    	color: rgba(0,0,0,.8);
    	padding-left: 20px;
    	padding-top: 2.5px;
	}
	.show_num_mark{
		position: relative;
		width: auto;
		height: 30px;
		margin-right: 10px;
		float: left;
		font-size: 14px;
		line-height: 30px;
	}
	.show_num_change{
		position: relative;
		float: left;
		width: 130px;
		height: 30px;
		overflow: hidden;
	}
	.show_num_reduce{
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
	.show_num_reduce img{
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}
	.show_num_add{
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
	.show_num_add img{
		width: 20px;
		height: 20px;
		border-radius: 50%;
	}
	.show_num_show{
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
	.show_unit{
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
	.show_unit_mark{
		position: relative;
		margin-top: 5px;
		width: 15px;
		height: 15px;
		padding-bottom: 10px;
		float: left;
	}
	.show_unit_mark img{
		width: 100%;
		height: 100%;
	}
	.show_submit{
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
	.show_top_mark{
		position: relative;
		width: 100%;
		height: 30px;
		padding:10px 0 10px 0;
		background-color: white;
	}
	.show_border{
		display: flex;
		width: 120px;
		height: 30px;
		font-size: 16px;
		margin: auto;
		line-height: 30px;
		text-align: center;
		-webkit-box-align: center;
	}
	.show_border:before{
		content: "";
		display: block;
    	height: 1px;
    	width: 20px;
    	margin-top: 15px;
    	margin-right: 5px;
    	background-color: #999
	}
	.show_border:after{
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