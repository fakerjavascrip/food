import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import recomd from '@/components/recomd'
import message from '@/components/message'
import personal from '@/components/personal'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
    	path:'/',
    	name:'recomd',
    	component:recomd
    },
    {
    	path:'/message',
    	name:'message',
    	component:message
    },
    {
    	path:'/personal',
    	name:'personal',
    	component:personal
    }
  ],
})
