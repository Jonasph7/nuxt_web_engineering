<template>
  <div class="impressum-container">
    <h1>Impressum</h1>

    <div class="contact-info">
      <p><strong>Alfred Schmitz</strong><br />
        Tulpenstraße 312<br />
      360420 Wolfenstein</p>

      <p><strong>Handelsregister:</strong> 360420<br />
      <strong>Registergericht:</strong> Kiel</p>

      <p><strong>Vertreten durch:</strong><br />
      Alfred Schmitz, Erika Schmitz</p>
    </div>

    <h2>Kontakt</h2>
    <p><strong>Telefon:</strong> +49 172 12345678<br />
    <strong>E-Mail:</strong> techinnovatesolutions@email.de</p>

    <h2>Redaktionell verantwortlich</h2>
    <p>Karla Kolumna</p>

    <h2>EU-Streitschlichtung</h2>
    <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
      <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>. 
      Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

    <h2>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
    <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

    <p class="source">Quelle: <a href="https://www.e-recht24.de">e-recht24.de</a></p>
  </div>
</template>

<style scoped>
.impressum-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  box-sizing: border-box; /* Ensures padding is included in total width and height */
  width: 100%; /* Ensure container takes full width on smaller screens */
}

.impressum-container h1, .impressum-container h2 {
  color: #007BFF;
  word-wrap: break-word; /* Ensures long words wrap correctly */
}

.impressum-container a {
  color: #007BFF;
  text-decoration: none;
}

.impressum-container a:hover {
  text-decoration: underline;
}

.contact-info p, .impressum-container p, .source {
  background: #f0f0f0;
  border-left: 4px solid #007BFF;
  padding: 10px;
  margin-bottom: 15px;
  word-wrap: break-word; /* Ensures long words wrap correctly */
}

.source {
  font-style: italic;
  text-align: right;
}

@media (max-width: 768px) {
  .impressum-container {
    padding: 10px; /* Reduces padding for smaller screens */
  }

  .impressum-container h1, .impressum-container h2 {
    font-size: 1.5em; /* Adjusts font size for smaller screens */
  }

  .contact-info p, .impressum-container p, .source {
    padding: 5px; /* Adjusts padding for smaller screens */
    font-size: 0.9em; /* Adjusts font size for smaller screens */
  }
}
</style>
