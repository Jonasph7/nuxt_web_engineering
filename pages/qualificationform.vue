<template>
  <div class="recruiting-funnel">
    <h2 class="title">Bewerbungsformular für Systemadministrator*in</h2>
    <div class="logo-container">
      <img src="/Bild1-removebg-preview.png" alt="TechInnovate Solutions Logo" />
    </div>
    <div class="funnel-stages">
      <div class="funnel-stage" @click="setActiveStage('personal')" :class="{ active: activeStage === 'personal', completed: isCompleted('personal') }">
        <h3>1. Persönliche Informationen</h3>
      </div>
      <div class="funnel-stage" @click="setActiveStage('experience')" :class="{ active: activeStage === 'experience', completed: isCompleted('experience') }" v-if="isCompleted('personal')">
        <h3>2. Berufserfahrung</h3>
      </div>
      <div class="funnel-stage" @click="setActiveStage('skills')" :class="{ active: activeStage === 'skills', completed: isCompleted('skills') }" v-if="isCompleted('experience')">
        <h3>3. Technische Fähigkeiten</h3>
      </div>
      <div class="funnel-stage" @click="setActiveStage('education')" :class="{ active: activeStage === 'education', completed: isCompleted('education') }" v-if="isCompleted('skills')">
        <h3>4. Bildungsabschlüsse</h3>
      </div>
      <div class="funnel-stage" @click="setActiveStage('review')" :class="{ active: activeStage === 'review', completed: isCompleted('review') }" v-if="isCompleted('education')">
        <h3>5. Überprüfung und Absenden</h3>
      </div>
    </div>
    <div class="stage-content">
      <div v-if="activeStage === 'personal'" class="form-content">
        <h3>Persönliche Informationen</h3>
        <form @submit.prevent="nextStage('experience')">
          <fieldset>
            <div class="input-group">
              <div class="input-item">
                <label for="name">Vollständiger Name:</label>
                <input type="text" id="name" v-model="form.name" required>
              </div>
              <div class="input-item">
                <label for="email">E-Mail-Adresse:</label>
                <input type="email" id="email" v-model="form.email" required>
              </div>
            </div>
            <div class="input-group">
              <div class="input-item">
                <label for="phone">Telefonnummer:</label>
                <input type="number" id="phone" v-model="form.phone" required>
              </div>
            </div>
          </fieldset>
          <br>
          <button type="submit" class="next-button">Weiter</button>
        </form>
      </div>
      <div v-if="activeStage === 'experience'" class="form-content">
        <h3>Berufserfahrung</h3>
        <form @submit.prevent="nextStage('skills')">
          <fieldset>
            <label for="experience">Jahre der Erfahrung als Systemadministrator:</label>
            <input type="number" id="experience" v-model="form.experience" min="0" required>
          </fieldset>
          <br>
          <button type="submit" class="next-button">Weiter</button>
        </form>
      </div>
      <div v-if="activeStage === 'skills'" class="form-content">
        <h3>Technische Fähigkeiten</h3>
        <form @submit.prevent="nextStage('education')">
          <fieldset>
            <label for="skills">Liste der technischen Fähigkeiten:</label>
            <textarea id="skills" v-model="form.skills" placeholder="Trennen Sie verschiedene Fähigkeiten mit einem Komma." required></textarea>
          </fieldset>
          <br>
          <button type="submit" class="next-button">Weiter</button>
        </form>
      </div>
      <div v-if="activeStage === 'education'" class="form-content">
        <h3>Bildungsabschlüsse</h3>
        <form @submit.prevent="nextStage('review')">
          <fieldset>
            <label for="education">Höchster erreichter Bildungsabschluss:</label>
            <select id="education" v-model="form.education" required>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="Doktor">Doktor</option>
              <option value="Andere">Andere</option>
            </select>
          </fieldset>
          <br>
          <button type="submit" class="next-button">Weiter</button>
        </form>
      </div>
      <div v-if="activeStage === 'review'" class="form-content">
        <h3>Überprüfen und Absenden</h3>
        <form @submit.prevent="submitForm">
          <fieldset>
            <legend>Überprüfung Ihrer Informationen</legend>
            <p><strong>Name:</strong> {{ form.name }}</p>
            <p><strong>E-Mail:</strong> {{ form.email }}</p>
            <p><strong>Telefonnummer:</strong> {{ form.phone }}</p>
            <p><strong>Erfahrung:</strong> {{ form.experience }} Jahre</p>
            <p><strong>Fähigkeiten:</strong> {{ form.skills }}</p>
            <p><strong>Bildungsabschluss:</strong> {{ form.education }}</p>
          </fieldset>
          
          <button type="submit" class="submit-button">Bewerbung absenden</button>
        </form>
        <p v-if="formHasErrors" class="error-message">Bitte füllen Sie alle erforderlichen Felder aus.</p>
        <p v-if="formSuccessMessage" class="success-message">{{ formSuccessMessage }}</p>
        <p v-if="formErrorMessage" class="error-message">{{ formErrorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabase' // Adjust the path according to your project structure

export default {
  name: "QualificationForm",
  data() {
    return {
      activeStage: 'personal',
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
    setActiveStage(stage) {
      if (this.isCompleted(stage) || this.activeStage === stage) {
        this.activeStage = stage;
      }
    },
    nextStage(stage) {
      if (this.validateStage()) {
        this.activeStage = stage;
      }
    },
    validateStage() {
      this.formHasErrors = false;
      if (this.activeStage === 'personal' && (!this.form.name || !this.form.email)) {
        this.formHasErrors = true;
        return false;
      }
      if (this.activeStage === 'experience' && !this.form.experience) {
        this.formHasErrors = true;
        return false;
      }
      if (this.activeStage === 'skills' && !this.form.skills) {
        this.formHasErrors = true;
        return false;
      }
      if (this.activeStage === 'education' && !this.form.education) {
        this.formHasErrors = true;
        return false;
      }
      return true;
    },
    isCompleted(stage) {
      switch(stage) {
        case 'personal':
          return this.form.name && this.form.email;
        case 'experience':
          return this.form.experience;
        case 'skills':
          return this.form.skills;
        case 'education':
          return this.form.education;
        case 'review':
          return this.form.name && this.form.email && this.form.experience && this.form.skills && this.form.education;
        default:
          return false;
      }
    },
    async submitForm() {
      if (!this.isCompleted('review')) {
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

/* Stile für den Titel */
.title {
  text-align: center;
  margin-bottom: 2rem;
}

/* Allgemeine Stile für das Recruiting Funnel */
.recruiting-funnel {
  max-width: 1200px;
  margin: 2rem;
  padding: 10rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

/* Stile für den Logo-Container */
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

/* Stile für die Funnel-Stufen */
.funnel-stages {
  justify-content: space-between;
  margin-bottom: 2rem;
}

.funnel-stage {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
  flex: 1;
  margin: 0 5px;
}

.funnel-stage.active {
  background: #e0eaff;
  border: 2px solid #0044cc;
}

.funnel-stage.completed {
  background: #d4edda;
}

.funnel-stage:hover {
  background: #e1e1e1;
}

.funnel-stage h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: #0044cc;
}

/* Stile für das Formular und die Inhaltsbereiche */
.stage-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px; /* Festgelegte Mindesthöhe für Konsistenz */
  height: 400px; /* Feste Höhe */
  transition: height 0.3s;
}

.form-content {
  width: 100%;
}

.qualifications-form fieldset {
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  background: #f9f9f9;
}

.input-group {
  display: solid;
  gap: 1rem;
}

.input-item {
  flex: 1;
}

/* Legendenstil */
.qualifications-form legend {
  font-size: 1.2rem;
  color: #0044cc;
  margin-bottom: 1rem;
  font-weight: bold;
}

/* Input- und Label-Stile */
.qualifications-form label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 1rem;
}

.qualifications-form input,
.qualifications-form textarea,
.qualifications-form select {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e1e1e1;
  border-radius: 5px;
  margin-bottom: 1rem;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.qualifications-form input:focus,
.qualifications-form textarea:focus,
.qualifications-form select:focus {
  border-color: #0044cc;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 68, 204, 0.2);
}

/* Button-Stile */
.next-button, .submit-button {
  background-color: #0044cc;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
}

.next-button:hover, .submit-button:hover {
  background-color: #003399;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.next-button:active, .submit-button:active {
  transform: translateY(1px);
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 1rem;
}

.success-message {
  color: green;
  text-align: center;
  margin-top: 1rem;
}
</style>
