import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import AdminProductos from '../views/AdminProductos'
import FormularioContacto from "@/views/FormularioContacto"
import QuienesSomos from "@/views/QuienesSomos"
import TerminosYCondiciones from "@/views/TerminosYCondiciones"
import Carrito from "@/views/Carrito"
import Store from "../store"

import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: "/"
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/formulariodecontacto',
    name: 'FormularioDeContacto',
    component: FormularioContacto
  },
  {
    path: '/quienessomos',
    name: 'QuienesSomos',
    component: QuienesSomos
  },
  {
    path: '/terminosycondiciones',
    name: 'TerminosYCondiciones',
    component: TerminosYCondiciones
  },
  {
    path: '/carrito',
    name: 'Carrito',
    component: Carrito
  },
  {
    path: '/adminproductos',
    name: 'AdminProductos',
    component: AdminProductos,
    meta: {
      login: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  let user = Store.state.logedInUser;
  let authRequired = to.matched.some(route =>
    route.meta.login);
    if (!user && authRequired) {
      next("login");
    } else if (user && !authRequired) {
      next();
    } else {
      next();
    }
});

export default router
