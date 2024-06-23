<template>

  <div class="container">
    <h1>To-Do List</h1>
    <TodoSimpleForm @add-todo="addTodo"/>
    <div v-if="!todos.length" class="alert alert-danger p-2 mt-2">
      추가된 Todo가 없습니다
    </div>
    <div v-for="(todo,index) in todos" :key="todo.id" class="card mt-2">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input class="form-check-input" type="checkbox" v-model="todo.completed">
          <label
              class="form-check-label"
              :class="{ todo: todo.completed }"
          >{{ todo.subject }}
          </label>
        </div>
        <div>
          <button
              class="btn btn-danger btn-sm"
              @click="deleteTodo(index)"
          >Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- // v:bind -> : //v-on -> @ -->
  <!--  v-model -> 양반향 바인딩-->
</template>

<script>
import {ref} from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';

export default {
  components: {
    TodoSimpleForm,
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

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    }

    return {
      todos,
      addTodo,
      // todoStyle,
      deleteTodo,
    };
  },
};
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>
