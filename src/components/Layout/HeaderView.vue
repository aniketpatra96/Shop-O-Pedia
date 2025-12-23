<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" :to="{ name: APP_ROUTE_NAMES.HOME }">
        <img class="mx-3" style="width: 40px" src="@/assets/images/logo.png" alt="ShopOPedia" />
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" :to="{ name: APP_ROUTE_NAMES.HOME }"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: APP_ROUTE_NAMES.PRODUCT_LIST }" class="nav-link"
              >Product</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink :to="{ name: APP_ROUTE_NAMES.CONTACT_US }" class="nav-link"
              >Contact Us</RouterLink
            >
          </li>
        </ul>
        <ul class="d-flex navbar-nav">
          <li class="nav-link" v-if="authStore.isAuthenticated">
            Welcome, {{ authStore.user?.email }}&nbsp;
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-laptop"></i>
            </a>
            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item" @click="themeStore.setTheme('light')">
                  <i class="bi bi-sun"></i>&nbsp; Light
                </button>
              </li>
              <li>
                <button class="dropdown-item" @click="themeStore.setTheme('dark')">
                  <i class="bi bi-moon-stars-fill"></i>&nbsp;&nbsp;Dark
                </button>
              </li>
            </ul>
          </li>
          <li class="nav-item" v-if="!authStore.isAuthenticated">
            <RouterLink
              class="nav-link active"
              aria-current="page"
              :to="{ name: APP_ROUTE_NAMES.SIGN_IN }"
              >Sign In</RouterLink
            >
          </li>
          <li class="nav-item" v-if="!authStore.isAuthenticated">
            <RouterLink :to="{ name: APP_ROUTE_NAMES.SIGN_UP }" class="nav-link"
              >Sign Up</RouterLink
            >
          </li>
          <li class="nav-item" v-if="authStore.isAuthenticated">
            <button
              class="nav-link"
              @click="(authStore.signOutUser(), router.push({ name: APP_ROUTE_NAMES.HOME }))"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRouter, type Router } from 'vue-router'
import { APP_ROUTE_NAMES } from '@/constants/RouteNames'
import { useThemeStore } from '@/stores/themeStore'
import { useAuthStore } from '@/stores/authStore'
const themeStore = useThemeStore()
const authStore = useAuthStore()
const router: Router = useRouter()
</script>
