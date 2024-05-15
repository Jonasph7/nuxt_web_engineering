<!-- pages/protected.vue -->

<template>
    <div>
      <h1>Willkommen auf der geschützten Seite!</h1>
      <p>Dies ist der Inhalt, den nur eingeloggte Benutzer sehen können.</p>
    </div>
  </template>
<script>
export default {
middleware: 'auth'
}
</script>