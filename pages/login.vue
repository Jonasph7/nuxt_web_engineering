<template>
  <div class="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md text-center">
    <h2 class="text-2xl font-semibold text-primary mb-6">Login für Interne</h2>
    <form @submit.prevent="logIn">
      <div class="mb-4 text-left">
        <label for="email" class="block text-gray-txt mb-2">Email</label>
        <input type="email" id="email" v-model="email" placeholder="Geben Sie Ihre Email ein" required class="w-full p-2 border-2 border-gray-light rounded focus:outline-none focus:border-primary" />
      </div>
      <div class="mb-6 text-left">
        <label for="password" class="block text-gray-txt mb-2">Passwort</label>
        <input type="password" id="password" v-model="password" placeholder="Geben Sie Ihr Passwort ein" required class="w-full p-2 border-2 border-gray-light rounded focus:outline-none focus:border-primary" />
      </div>
      <button type="submit" :disabled="loading" class="w-full py-3 bg-primary text-white rounded uppercase tracking-wider transition duration-300 ease-in-out hover:bg-secondary hover:shadow-lg disabled:bg-gray-light disabled:cursor-not-allowed">{{ loading ? 'Lädt...' : 'Einloggen' }}</button>
    </form>
    <p v-if="errorMsg" class="text-red mt-4">{{ errorMsg }}</p>
    <p v-if="successMsg" class="text-green mt-4">{{ successMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()
const router = useRouter()
const email = ref<string>("")
const password = ref<string>("")
const errorMsg = ref<string | null>(null)
const successMsg = ref<string | null>(null)
const loading = ref<boolean>(false)

async function logIn() {
  loading.value = true
  errorMsg.value = null
  successMsg.value = null

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
    router.push("/backend")
  } catch (error: any) {
    errorMsg.value = error.message
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    router.push("/backend")
  }
})
</script>
