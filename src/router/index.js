import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import recomd from '@/components/recomd.vue'
import message from '@/components/message.vue'
import personal from '@/components/personal.vue'
import login from '@/components/login.vue'
import begain from '@/components/begain.vue'
import exame from '@/components/exame.vue'
import major from '@/components/major.vue'
import lookup from '@/components/lookup.vue'
import hotfind from '@/components/hotfind.vue'
import onlyfind from '@/components/onlyfind.vue'
import timelyfind from '@/components/timelyfind.vue'
import notfind from '@/components/notfind.vue'
import prove from '@/components/prove.vue'

Vue.use(Router)

export default new Router({
    mode:'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
        path:'/',
        name:"begain",
        component:begain
    },
    {
        path:'/major',
        name:'major',
        component:major,
        children:[
        {
            path:'',
            name:'recomd',
            component:recomd,
        },
        {
            path:'message',
            name:'message',
            component:message
        },
        {
        path:'personal',
        name:'personal',
        component:personal
        },
        ]
    },
    {
        path:'/exame',
        name:'exame',
        component:exame
    },
    {
        path:'/lookup',
        name:"lookup",
        component:lookup,
        children:[
        {
            path:'',
            name:'hotfind',
            component:hotfind
        },
        {
            path:'onlyfind',
            name:'onlyfind',
            component:onlyfind
        },
        {
            path:'timelyfind',
            name:'timelyfind',
            component:timelyfind
        },
        {
            path:'notfind',
            name:'notfind',
            component:notfind
        }]
    },
    {
        path:'/prove',
        name:'prove',
        component:prove
    }
  ],
})
