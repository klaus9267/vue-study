import {createRouter, createWebHistory} from "vue-router";
import Home from "@/pages/Home.vue";
import Todos from "@/pages/todos/Todos.vue";
import Todo from "@/pages/todos/Todo.vue";

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
        },
        {
            path: '/todos/:id',
            name: 'Todo',
            component: Todo,
        },
    ]
});

export default index;
