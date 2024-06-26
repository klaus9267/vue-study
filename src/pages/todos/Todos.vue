<template>
  <router-view/>
  <div class="container">
    <h1>To-Do List</h1>
    <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="Search"
        @keyup.enter="searchTodo"
    />
    <hr>
    <TodoSimpleForm @add-todo="addTodo"/>
    <div v-if="error.length" class="alert alert-danger p-2 mt-2">{{ error }}</div>
    <div v-if="!todos.length" class="alert alert-danger p-2 mt-2">
      추가된 Todo가 없습니다
    </div>
    <div v-if="!todos.length && todos.length" class="alert alert-danger p-2 mt-2">
      There is nothing to display
    </div>
    <TodoList
        :todos="todos"
        @toggle-todo="toggleTodo"
        @delete-todo="deleteTodo"
    />
    <hr v-if="todos.length">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a class="page-link pointer" @click="getTodos(currentPage-1)">Previous</a>
        </li>
        <li
            v-for="page in numberOfPages"
            :key="page"
            class="page-item"
            :class="{active: page === currentPage}"
        >
          <a class="page-link" @click="getTodos(page)">
            {{ page }}
          </a>
        </li>
        <li v-if="numberOfPages !== currentPage && todos.length" class="page-item">
          <a class="page-link pointer" @click="getTodos(currentPage+1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
  <!-- // v:bind -> : //v-on -> @ -->
  <!--  v-model -> 양반향 바인딩-->
</template>

<script>
import {computed, ref, watch} from 'vue';
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
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const searchText = ref('')

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    })

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
            `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );
        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong.';
      }
    }

    getTodos();

    const addTodo = async (todo) => {
      error.value = '';
      try {
        await axios.post('http://localhost:3000/todos', todo);
        getTodos(1);
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong.';
      }
    }

    const toggleTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.patch('http://localhost:3000/todos/' + id, {
          completed: !todos.value[index].completed
        });
        todos.value[index].completed = !todos.value[index].completed;
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong.';
      }
    }

    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.delete('http://localhost:3000/todos/' + id);
        getTodos(1);
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong.';
      }
    }


    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    }

    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);
      }, 500);
    })
    // const filteredTodos = computed(() => {
    //   if (searchText.value) {
    //     return todos.value.filter(todo => {
    //       return todo.subject.includes(searchText.value);
    //     })
    //   }
    //   return todos.value;
    // })

    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      searchTodo,
      // filteredTodos,
      error,
      numberOfPages,
      currentPage,
      getTodos
    };
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
