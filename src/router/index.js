import Vue from 'vue'
import Router from 'vue-router'
import mainPage from '@/components/mainPage'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name:'login',
      component: () => import('@/components/login')
    },{
       path: '/',
      redirect: '/mainPage/blogArticle'
    },{
      path: '/mainPage',
      name: 'mainPage',
      component: mainPage,
      children: [{
        path: 'blogArticle',
        name: 'blogArticle',
        component: () => import('@/components/articleManage')
      },{
        path: 'cate',
        name: 'cate',
        component: () => import('@/components/cate')
      },{
        path: 'classify',
        name: 'classify',
        component: () => import('@/components/classify')
      }]
    }
  ]
})
