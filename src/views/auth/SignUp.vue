<template>
  <div class="container py-5 my-3">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4 border rounded">
        <div class="shadow-sm">
          <div class="card-body p-4">
            <h4 class="text-center mb-4">Create Account</h4>
            <form @submit.prevent="handleSignUp">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="form.email" type="email" class="form-control" id="email" required />
              </div>
              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <input
                  v-model="form.password"
                  type="password"
                  class="form-control"
                  id="password"
                  required
                />
              </div>
              <button :disabled="authStore.isLoading" type="submit" class="btn btn-success w-100">
                <span
                  v-if="authStore.isLoading"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                Create Account
              </button>
              <div v-if="error" class="alert alert-danger mt-3 mb-0">{{ error }}</div>
            </form>
            <p class="mt-3 form-label text-center">
              Already have an account?
              <router-link :to="{ name: APP_ROUTE_NAMES.SIGN_IN }">Login here</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, type Ref, type Reactive } from 'vue'
import { useRouter, type Router, RouterLink } from 'vue-router'
import { useSwal } from '@/composibles/useSwal'
import type User from '@/@types/User'
import { APP_ROUTE_NAMES } from '@/constants/RouteNames'
import { useAuthStore } from '@/stores/authStore'

const error: Ref<string> = ref('')
const form: Reactive<Partial<User>> = reactive({ email: '', password: '' })
const router: Router = useRouter()
const { showSuccess, showError } = useSwal()
const authStore = useAuthStore()

async function handleSignUp() {
  try {
    error.value = ''
    if (!form.email || !form.password) throw new Error('Please fill in all fields')
    await authStore.signUpUser(form.email, form.password)
    showSuccess('Account created successfully')
    router.push({ name: APP_ROUTE_NAMES.SIGN_IN })
  } catch (e: unknown | Error) {
    error.value = e instanceof Error ? e.message : 'An unknown error occurred'
    showError(error.value)
  }
}
</script>
