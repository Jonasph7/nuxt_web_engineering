<template>
    <!-- Abschnitt, der den gesamten Inhalt der Dankes-Seite enthält -->
    <section class="bg-white py-16 flex items-center justify-center min-h-screen">
        <!-- Container für zentrierten Inhalt -->
        <div class="container px-5 py-24 mx-auto text-center">
            <!-- Container für das grüne Häkchen im Kreis -->
            <div class="w-32 h-32 mx-auto mb-8">
                <!-- SVG-Grafik des Kreises mit Häkchen -->
                <svg class="w-full h-full text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <!-- Kreis -->
                    <circle cx="12" cy="12" r="10" stroke-width="2"></circle>
                    <!-- Häkchen -->
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4"></path>
                </svg>
            </div>
            <!-- Titel der Dankesseite -->
            <h1 class="text-3xl font-medium text-green mb-4">Vielen Dank!</h1>
            <!-- Nachricht -->
            <p class="text-lg text-gray-txt">Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns so schnell wie möglich bei Ihnen melden.</p>
        </div>
    </section>
</template>

<script>
export default {
    name: "ThankYou"
};
</script>