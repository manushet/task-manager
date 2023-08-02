import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/TaskList.vue')
    },
    {
        path: '/task/:id',
        name: 'task',
        component: () => import('../views/TaskView.vue')
    },     
    {
        path: '/new-task',
        name: 'new_task',
        component: () => import('../views/NewTask.vue')
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
});

export default router;
