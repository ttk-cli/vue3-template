import 'nprogress/nprogress.css'

import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'

// eslint-disable-next-line import/no-unresolved
import routes from '~pages'

routes.push({ path: '/:catchAll(.*)', redirect: '/notFound' })

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
