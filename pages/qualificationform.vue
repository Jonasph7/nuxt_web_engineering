<template>
  <div class="qualifications-form">
    <h2>Bewerbungsformular für Systemadministrator</h2>
    <div class="logo-container">
      <img src="/Bild1-removebg-preview.png" alt="TechInnovate Solutions Logo" />
    </div>
    <form @submit.prevent="submitForm">
      <fieldset>
        <legend>Persönliche Informationen</legend>
        <label for="name">Vollständiger Name:</label>
        <input type="text" id="name" v-model="form.name" required>
        <label for="email">E-Mail-Adresse:</label>
        <input type="email" id="email" v-model="form.email" required>
        <label for="phone">Telefonnummer:</label>
        <input type="tel" id="phone" v-model="form.phone">
      </fieldset>
      <fieldset>
        <legend>Berufserfahrung</legend>
        <label for="experience">Jahre der Erfahrung als Systemadministrator:</label>
        <input type="number" id="experience" v-model="form.experience" min="0" required>
      </fieldset>
      <fieldset>
        <legend>Technische Fähigkeiten</legend>
        <label for="skills">Liste der technischen Fähigkeiten:</label>
        <textarea id="skills" v-model="form.skills" placeholder="Trennen Sie verschiedene Fähigkeiten mit einem Komma."></textarea>
      </fieldset>
      <fieldset>
        <legend>Bildungsabschlüsse</legend>
        <label for="education">Höchster erreichter Bildungsabschluss:</label>
        <select id="education" v-model="form.education">
          <option value="bachelor">Bachelor</option>
          <option value="master">Master</option>
          <option value="doctorate">Doktor</option>
          <option value="other">Andere</option>
        </select>
      </fieldset>
      <button type="submit">Bewerbung absenden</button>
      <p v-if="formHasErrors" class="error-message">Bitte füllen Sie alle erforderlichen Felder aus.</p>
      <p v-if="formSuccessMessage" class="success-message">{{ formSuccessMessage }}</p>
      <p v-if="formErrorMessage" class="error-message">{{ formErrorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { supabase } from '@/supabase' // Adjust the path according to your project structure

export default {
  name: "QualificationForm",
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        experience: "",
        skills: "",
        education: "",
      },
      formHasErrors: false,
      formSuccessMessage: "",
      formErrorMessage: "",
    };
  },
  methods: {
    async submitForm() {
      // Frontend-Validierung
      if (!this.form.name || !this.form.email || !this.form.experience) {
        this.formHasErrors = true;
        return;
      }
      this.formHasErrors = false; // reset error state

      try {
        const { error } = await supabase
          .from('bewerbung') // Replace 'bewerbung' with your table name
          .insert([this.form]);

        if (error) {
          console.error("Error details:", error);
          this.formErrorMessage = error.message;
        } else {
          this.formSuccessMessage = "Bewerbung erfolgreich eingereicht!";
          // Formularfelder zurücksetzen
          this.form = {
            name: "",
            email: "",
            phone: "",
            experience: "",
            skills: "",
            education: "",
          };
          this.formErrorMessage = ""; // Clear previous error message
        }
      } catch (error) {
        console.error("Fehler beim Senden des Formulars:", error);
        this.formErrorMessage = "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
      }
    },
  },
};
</script>

<style scoped>
/* Your existing styles */
</style>
