<template>
  <div class="error-page d-flex align-items-center justify-content-center my-xl-5">
    <div class="container text-center">
      <h1 class="error-code glitch mb-4 text-danger">404</h1>
      <h2 class="display-6 mb-3">32)(*@#</h2>
      <p class="lead mb-5">Oops! Looks like this page got scrambled</p>
      <div class="d-flex justify-content-center gap-3">
        <router-link :to="{ name: APP_ROUTE_NAMES.HOME }" class="btn btn-primary"
          >Go Home</router-link
        >
        <router-link :to="{ name: APP_ROUTE_NAMES.CONTACT_US }" class="btn btn-outline-secondary"
          >Report Issue</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { APP_ROUTE_NAMES } from '@/constants/RouteNames'
import { RouterLink } from 'vue-router'
</script>
