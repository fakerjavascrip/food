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
	    //是否可以让它提交订单
	    plus: false,
	    x:1,
	    goods: [
      		{ name: "大白菜", num: 0, unit: "斤" },
    		],
    	//购物车
    	shopping:[]
		},
		getters: {
			doneTodos: state => {
		    	return state.goods[0];
		    },
			vegetables: state => {
		    	return state.shopping;
		    },
		    doneTodosCount: (state, getters) => {
		    	return getters.doneTodos.length
		  	}
		},
		mutations: {
			increment(state,payload){
				state.x +=payload.amount;
			},
			changeconfirm(state){
				state.confirmshow =!state.confirmshow;
			},
			noconfirm(state){
				state.confirmshow = false;
			},
			cgoodname(state,strs){
				state.goodname=strs;
			},
			updateMessage (state, goodname) {
			    state.goodname = goodname
			},
			updategood(state,item){
				state.goods[0].name = item.name;
				state.goods[0].num = item.number;
				state.goods[0].unit = item.select;
			},
			addshopping(state,item){
				var canrun = true;
				item.number = parseFloat(item.number);
				console.log(state.shopping);
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
			},
			reduceshopping(state,item){
				for(let i=0;i<state.amount;i++){
					console.log(state.shopping[i].name);
					console.log(state.shopping[i].select);
					if(state.shopping[i].name==item.name&&state.shopping[i].select==item.select){
						state.shopping.splice(i,1);
						state.amount = state.amount-1;
						if(state.amount==0){
							state.plus = false;
							state.confirmshow = false;
						}
					}
				}
			},
			cleargoods(state){
				state.shopping.splice(0,state.amount);
				state.amount=0;
				state.plus = false;
				state.confirmshow = false;
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
