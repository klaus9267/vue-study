import {createRouter, createWebHistory} from "vue-router";
import Home from "@/pages/Home.vue";
import Todos from "@/pages/todos/Todos.vue";

const index = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/todos',
            name: 'Todos',
            component: Todos,
        }
    ]
});

export default index;
