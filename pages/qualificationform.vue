<template>
  <div class="recruiting-funnel">
    <h2 class="title">Bewerbungsformular für Systemadministrator*in</h2>
    <div class="logo-container">
      <img src="/Bild1-removebg-preview.png" alt="TechInnovate Solutions Logo" />
    </div>
    <div class="funnel-stages-container">
      <div class="funnel-stages">
        <div class="funnel-stage" @click="setActiveStage('experience')" :class="{ active: activeStage === 'experience', completed: isCompleted('experience') }">
          <h3>1. Berufserfahrung</h3>
        </div>
        <div class="funnel-stage" @click="setActiveStage('skills')" :class="{ active: activeStage === 'skills', completed: isCompleted('skills') }" v-if="isCompleted('experience')">
          <h3>2. Technische Fähigkeiten</h3>
        </div>
        <div class="funnel-stage" @click="setActiveStage('education')" :class="{ active: activeStage === 'education', completed: isCompleted('education') }" v-if="isCompleted('skills')">
          <h3>3. Bildungsabschlüsse</h3>
        </div>
        <div class="funnel-stage" @click="setActiveStage('personal')" :class="{ active: activeStage === 'personal', completed: isCompleted('personal') }" v-if="isCompleted('education')">
          <h3>4. Persönliche Informationen</h3>
        </div>
        <div class="funnel-stage" @click="setActiveStage('review')" :class="{ active: activeStage === 'review', completed: isCompleted('review') }" v-if="isCompleted('personal')">
          <h3>5. Überprüfung und Absenden</h3>
        </div>
      </div>
    </div>
    <div class="stage-content">
      <div v-if="activeStage === 'experience'" class="form-content">
        <h3>Berufserfahrung</h3>
        <form @submit.prevent="nextStage('skills')">
          <fieldset>
            <label for="experience">Jahre der Erfahrung als Systemadministrator:</label>
            <select id="experience" v-model="form.experience" required>
              <option value="0">0 Jahre</option>
              <option value="1-3">1-3 Jahre</option>
              <option value="4-10">4-10 Jahre</option>
              <option value=">10">>10 Jahre</option>
            </select>
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
        <form @submit.prevent="nextStage('personal')">
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
      <div v-if="activeStage === 'personal'" class="form-content">
        <h3>Persönliche Informationen</h3>
        <form @submit.prevent="nextStage('review')">
          <fieldset>
            <div class="input-group">
              <div class="input-item">
                <label for="firstName">Vorname:</label>
                <input type="text" id="firstName" v-model="form.firstName" required>
              </div>
              <div class="input-item">
                <label for="lastName">Nachname:</label>
                <input type="text" id="lastName" v-model="form.lastName" required>
              </div>
            </div>
            <br>
            <div class="input-group">
              <div class="input-item">
                <label for="email">E-Mail-Adresse:</label>
                <input type="email" id="email" v-model="form.email" required>
              </div>
              <div class="input-item">
                <label for="phone">Telefonnummer:</label>
                <input type="number" id="phone" v-model.number="form.phone" required>
              </div>
            </div>
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
            <p><strong>Vorname:</strong> {{ form.firstName }}</p>
            <p><strong>Nachname:</strong> {{ form.lastName }}</p>
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
      activeStage: 'experience',
      form: {
        firstName: "",
        lastName: "",
        email: "",
        phone: null,
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
      if (this.activeStage === 'personal' && (!this.form.firstName || !this.form.lastName || !this.form.email || this.form.phone === null)) {
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
          return this.form.firstName && this.form.lastName && this.form.email && this.form.phone !== null;
        case 'experience':
          return this.form.experience;
        case 'skills':
          return this.form.skills;
        case 'education':
          return this.form.education;
        case 'review':
          return this.form.firstName && this.form.lastName && this.form.email && this.form.phone !== null && this.form.experience && this.form.skills && this.form.education;
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

      // Ensure data types are correct before sending
      const formData = {
        ...this.form,
        phone: parseInt(this.form.phone, 10),
        experience: this.form.experience
      };

      try {
        const { error } = await supabase
          .from('bewerbung') // Replace 'bewerbung' with your table name
          .insert([formData]);

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
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
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
.funnel-stages-container {
  display: flex;
  flex-direction: column;
}

.funnel-stages {
  display: flex;
  flex-direction: column; /* Vertikale Anordnung */
  gap: 1rem; /* Abstand zwischen den Stufen */
  margin-bottom: 2rem;
}

.funnel-stage {
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
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
  transition: height 0.3s;
}

.form-content {
  width: 100%;
}

.form-content fieldset {
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  background: #f9f9f9;
}

.input-group {
  display: flex;
  flex-direction: column; /* Vertikale Anordnung der Eingabefelder */
  gap: 1rem;
}

.input-item {
  flex: 1;
}

/* Legendenstil */
.form-content legend {
  font-size: 1.2rem;
  color: #0044cc;
  margin-bottom: 1rem;
  font-weight: bold;
}

/* Input- und Label-Stile */
.form-content label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 1rem;
}

.form-content input,
.form-content textarea,
.form-content select {
  width: 100%;
  padding: 1rem;
  border: 2px solid #0044cc; /* Blaue Umrandung */
  border-radius: 5px;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-content input:focus,
.form-content textarea:focus,
.form-content select:focus {
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
  margin: 2rem auto 0;
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

/* Responsiveness */
@media (max-width: 768px) {
  .input-item {
    flex: 1 1 100%;
  }

  .funnel-stages {
    flex-direction: column; /* Vertikale Anordnung auf kleinen Bildschirmen */
  }
}
</style>
