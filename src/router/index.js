import Vue from 'vue'
import Router from 'vue-router'
import recomd from '@/components/recomd.vue'
import order from '@/components/order.vue'
import person from '@/components/person.vue'
import login from '@/components/login.vue'
import begain from '@/components/begain.vue'
import major from '@/components/major.vue'
import lookup from '@/components/lookup.vue'
import hotfind from '@/components/hotfind.vue'
import onlyfind from '@/components/onlyfind.vue'
import timelyfind from '@/components/timelyfind.vue'
import notfind from '@/components/notfind.vue'
import prove from '@/components/prove.vue'
import determine from '@/components/determine.vue'
import haveorder from '@/components/haveorder.vue'
import noorder from '@/components/noorder.vue'
import detailed from '@/components/detailed.vue'
import phone from '@/components/phone.vue'
import password from '@/components/password.vue'
import address from '@/components/address.vue' 
import addaddress from '@/components/addaddress.vue'
import unread from '@/components/unread.vue'
import aboutme from '@/components/aboutme.vue'
import retrieve from '@/components/retrieve.vue'
import cache from '@/components/cache.vue'

Vue.use(Router)

export default new Router({
    mode:'history',
  routes: [
    {
        path:'/',
        name:"begain",
        component:begain
    },
    {
        path:'/aboutme',
        name:'aboutme',
        component:aboutme,
    },
    {
        path:'/cache',
        name:'cache',
        component:cache
    },
    {
        path:'/retrieve',
        name:'retrieve',
        component:retrieve
    },
    {
        path:'/addaddress',
        name:'addaddress',
        component:addaddress
    },
    {
        path:'/determine',
        name:'determine',
        component:determine
    },
    {
        path:'/detailed',
        name:detailed,
        component:detailed
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
        //订单的路由
        {
            path:'order',
            name:'order',
            component:order,
            children:[
            {
                path:'',
                name:"haveorder",
                component:haveorder,
            },
            {
                path:'noorder',
                name:'noorder',
                component:noorder,
            }
            ]
        },
        {
        path:'person',
        name:'person',
        component:person,
        },
        {
            path:'unread',
            name:'unread',
            component:unread
        }
        ]
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
    },
    {
        path:'/phone',
        name:'phone',
        component:phone
    },
    {
        path:'/password',
        name:'password',
        component:password
    },
    {
        path:'/address',
        name:'address',
        component:address
    }
  ],
})
