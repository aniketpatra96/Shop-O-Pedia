import 'pinia'
import type { PersistedStateOptions } from 'pinia-plugin-persistedstate'

declare module 'pinia' {
  interface DefineSetupStoreOptions<Id extends string, S, G, A> {
    persist?: boolean | PersistedStateOptions
  }
}
