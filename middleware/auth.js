// middleware/auth.js
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const response = await fetch('https://fh-kiel.com/check_auth.php', {
    method: 'GET',
    credentials: 'include' // WICHTIG: Sendet Cookies mit
  })
  const isAuthenticated = await response.json()

  if (!isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }
})
