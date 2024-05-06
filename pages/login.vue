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
      <button type="submit">Einloggen</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    onSubmit() {
      // Beispiel für eine Backend-Verbindung: POST-Anfrage senden
      const credentials = {
        username: this.username,
        password: this.password
      };

      fetch('https://example-backend.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Login fehlgeschlagen');
          }
          return response.json();
        })
        .then(data => {
          alert('Login erfolgreich!');
          // Beispielweise einen Token speichern oder zur Dashboard-Seite navigieren
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
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
</style>
