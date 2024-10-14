//import vue router
import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '../components/LoginComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'
import HelloWorld from '../components/HelloWorld.vue'
import Dashboard from '../components/Dashboard.vue'

//import js cookies
import Cookie from 'js-cookie'

// Utility to get the token
const getToken = () => Cookie.get('token')

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
    {
        path: '/admin/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiredAuth: true } // <-- Add meta field
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

// Global navigation guard
router.beforeEach((to, from, next) => {
    // Ambil token otentikasi pengguna
    const token = getToken();

    // Jika rute tujuan membutuhkan otentikasi dan pengguna tidak memiliki token
    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        // Alihkan pengguna ke halaman login
        next({ name: 'login' });
    } 
    // Jika rute tujuan adalah halaman login atau register dan pengguna sudah login
    else if ((to.name === 'login' || to.name === 'register') && token) {
        // Alihkan pengguna ke halaman dashboard
        next({ name: 'dashboard' });
    } 
    // Jika tidak ada kondisi khusus, izinkan navigasi ke rute tujuan
    else {
        next();
    }
});

export default router