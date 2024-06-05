<template>
  <div class="container mx-auto p-4 bg-white rounded-lg shadow-md max-w-xl">
    <h2 class="text-4xl text-primary text-center mb-8 font-bold">Kontaktformular</h2>
    <div class="relative w-full bg-gray-300 rounded-full h-4 mb-4">
      <div :style="{ width: progress + '%' }" class="bg-primary h-full rounded-full transition-all duration-300">
        <span :style="{ color: progress > 0 ? 'white' : '#004cfd' }" class="absolute left-2 top-1/2 transform -translate-y-1/2 font-bold">{{ progress.toFixed(0) }}%</span>
      </div>
    </div>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <input type="text" v-model="form.name" placeholder="Name" required class="w-full p-2 border-2 border-gray-300 rounded-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"/>
      <input type="email" v-model="form.email" placeholder="E-Mail" required class="w-full p-2 border-2 border-gray-300 rounded-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"/>
      <input type="text" v-model="form.subject" placeholder="Betreff" required class="w-full p-2 border-2 border-gray-300 rounded-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"/>
      <textarea v-model="form.message" placeholder="Ihre Nachricht" rows="6" required class="w-full p-2 border-2 border-gray-300 rounded-md focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
      <button type="submit" class="w-full py-2 bg-primary text-white rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300">Senden</button>
    </form>
    <p v-if="formHasErrors" class="text-red mt-4">Bitte füllen Sie alle erforderlichen Felder aus.</p>
    <p v-if="formSuccessMessage" class="text-green mt-4">{{ formSuccessMessage }}</p>
    <p v-if="formErrorMessage" class="text-red mt-4">{{ formErrorMessage }}</p>
  </div>
</template>

<script>
import { supabase } from '@/supabase' // Adjust the path according to your project structure

export default {
  name: "ContactForm",
  data() {
    return {
      form: {
        name: "",
        email: "",
        subject: "",
        message: ""
      },
      formHasErrors: false,
      formSuccessMessage: "",
      formErrorMessage: ""
    };
  },
  computed: {
    progress() {
      let filledFields = 0;
      for (const key in this.form) {
        if (this.form[key] !== "") filledFields++;
      }
      return (filledFields / Object.keys(this.form).length) * 100;
    }
  },
  methods: {
    async onSubmit() {
      // Frontend-Validierung
      if (!this.form.name || !this.form.email || !this.form.subject || !this.form.message) {
        this.formHasErrors = true;
        return;
      }

      this.formHasErrors = false; // reset error state

      try {
        const { error } = await supabase
          .from('kontakt') // Replace 'contact_form' with your table name
          .insert([this.form]);

        if (error) {
          console.error("Error details:", error);
          this.formErrorMessage = error.message;
        } else {
          this.formSuccessMessage = "Nachricht erfolgreich gesendet!";
          // Formularfelder zurücksetzen
          this.form = {
            name: "",
            email: "",
            subject: "",
            message: ""
          };
          this.formErrorMessage = ""; // Clear previous error message
        }
      } catch (error) {
        console.error("Fehler beim Senden des Formulars:", error);
        this.formErrorMessage = "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
      }
    }
  }
};
</script>
