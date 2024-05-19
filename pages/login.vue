<template>
  <div class="login-container">
    <h2>Login für Interne</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-field">
        <label for="username">Benutzername</label>
        <input type="text" id="username" v-model="username" placeholder="Geben Sie Ihren Benutzernamen ein" required />
      </div>
      <div class="form-field">
        <label for="password">Passwort</label>
        <input type="password" id="password" v-model="password" placeholder="Geben Sie Ihr Passwort ein" required />
      </div>
      <button type="submit" :disabled="loading">{{ loading ? 'Lädt...' : 'Einloggen' }}</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)
const router = useRouter()

const onSubmit = async () => {
  loading.value = true
  error.value = null
  const credentials = { username: username.value, password: password.value }
  try {
    const response = await fetch('https://fh-kiel.com/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include' // WICHTIG: Sendet Cookies mit
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Login fehlgeschlagen')

    router.push('/protected')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Dein CSS-Code */
</style>
