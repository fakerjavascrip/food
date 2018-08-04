import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [createLogger()],
	state :{
		goodname:"",
		//验证有多少数据在购物车
		amount:0,
		//是否显示登录的界面
	    login: false, //是否登录
	    //是否显示整个订单
	    confirmshow:false,
	    //是否显示最后提交
	    gopayshow:false,
	    //是否可以让它提交订单
	    plus: false,
	    //订单详细内容
	    date:"",
	    message:"",
	    tipsshow:false,
	    tips:"",
	    popup:false,
	    popnum:0,
	    second:0,
	    goods: [],
    	//购物车
    	shopping:[],
    	cacheshow:false,
		},
		getters: {
			doneTodos: state => {
		    	return state.goods;
		    },
			vegetables: state => {
		    	return state.shopping;
		    },
		},
		mutations: {
			changeconfirm(state){
				state.confirmshow =!state.confirmshow;
				window.localStorage.setItem('confirmm',JSON.stringify(state.confirmshow));
			},
			// changegopay(state){
			// 	state.gopayshow =!state.gopayshow;
			// 	window.localStorage.setItem('gopayshow',JSON.stringify(state.gopayshow));
			// },
			reduceplus(state){
				state.plus = false;
				window.localStorage.setItem('plus',JSON.stringify(state.plus));
			},
			addplus(state){
				state.plus=true;
				window.localStorage.setItem('plus',JSON.stringify(state.plus));
			},
			noconfirm(state){
				state.confirmshow = false;
				window.localStorage.setItem('confirmm',JSON.stringify(state.confirmshow));
			},
			cgoodname(state,strs){
				//不用存localstorage
				state.goodname=strs;
			},
			updateMessage (state, goodname) {
				//不用存localstorage
			    state.goodname = goodname
			},
			//添加购物车中商品
			addshopping(state,item){
				var canrun = true;
				item.number = parseFloat(item.number);
				for(let i=0;i<state.amount;i++){
					if(state.shopping[i].name==item.name&&item.select==state.shopping[i].select){
						state.shopping[i].number = item.number;
						canrun=false;
					}
				}
				window.localStorage.setItem('shop',JSON.stringify(state.shopping));
			},
			//从商品展示中加入购物车
			addshopshow(state,item){
				var canrun = true;
				item.number = parseFloat(item.number);
				for(let i=0;i<state.amount;i++){
					if(state.shopping[i].name==item.name&&item.select==state.shopping[i].select){
						state.shopping[i].number = item.number+state.shopping[i].number;
						canrun=false;
					}
				}
				if(canrun){
					state.shopping.push(item);
					state.amount= state.amount+1;
					canrun = false;
				}
				state.plus = true;
				window.localStorage.setItem('plus',JSON.stringify(state.plus));
				window.localStorage.setItem('shop',JSON.stringify(state.shopping));
				window.localStorage.setItem('amount',JSON.stringify(state.amount));
			},
			reduceshopping(state,item){
				for(let i=0;i<state.amount;i++){
					if(state.shopping[i].name==item.name&&state.shopping[i].select==item.select){
						if(item.number==0){
							state.shopping.splice(i,1);
							state.amount = state.amount-1;
							window.localStorage.setItem('shop',JSON.stringify(state.shopping));
							window.localStorage.setItem('amount',JSON.stringify(state.amount));
							if(state.amount==0){
								state.plus = false;
								state.confirmshow = false;
								window.localStorage.setItem('plus',JSON.stringify(state.plus));
								window.localStorage.setItem('confirmm',JSON.stringify(state.confirmshow));
							}
						}
						else{
							state.shopping[i].number = item.number;
						}
					}
				}
				window.localStorage.setItem('plus',JSON.stringify(state.plus));
				window.localStorage.setItem('shop',JSON.stringify(state.shopping));
				window.localStorage.setItem('amount',JSON.stringify(state.amount));
			},
			cleargoods(state){
				state.shopping.splice(0,state.amount);
				state.amount=0;
				state.plus = false;
				state.confirmshow = false;
				state.message = "";
				localStorage.clear();
			},
			updateshop(state,shop){
				for (var i in shop) {
				    state.shopping.push(shop[i]); //属性
				    //arr.push(object[i]); //值
				}
			}, 
			updateconfirmm(state,confirmm){
				state.confirmshow = confirmm;
			},
			updateamount(state,amount){
				state.amount = amount;
			},
			updateplus(state,plus){
				state.plus = plus;
			},
			newmessage(state,information){
				state.message = information;
			},
			updatedate(state,date){
				state.date =date;
				window.localStorage.setItem('date',JSON.stringify(date));
			},
			clear(state){
				state.shopping.splice(0,state.amount);
				state.amount=0;
				state.plus = false;
				state.confirmshow = false;
				state.message = "";
			},
			changetips(state,title){
				state.tips = title;
				state.tipsshow = true;
				setTimeout(function(){
					state.tipsshow = false;
				},1500);
			},
			openpopup(state,item){
				console.log(item);
				state.goods= item;
				state.popup = true;
			},
			closepopup(state){
				state.popup = false;
			},
			cpopnum(state,num){
				state.popnum = num;
			},
			obtain(state,bolean){
				state.second = bolean;
			},
			changecache(state,bolean){
				state.cacheshow = bolean;
			}
		},
		//异步的调用mutations
		actions: {
		    increments ({commit},n) {
		    	setTimeout(function(){
		    		commit('increment',{amount:n})
		    	},1000)
		    }	
		}
})
