import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'


Vue.use(Vuex);

export default new Vuex.Store({
	plugins: [createLogger()],
	state :{
	    userInfo: { phone: 111 }, //用户信息
	    orderList: [{ orderno: '1111' }], //订单列表
	    orderDetail: null, //订单产品详情
	    login: false, //是否登录
	    x:1,
	    todos: [
      		{ id: 1, text: '哈哈', done: true },
      		{ id: 1, text: '呜呜', done: true },
      		{ id: 1, text: '呜呜', done: true }
    		]
		},
		getters: {
		  // ...
		      doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
		  doneTodosCount: (state, getters) => {
		    return getters.doneTodos.length
		  }
		},
		mutations: {
			increment(state){
				state.x++;
			}
		},
})
