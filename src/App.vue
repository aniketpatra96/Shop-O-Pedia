<script setup lang="ts">
import HeaderView from './components/Layout/HeaderView.vue'
import FooterView from './components/Layout/FooterView.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <HeaderView />
    <div class="flex-grow-1">
      <RouterView />
    </div>
    <FooterView />
  </div>
</template>

<style scoped></style>
