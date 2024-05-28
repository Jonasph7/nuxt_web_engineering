<script setup>


const user = ref(null)
const kommentare = ref([])

const supabase = useSupabaseClient()
const supabaseUser = useSupabaseUser()

onMounted(async () => {
  user.value = supabaseUser.value
  const { data } = await supabase.from('Bewerbungen').select('*')
  kommentare.value = data
})
</script>

<template>
  <div>
    <h1>Backend</h1>
    <p v-if="user">Hallo {{ user.email }}</p>
    <p>Hier nur Zugang mit Mail und Password</p>
    <div>
      <div v-for="k in kommentare" :key="k.id">
        <p>{{ k }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 20px;
  font-size: 36px;
}

p {
  margin: 20px 0;
}
</style>
