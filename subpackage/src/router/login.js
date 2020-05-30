import Login from '@/views/login/Login.vue'
export default [
    {
        path: '/login',
        meta: {
            title:'登陆'
        },
        component: Login
    },
    {
        path: '/forgetPwd',
        meta: {
            title:'忘记密码'
        },
        component: () => import('@/views/login/ForgetPWD.vue')
    }
]