<!-- src/components/ContactForm.vue -->

<template>
  <div class="contact-form-container">
    <h2>Kontaktformular</h2>
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progress + '%' }">
        <span class="progress-percent" :style="{ 'color': progress > 0 ? 'white' : '#007BFF' }">{{ progress.toFixed(0) }}%</span>
      </div>
    </div>
    <form @submit.prevent="onSubmit" class="contact-form">
      <input type="text" v-model="form.name" placeholder="Name" required />
      <input type="email" v-model="form.email" placeholder="E-Mail" required />
      <input type="text" v-model="form.subject" placeholder="Betreff" required />
      <textarea v-model="form.message" placeholder="Ihre Nachricht" rows="6" required></textarea>
      <button type="submit">Senden</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ContactForm",
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
    };
  },
  computed: {
    progress() {
      let filledFields = 0;
      for (const key in this.form) {
        if (this.form[key] !== '') filledFields++;
      }
      return (filledFields / Object.keys(this.form).length) * 100;
    }
  },
  methods: {
    onSubmit() {
      console.log('Formulardaten:', this.form);
      this.form = { name: '', email: '', subject: '', message: '' };
      alert('Vielen Dank für Ihre Nachricht!');
    }
  }
};
</script>

<style scoped>
.contact-form-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact-form-container h2 {
  font-size: 2.5rem;
  color: #007BFF;
  text-align: center;
  margin-bottom: 2rem;
}

.progress-container {
  position: relative;
  width: 100%;
  background-color: #e1e1e1;
  border-radius: 5px;
  height: 20px;
  margin-bottom: 1rem;
}

.progress-bar {
  height: 100%;
  background-color: #007BFF;
  width: 0;
  border-radius: 5px;
  transition: width 0.3s ease-in-out;
}

.progress-percent {
  font-size: 1rem;
  font-weight: bold;
  position: absolute;
  left: 10px; /* Geändert von 0 auf 10px um sicherzustellen, dass es innerhalb des Balkens beginnt */
  top: 50%;
  transform: translateY(-50%);
  color: #007BFF; /* Geändert zu einer Farbe, die sichtbar ist, wenn der Fortschritt 0% beträgt */
}

.contact-form {
  display: flex;
  flex-direction: column;
}

.contact-form input,
.contact-form textarea {
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 2px solid #e1e1e1;
  border-radius: 5px;
  font-size: 1rem;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: #0044cc;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 68, 204, 0.2);
}

.contact-form button {
  padding: 1rem;
  background-color: #0044cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.contact-form button:hover,
.contact-form button:focus {
  background-color: #003399;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.contact-form button:active {
  transform: translateY(1px);
}
</style>
