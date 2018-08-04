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
							<input type="text" v-model="item.number" @click ="popupshow(item)" readonly="readonly"  class="show_num_show">
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
     			address:{},
     		}
		}, 
		methods:{
			citem:function(){
				this.$store.commit('changecache',true);
				axios.defaults.withCredentials = true;
				var self = this;
				axios.get('http://localhost:1337/user/fgall/')
				  .then(function (data) {
				    if(data.data.err==false){
				    	self.items=data.data.result;
				    	for(let i=0;i<data.data.result.length;i++){
				    		self.$set(self.items[i], 'number', 0.0);
				    		self.$set(self.items[i], 'select', "斤");
				    		self.$set(self.items[i], 'display', false);
				    	}
				    	self.$store.commit('changecache',false);
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
					else{
						item.number=0;
						item.display = false;
					}
				}
				item.number=item.number.toFixed(1);
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
					this.$store.commit('addshopshow',this.confirmgood);
				}
				item.number=0;
			},
			leaves:function(item){
				if(item.number==""){
					item.number =0;
				}
				item.number = parseFloat(item.number);
				item.number = item.number.toFixed(1);
				if(item.number==0){
					item.display = false;
				}
				else if(item.number>0){
					item.display=true;
				}
			},
			vaddress:function(){
				var self = this;
				var xixi = window;
				var address;
				this.$store.commit('changecache',true);
				axios.defaults.withCredentials = true;
				axios.get('http://localhost:1337/user/ufperson/')
				.then(function (data) {
					if(data.data.err==false){
						address = data.data.result[0];
						xixi.localStorage.setItem('person',JSON.stringify(address));
						self.$store.commit('c1angecache',false);
						if(address.address==null){
							self.$router.push('/addaddress');
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
			popupshow:function(item){
				this.$store.commit('obtain',false);
				this.$store.commit('openpopup',item);
			}
		},
		mounted :function(){
			this.citem();
			this.vaddress();
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
	.show_child_second{
		margin-top: 10px;
		position: relative;
		height: 8vw;
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
/*  		background-color: #dbdbdb;*/
  		overflow: hidden;
  	}
	.show_child{
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
	.show_child_first{
		position: relative;
		height: 30vw;
		width: 94%;
		padding: 0 3% 0px 3%;
		overflow: hidden;
	}
	.show_child_img{
		width: 22vw;
		height: 22vw;
		position: relative;
		border-radius: 3px;
		overflow: hidden;
		float: left;
	}
	.show_child_img img{
		width: 21.8vw;
		height: 21.8vw;
		border-radius: 3px;
		border-style: solid;
		border-width: 0.1vw;
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
		height: 10vw;
    	color: rgba(0,0,0,.8);
    	padding-left: 20px;
    	padding-top: 2.5px;
	}
	.show_num_mark{
		position: relative;
		width: auto;
		height: 10vw;
		margin-right: 10px;
		float: left;
		font-size: 14px;
		line-height: 30px;
	}
	.show_num_change{
		position: relative;
		float: left;
		width: 32vw;
		height: 10vw;
		overflow: hidden;
	}
	.show_num_reduce{
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
	.show_num_reduce img{
		width: 6vw;
		height: 6vw;
		border-radius: 50%;
	}
	.show_num_add{
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
	.show_num_add img{
		width: 6vw;
		height: 6vw;
		border-radius: 50%;
	}
	.show_num_show{
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
	.show_unit{
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
	.show_unit_mark{
		position: relative;
		margin-top: 5px;
		width: 3vw;
		height: 15px;
		padding-bottom: 2vw;
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