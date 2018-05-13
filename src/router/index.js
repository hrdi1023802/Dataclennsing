import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
import Settings from '@/components/App/Settings'
import Customer from '@/components/Customer/Customer'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import UserProfile from '@/components/User/UserProfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Signin
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    // {
    //   path: '/customers/:id',
    //   name: 'Customer',
    //   props: true,
    //   component: Customer
    // },
    {
      path: '/customerSearch',
      name: 'Customer',
      props: true,
      component: Customer
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/user',
      name: 'UserProfile',
      component: UserProfile
    }
  ],
  mode: 'history'
})
