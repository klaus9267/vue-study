<template>

  <div class="container">
    <h1>To-Do List</h1>
    <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="Search"
    />
    <hr>
    <TodoSimpleForm @add-todo="addTodo"/>
    <div v-if="error.length" class="alert alert-danger p-2 mt-2">{{ error }}</div>
    <div v-if="!todos.length" class="alert alert-danger p-2 mt-2">
      추가된 Todo가 없습니다
    </div>
    <div v-if="!filteredTodos.length && todos.length" class="alert alert-danger p-2 mt-2">
      There is nothing to display
    </div>
    <TodoList
        :todos="filteredTodos"
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
import axios from "axios";

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    // const reactive1 = reactive({}) reactive 는 arr , object를 설정할 때 사용 나머지는 ref
    const todos = ref([]);
    const error = ref('')

    const getTodos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/todos");
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong.';
      }
    }

    getTodos();

    const addTodo = async (todo) => {
      error.value = '';
      const {subject, completed} = todo;
      try {
        const res = await axios.post('http://localhost:3000/todos', {
          subject,
          completed
        });
        todos.value.push(res.data);
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong.';
      }
    }

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    }

    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.delete('http://localhost:3000/todos/' + id);
        todos.value.splice(index, 1);
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong.';
      }
    }

    const searchText = ref('')
    const filteredTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        })
      }
      return todos.value;
    })

    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      filteredTodos,
      error,
    };
  },
};
</script>

<style>
</style>
