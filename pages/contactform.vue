<template>
<section id="contact" class="bg-white py-16 flex items-center justify-center min-h-screen">
    <div class="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        <!-- Google Maps und Kontaktinfo-Bereich unverändert -->
        <div class="lg:w-2/3 md:w-1/2 bg-blue-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe width="100%" height="100%" class="absolute inset-0" frameborder="0" title="map" marginheight="0" marginwidth="0" scrolling="no"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4652.754908136425!2d10.17543319361391!3d54.332636429808424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b257b630a3b029%3A0x9ce68f427e43e95c!2sSokratespl.%201%2C%2024149%20Kiel!5e0!3m2!1sde!2sde!4v1717624855907!5m2!1sde!2sde"
                style="filter: grayscale(0) contrast(1.2) opacity(0.6);"></iframe>
            <div class="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                <div class="lg:w-1/2 px-6">
                    <h2 class="font-bold text-gray-dark">ADRESSE</h2>
                    <p class="mt-1">Sokratesplatz 1<br>24149 Kiel</p>
                </div>
                <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
                    <h2 class="font-bold text-gray-dark">EMAIL</h2>
                    <a href="mailto:techinnovatesolutions@fh-kiel.com" class="text-primary leading-relaxed">techinnovatesolutions@fh-kiel.com</a>
                    <h2 class="font-bold text-gray-dark mt-4">PHONE</h2>
                    <a href="tel:+4917212345678" class="leading-relaxed">+49 172 12345678</a>
                </div>
            </div>
        </div>
        <!-- Kontaktformular mit Tailwind und neuer Layout-Struktur -->
        <div class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 class="text-primary text-lg mb-2 font-medium">In Kontakt treten</h2>
            <p class="mb-5 text-gray-txt">Haben Sie Fragen, Anregungen oder möchten Sie einfach nur Hallo sagen? Wir würden uns freuen, von Ihnen zu hören! Schicken Sie uns eine Nachricht und wir werden so schnell wie möglich auf Sie zurückkommen.</p>
            <div class="relative w-full bg-gray-300 rounded-full h-4 mb-4">
                <div :style="{ width: progress + '%' }" class="bg-primary h-full rounded-full transition-all duration-300">
                    <span :style="{ color: progress > 0 ? 'white' : '#004cfd' }" class="absolute left-2 top-1/2 transform -translate-y-1/2 font-bold">{{ progress.toFixed(0) }}%</span>
                </div>
            </div>
            <form @submit.prevent="onSubmit" class="space-y-4">
                <div class="relative mb-4">
                    <label for="name" class="leading-7 text-sm text-gray-dark">Name</label>
                    <input type="text" id="name" v-model="form.name" required class="w-full bg-white rounded border border-gray-txt text-base outline-none text-gray-txt py-1 px-3 leading-8">
                </div>
                <div class="relative mb-4">
                    <label for="email" class="leading-7 text-sm text-gray-dark">Email</label>
                    <input type="email" id="email" v-model="form.email" required class="w-full bg-white rounded border border-gray-txt text-base outline-none text-gray-txt py-1 px-3 leading-8">
                </div>
                <div class="relative mb-4">
                    <label for="subject" class="leading-7 text-sm text-gray-dark">Betreff</label>
                    <input type="text" id="subject" v-model="form.subject" required class="w-full bg-white rounded border border-gray-txt text-base outline-none text-gray-txt py-1 px-3 leading-8">
                </div>
                <div class="relative mb-4">
                    <label for="message" class="leading-7 text-sm text-gray-dark">Ihre Nachricht</label>
                    <textarea id="message" v-model="form.message" required class="w-full bg-white rounded border border-gray-txt h-32 text-base outline-none text-gray-txt py-1 px-3 resize-none"></textarea>
                </div>
                <button type="submit" class="text-white bg-primary border-0 py-3 px-6 focus:outline-none hover:bg-secondary rounded text-lg w-full">Senden</button>
            </form>
            <p v-if="formHasErrors" class="text-red mt-4">Bitte füllen Sie alle erforderlichen Felder aus.</p>
            <p v-if="formSuccessMessage" class="text-green mt-4">{{ formSuccessMessage }}</p>
            <p v-if="formErrorMessage" class="text-red mt-4">{{ formErrorMessage }}</p>
        </div>
    </div>
</section>

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
