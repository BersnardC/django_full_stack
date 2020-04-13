import Vue from 'vue'
import Router from 'vue-router'

// Login
import Login from '@/auth/Login'
import Register from '@/auth/Register'
import auth from '@/auth/auth'

//Pages
import Clientes from '@/views/clientes/clientes'
import Productos from '@/views/productos/productos'
import Usuarios from '@/views/usuarios/usuarios'
// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Charts = () => import('@/views/Charts')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')

Vue.use(Router)

export default new Router({
  mode: 'history', // Demo is living in GitHub.io, so required!
  root : '/',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  relative: true,
  base: __dirname,
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Inicio',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Panel',
          component: Dashboard,
          beforeEnter: requiredAuth
        },
        {
          path: 'terceros',
          name: 'Terceros',
          component: Clientes,
          beforeEnter: requiredAuth
        },
         {
          path: 'productos',
          name: 'Productos',
          component: Productos,
          beforeEnter: requiredAuth
        },
        {
          path: 'usuarios',
          name: 'Usuarios',
          component: Usuarios,
          beforeEnter: requiredAuth
        },
        ]
    },
    {
      path: '/auth',
      redirect: 'login',
      name: 'Auth',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '/login',
          name: 'Login',
          component: Login,
          beforeEnter: readyIsLogued
        },
        {
          path: '/logout',
          name: 'Logout',
          beforeEnter: onLogout
        }
      ]
    },
    {
      path: '**',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})

function requiredAuth (to, from, next) {
  if (!auth.isLoguedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

function readyIsLogued (to, from, next) {
  if (auth.isLoguedIn()) {
    next({
      path: '/', //dashboard
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

function onLogout(to, from, next) {
  auth.logout()
  next({
    path: '/login',
    query: { redirect: to.fullPath }
  })
}