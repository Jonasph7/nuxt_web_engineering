<!-- src/components/QualificationForm.vue -->



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
      phone: '',
      experience: '',
      skills: '',
      education: '',
    }
  };
},
methods: {
  submitForm() {
    if (this.validateForm()) {
      // Hier würde man normalerweise einen API-Aufruf machen
      console.log('Bewerbung gesendet:', this.form);
      // Zeige eine Erfolgsmeldung oder leite auf eine Dankesseite um
    } else {
      // Zeige Fehlermeldungen an
      this.formHasErrors = true; // Dies setzt voraus, dass Sie eine neue Datenvariable `formHasErrors` haben
    }
  },
  validateForm() {
    // Implementieren Sie hier die Logik zur Validierung des Formulars
    // Zum Beispiel können Sie prüfen, ob alle erforderlichen Felder ausgefüllt wurden
    return document.querySelector('.qualifications-form').checkValidity();
  }
}
}
</script>



<style scoped>
/* Allgemeine Formularstile */
.qualifications-form {
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

/* Feldset-Stile */
.qualifications-form fieldset {
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  background: #f9f9f9;
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
}

/* Stile für Interaktionen */
.qualifications-form input:focus,
.qualifications-form textarea:focus,
.qualifications-form select:focus {
  border-color: #0044cc;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 68, 204, 0.2);
}

/* Button-Stile */
.qualifications-form button {
  background-color: #0044cc;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.qualifications-form button:hover,
.qualifications-form button:focus {
  background-color: #003399;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.qualifications-form button:active {
  transform: translateY(1px);
}

h2 {
  text-align: center;
  color: #0044cc;
}

</style>