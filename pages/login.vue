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

    router.push('/dashboard')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 5rem auto;
  padding: 4rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-container h2 {
  color: #007BFF;
  margin-bottom: 2rem;
}

.form-field {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-field label {
  display: block;
  margin-bottom: 0.5rem;
  color: #444444;
}

.form-field input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e1e1e1;
  border-radius: 5px;
  font-size: 1rem;
}

.form-field input:focus {
  border-color: #007BFF;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
}

button {
  width: 100%;
  padding: 1rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>
