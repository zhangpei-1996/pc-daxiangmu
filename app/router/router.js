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
                    component: () => import('../views/index/Index.vue')
                },
                {
                    path: 'caigou',
                    component: () => import('../layouts/Side.vue'),
                    children: [
                        {
                            path: 'richang',
                            component: () => import('../views/cg-richang/cg-richang.vue')
                        },
                        {
                            path: 'jinhuo',
                            component: () => import('../views/cg-jinhuo/cg-jinhuo.vue')
                        },
                        {
                            path: 'tuihuo',
                            component: () => import('../views/cg-tuihuo/cg-tuihuo.vue')
                        }
                    ]
                }
            ]
        }
    ]
});

export default router;