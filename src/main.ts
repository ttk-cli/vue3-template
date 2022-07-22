// eslint-disable-next-line import/no-unresolved
import 'uno.css'
import '@/styles/index.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
