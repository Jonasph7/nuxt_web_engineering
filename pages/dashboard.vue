<template>
  <div v-if="isAuthenticated">
    <h1>Dashboard</h1>
    <p>Sie haben sich erfolgreich eingeloggt und können diese geschützte Seite sehen.</p>
    <button @click="logout">Abmelden</button>
  </div>
  <div v-else>
    <p>Sie sind nicht autorisiert, diese Seite zu sehen. Weiterleitung zur Login-Seite...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const isAuthenticated = ref(false)
const router = useRouter()

const checkAuth = async () => {
  try {
    const response = await fetch('https://fh-kiel.com/check_auth.php', {
      method: 'GET',
      credentials: 'include' // WICHTIG: Sendet Cookies mit
    })
    const result = await response.json()
    if (result.error) {
      console.error('Authentifizierungsfehler:', result.error)
      throw new Error(result.error)
    }
    isAuthenticated.value = result === true
    if (!isAuthenticated.value) {
      router.push('/login')
    }
  } catch (error) {
    console.error('Fehler bei der Authentifizierungsprüfung:', error)
    router.push('/login')
  }
}

onMounted(() => {
  checkAuth()
})

const logout = async () => {
  await fetch('https://fh-kiel.com/logout.php', {
    method: 'POST',
    credentials: 'include' // WICHTIG: Sendet Cookies mit
  })
  router.push('/login')
}
</script>

<style scoped>
/* Dein CSS-Code */
</style>
