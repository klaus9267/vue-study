<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{name:routes.home.name}">Klaus9267</router-link>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{name:routes.todos.name}">
          Todos
        </router-link>
      </li>
    </ul>
  </nav>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import {routes} from "@/router";

export default {
  computed: {
    routes() {
      return routes
    }
  }
}
</script>

<style>
</style>
