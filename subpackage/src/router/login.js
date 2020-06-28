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
    },
    {
        path: '/posonCenter',
        meta: {
            title:'个人中心'
        },
        component: () => import('@/views/login/posonCenter.vue')
    },
    {
        path: '/posonInfo',
        meta: {
            title:'个人信息'
        },
        component: () => import('@/views/login/posonInfo.vue')
    },
    {
        path: '/guideInfo',
        meta: {
            title:'导游信息'
        },
        component: () => import('@/views/login/guideInfo.vue')
    },
    {
        path: '/editName',
        meta: {
            title:'修改姓名'
        },
        component: () => import('@/views/login/editName.vue')
    },
    {
        path: '/editPwd',
        meta: {
            title:'修改账户密码'
        },
        component: () => import('@/views/login/editPwd.vue')
    },
    {
        path: '/editPayPwd',
        meta: {
            title:'修改支付密码'
        },
        component: () => import('@/views/login/editPayPwd.vue')
    },
    {
        path: '/addGuide',
        meta: {
            title:'添加导游'
        },
        component: () => import('@/views/login/addGuide.vue')
    }
]