<template>
  <div
      v-for="(todo,index) in todos"
      :key="todo.id"
      class="card mt-2"
  >
    <div
        class="card-body p-2 d-flex align-items-center"
        style="cursor: pointer"
        @click.stop="moveToPage(todo.id)"
    >
      <div class="form-check flex-grow-1">
        <input
            class="form-check-input"
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(index,$event)"
            @click.stop
        >
        <label
            class="form-check-label"
            :class="{ todo: todo.completed }"
        >
          {{ todo.subject }}
        </label>
      </div>
      <div>
        <button
            class="btn btn-danger btn-sm"
            @click.stop="deleteTodo(index)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import {routes} from "@/router";

export default {
  // props: ['todos'],
  props: {
    todos: {
      type: Array,
      required: true
    },
  },
  emits: ["toggle-todo", "delete-todo"],
  setup(props, {emit}) {
    const router = useRouter();
    const toggleTodo = (index, event) => {
      emit("toggle-todo", index, event.target.checked);
    }

    const deleteTodo = (index) => {
      emit("delete-todo", index);
    }

    const moveToPage = (todoId) => {
      router.push({
        name: routes.todo.name,
        params: {
          id: todoId
        }
      });
    }

    return {
      moveToPage,
      toggleTodo,
      deleteTodo,
    }
  }
}
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>