<template>
  <div class="name">
    {{ name }}
    <!-- {{ greeting(name) }} -->
  </div>
  <button class="btn btn-primary" v-on:click="consoleLog">Click</button>
</template>

<script>
export default {
  setup() {
    const name = 'minho1';

    // const greeting = name => {
    //   return 'Hello ' + name;
    // };
    const consoleLog = () => {
      console.log('hello world');
    };

    return {
      name,
      consoleLog,
      // greeting,
    };
  },
};
</script>

<style>
.name {
  color: red;
}
</style>
