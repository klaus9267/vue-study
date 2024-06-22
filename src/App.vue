<template>

  <div class="container">
    <h1>To-Do List</h1>
    <form @submit.prevent="onSubmit">
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
          <input
              type="text"
              v-model="todo"
              class="form-control"
              placeholder="Type new to-do"
          />
        </div>
        <div>
          <button class="btn btn-primary" type="submit">Add</button>
        </div>
      </div>
      <div v-show="hasError" style="color:red">This field cannot be empty</div>
    </form>
    <div v-for="todo in todos" :key="todo.id" class="card mt-2">
      <div class="card-body p-2">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="todo.completed">
          <label class="form-check-label">{{ todo.subject }}</label>
        </div>

      </div>
    </div>
  </div>
  <!-- // v:bind -> : //v-on -> @ -->
  <!--  v-model -> 양반향 바인딩-->
</template>

<script>
import {handleError, ref} from 'vue';

export default {
  methods: {handleError},
  setup() {

    const todo = ref('');
    const todos = ref([
      {id: 1, subject: "휴대폰 사기"},
      {id: 2, subject: "장보기"}
    ]);
    // const reactive1 = reactive({}) reactive 는 arr , object를 설정할 때 사용 나머지는 ref
    const hasError = ref(false);

    const onSubmit = () => {
      if (todo.value === '') {
        hasError.value = true;
      } else {
        hasError.value = false;
        todos.value.push({
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        todo.value = '';
      }
    };

    return {
      todo,
      todos,
      onSubmit,
      hasError,
    };
  },
};
</script>

<style>
.name {
  color: red;
}
</style>
