import type { App } from 'vue'
import { createPinia } from 'pinia'
export * from './modules'

const store = createPinia()

export function setupStore(app: App) {
  app.use(store)
}
