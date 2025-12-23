import { defineStore } from 'pinia'
import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { fireBaseDB, auth } from '@/utility/firebaseConfig'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { ROLE_ADMIN, ROLE_USER } from '@/constants/AppConstants'
import type User from '@/@types/User'
export const useAuthStore = defineStore('authStore', () => {
  const user: Ref<Partial<User> | null> = ref(null)
  const error: Ref<string | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)
  const role: Ref<string | null> = ref(null)
  const initialized: Ref<boolean> = ref(false)
  const isAuthenticated: ComputedRef<boolean> = computed(() => user.value !== null)
  const isAdmin: ComputedRef<boolean> = computed(() => role.value === ROLE_ADMIN)

  const initializeAuth = async () => {
    console.log('initializeAuth')

    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          user.value = firebaseUser
          await fetchUserRole(firebaseUser.uid)
          initialized.value = true
        } else {
          clearUser()
        }
        resolve(0)
      })
    })
  }

  const fetchUserRole = async (uid: string) => {
    const userDoc = await getDoc(doc(fireBaseDB, 'users', uid))
    role.value = userDoc.exists() ? userDoc.data().role : ''
  }

  const signUpUser = async (email: string, password: string) => {
    isLoading.value = true
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(fireBaseDB, 'users', userCredentials.user.uid), {
        email: userCredentials.user.email,
        role: ROLE_USER,
        createdAt: new Date(),
      })
      clearUser()
      error.value = null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const clearUser = () => {
    user.value = null
    role.value = null
  }

  const signInUser = async (email: string, password: string) => {
    isLoading.value = true
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredentials.user
      error.value = null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const signOutUser = async () => {
    isLoading.value = true
    try {
      await signOut(auth)
      clearUser()
      error.value = null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    // state
    user,
    role,
    error,
    isLoading,
    initialized,
    //getters
    isAdmin,
    isAuthenticated,

    // actions
    signUpUser,
    signInUser,
    signOutUser,
    initializeAuth,
  }
})
