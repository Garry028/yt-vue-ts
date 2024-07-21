import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Video from '../pages/Video.vue';

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/watch/:id',
        name: "watch",
        component: Video
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
