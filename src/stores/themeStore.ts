import type { themeType } from '@/@types/ThemeType'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useThemeStore = defineStore(
  'themeStore',
  () => {
    const theme: Ref<themeType> = ref('dark')
    function setTheme(newTheme: themeType) {
      theme.value = newTheme
      const bodyElement = document.body
      bodyElement.setAttribute('data-bs-theme', newTheme)
    }
    return { theme, setTheme }
  },
  {
    persist: true,
  },
)
