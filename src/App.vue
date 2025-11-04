<template>
  <div id="app">
    <MainNavbar />
    <router-view />
    <AppFooter />
  </div>
</template>

<script setup>
import MainNavbar from './components/MainNavbar.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style>

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}


router-view {
  flex-grow: 1;
}
</style>