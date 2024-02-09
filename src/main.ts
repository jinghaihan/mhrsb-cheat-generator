import { createApp } from 'vue'
import App from './App.vue'
import { setupComponent } from './components'
import { setupRouter } from './router'
import { setupStore } from './store'
import './styles'

function setup() {
  const app = createApp(App)

  setupComponent(app)

  setupRouter(app)

  setupStore(app)

  app.mount('#app')
}

setup()
