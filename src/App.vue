<template>

  <div class="container">
    <h4>count: {{count}}</h4>
    <h4>double count computed: {{doubleCount}}</h4>
    <h4>double count method: {{doubleCountMethod()}}</h4>
    <button @click="count++">Add One</button>
    <h1>To-Do List</h1>
    <TodoSimpleForm @add-todo="addTodo"/>
    <div v-if="!todos.length" class="alert alert-danger p-2 mt-2">
      추가된 Todo가 없습니다
    </div>
    <TodoList
        :todos="todos"
        @toggle-todo="toggleTodo"
        @delete-todo="deleteTodo"
    />
  </div>
  <!-- // v:bind -> : //v-on -> @ -->
  <!--  v-model -> 양반향 바인딩-->
</template>

<script>
import {computed, ref} from 'vue';
import TodoList from "@/components/TodoList.vue";
import TodoSimpleForm from "@/components/TodoSimpleForm.vue";

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    const todos = ref([]);
    // const reactive1 = reactive({}) reactive 는 arr , object를 설정할 때 사용 나머지는 ref
    // const todoStyle = {
    //   textDecoration: 'line-through',
    //   color: 'gray',
    // }

    const addTodo = (todo) => {
      todos.value.push(todo);
    }

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    }

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    }

    const count = ref(1);
    const doubleCount = computed(() => {
      return count.value * 2;
    })

    const doubleCountMethod = () => {
      return count.value * 2;
    }

    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      count,
      doubleCount,
      doubleCountMethod,
    };
  },
};
</script>

<style>
</style>
