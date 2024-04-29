<template>
  // v:bind -> :
  <div :class="nameClass">
    {{ name }}
  </div>
  <input :type="type" :value="name" />

  <button class="btn btn-primary" @click="updateName">Click</button>
  //v-on -> @
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    // const reactive1 = reactive({}) reactive 는 arr , object를 설정할 때 사용 나머지는 ref
    const name = ref('minho1');
    const type = ref('number');
    const nameClass = ref('name');

    const updateName = () => {
      name.value = 'minhosss';
      type.value = 'text';
    };

    return {
      name,
      type,
      updateName,
      nameClass,
    };
  },
};
</script>

<style>
.name {
  color: red;
}
</style>
