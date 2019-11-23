import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/index',
            component: () => import('../layouts/Index.vue'),
            children: [
                {
                    path: 'index',
                    component: () => import('../views/index/Index.vue'),
                    name: 'index',
                    meta: {
                        'A': 'index'
                    }
                },
                {
                    path: 'profile',
                    component: () => import('../views/profile/Profile.vue'),
                    name: 'profile',
                    meta: {
                        'A': 'profile'
                    }
                },
                {
                    path: 'caigou',
                    component: () => import('../layouts/Side.vue'),
                    name: 'caigou',
                    redirect: {
                        name: 'richang'
                    },
                    children: [
                        {
                            path: 'richang',
                            component: () => import('../views/cg-richang/cg-richang.vue'),
                            name: 'richang',
                            meta: {
                                'A': 'caigou',
                                'B': 'richang'
                            }
                        },
                        {
                            path: 'jinhuo',
                            component: () => import('../views/cg-jinhuo/cg-jinhuo.vue'),
                            name: 'jinhuo',
                            meta: {
                                'A': 'caigou',
                                'B': 'jinhuo'
                            }
                        },
                        {
                            path: 'tuihuo',
                            component: () => import('../views/cg-tuihuo/cg-tuihuo.vue'),
                            name: 'tuihuo',
                            meta: {
                                'A': 'caigou',
                                'B': 'tuihuo'
                            }
                        }
                    ]
                },
                ,
                {
                    path: 'caiwu',
                    component: () => import('../layouts/Side.vue'),
                    name: 'caiwu',
                    redirect: {
                        name: 'pingzheng'
                    },
                    children: [
                        {
                            path: 'pingzheng',
                            component: () => import('../views/cw-pingzheng/cw-pingzheng.vue'),
                            name: 'pingzheng',
                            meta: {
                                'A': 'caiwu',
                                'B': 'pingzheng'
                            }
                        },
                        {
                            path: 'zhuanxiangyewu',
                            component: () => import('../views/cw-zhuanxiangyewu/cw-zhuanxiangyewu.vue'),
                            name: 'zhuanxiangyewu',
                            meta: {
                                'A': 'caiwu',
                                'B': 'zhuanxiangyewu'
                            }
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            component: () => import('../views/login/Login.vue'),
            name: 'login'
        },
        {
            path: '*',
            redirect: {
                name: 'index'
            }
        }
    ]
});

export default router;