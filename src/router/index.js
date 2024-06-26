import {createRouter, createWebHistory} from "vue-router";
import Home from "@/pages/Home.vue";
import Todos from "@/pages/todos/Todos.vue";
import Todo from "@/pages/todos/Todo.vue";

export const routes = {
    home: {
        path: '/',
        name: 'Home',
        component: Home,
    },
    todos: {
        path: '/todos',
        name: 'Todos',
        component: Todos,
    },
    todo: {
        path: '/todos/:id',
        name: 'Todo',
        component: Todo,
    }
};

const router = createRouter({
    history: createWebHistory(),
    routes: Object.values(routes),
});

export default router;
