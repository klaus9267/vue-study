<template>
  <!-- // v:bind -> : //v-on -> @ -->
  <input type="text" :value="name" @input="updateName" />

  <button class="btn btn-primary" @click="onSubmit">Click</button>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    // const reactive1 = reactive({}) reactive 는 arr , object를 설정할 때 사용 나머지는 ref
    const name = ref('Minho');

    const onSubmit = () => {
      console.log(name.value);
    };

    const updateName = e => {
      name.value = e.target.value;
    };

    return {
      name,
      onSubmit,
      updateName,
    };
  },
};
</script>

<style>
.name {
  color: red;
}
</style>
