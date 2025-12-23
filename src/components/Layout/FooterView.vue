<template>
  <footer class="border-top footer text-muted p-2 bg-body-tertiary">
    <div class="text-center">
      Made with <i class="bi bi-heart-fill"></i> by Aniketronics Pvt Ltd. © {{ year }}
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
const year: Ref<number> = ref(new Date().getFullYear())
</script>
