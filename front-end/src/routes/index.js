//import vue router
import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/LoginComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'
import HelloWorld from '../components/HelloWorld.vue'

//define a routes
const routes = [
    {
        path: '/',
        name: 'home',
        // component: () => import( /* webpackChunkName: "home" */ '../views/home/index.vue')
        component: HelloWorld
    },
    {
        path: '/register',
        name: 'register',
        // component: () => import( /* webpackChunkName: "index" */ '../views/auth/register.vue')
        component: RegisterComponent
    },
    {
        path: '/login',
        name: 'login',
        // component: () => import( /* webpackChunkName: "create" */ '../views/auth/login.vue')
        component: LoginComponent
    },
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

export default router