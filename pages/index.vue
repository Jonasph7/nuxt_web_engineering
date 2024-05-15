<!-- src/components/Home.vue -->
<template>
  <div>
    <!-- Abschnitt "Über uns" -->
    <section id="about-us">
      <h1>Willkommen bei TechInnovate Solutions</h1>
      <p>Wir stehen an der Spitze der technologischen Innovation und sind verpflichtet, bahnbrechende Lösungen zu entwickeln, die unsere Kunden und Mitarbeiter stärken.</p>
    </section>

    <!-- Hero Banner -->
    <div id="hero">
      <img src="/hero-banner.jpg" alt="Hero Banner" />    
    </div>

    <!-- Slideshow -->
    <div class="slideshow-container">
      <div class="slide">
        <img :src="images[currentSlide]" alt="Slide Image" />
      </div>
      <button class="prev" @click="prevSlide">
        <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
      <button class="next" @click="nextSlide">
        <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
        </svg>
      </button>
    </div>

    <!-- Moderner Text unter der Slideshow -->
    <p class="slideshow-text">Werfen Sie einen Blick in unser modernes Bürogebäude!</p>

    <!-- Trenner -->
    <hr class="section-divider">

    <!-- Inhaltslayout -->
    <section id="content-layout">
      <div class="content-wrapper">
        <div class="text">
          <h2>Warum bei uns arbeiten?</h2>
          <p>Teil von TechInnovate Solution zu werden bedeutet, Teil eines unterstützenden und dynamischen Teams zu sein. Hier ist, was wir bieten:</p>
          <ul>
            <li>Wettbewerbsfähige Gehälter</li>
            <li>Flexible Arbeitszeiten</li>
            <li>Gesundheits- und Wellnessprogramme</li>
            <li>Fortlaufende Lern- und Entwicklungsmöglichkeiten</li>
          </ul>
        </div>
        <div class="image">
          <img src="/Büro1.png" alt="Arbeitsplatz" />
        </div>
      </div>
      <div class="content-wrapper reverse">
        <div class="text">
          <h2>Anforderungen an Systemadministratoren</h2>
          <ul>
            <li>Erfahrung mit Windows- und Linux-Servern</li>
            <li>Kenntnisse in Netzwerkadministration und -sicherheit</li>
            <li>Vertrautheit mit Cloud-Computing und Virtualisierungstechnologien</li>
            <li>Problemlösungs- und Troubleshooting-Fähigkeiten</li>
            <li>Teamfähigkeit und gute Kommunikationskompetenzen</li>
            <li>Organisationstalent und Zeitmanagement</li>
          </ul>
        </div>
        <div class="image">
          <img src="/Cafeteria.png" alt="Technologie und Teamarbeit" />
        </div>
      </div>
    </section>

    <!-- Bewerbungsaufforderung -->
    <section id="bewerbung">
      <h2>Bereit für neue Herausforderungen? Jetzt bewerben und Teil unseres Teams werden!</h2>
      <button @click="navigateToQualificationForm" class="button-home-styling">JETZT BEWERBEN!</button>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      images: [
        '/Konferenzraum.png', // Pfad zum ersten Bild
        '/Serverraum1.png',   // Pfad zum zweiten Bild
        '/Unternehmen1.png',  // Pfad zum dritten Bild
      ],
      currentSlide: 0,
      slideshowInterval: null,
    };
  },
  mounted() {
    this.startSlideshow();
  },
  beforeDestroy() {
    clearInterval(this.slideshowInterval);
  },
  methods: {
    // Startet die Slideshow
    startSlideshow() {
      this.slideshowInterval = setInterval(() => {
        this.nextSlide();
      }, 6000); // Wechselt die Slides alle 6 Sekunden
    },
    // Zeigt das nächste Bild
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    },
    // Zeigt das vorherige Bild
    prevSlide() {
      this.currentSlide = (this.currentSlide + this.images.length - 1) % this.images.length;
    },
    // Navigiert zum Bewerbungsformular
    navigateToQualificationForm() {
      this.$router.push('/qualificationform');
    }
  }
};
</script>

<style scoped>
#hero {
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
  border-radius: 500px; /* Runde Ecken für das Hero Banner */
}

#hero img {
  width: 50%;
  height: auto;
  border-radius: 500px; /* Runde Ecken */
}

#about-us {
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: center;
  background-color: #F7F7F7;
  color: #1C1D18;
}

.slideshow-container {
  position: relative;
  max-width: 50%;
  margin: 30px auto;
  text-align: center;
  color: #1C1D18;
  background-color: #F7F7F7;
  padding: 30px;
  border-radius: 500px; /* Runde Ecken */
  overflow: hidden;
}

.slide {
  display: flex;
  justify-content: center;
  transition: opacity 0.5s ease-in-out; /* Sanfter Übergang */
}

.slide img {
  width: 100%;
  height: auto;
  border-radius: 500px; /* Runde Ecken */
}

.slideshow-text {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: #007BFF; /* Blaue Schrift */
  font-weight: bold;
  text-transform: uppercase; /* Text in Großbuchstaben */
  padding: 10px 50px; /* 50 Pixel Abstand zu beiden Seiten */
  border: 2px solid #007BFF; /* Blaue Umrandung */
  border-radius: 25px; /* Runde Ecken für die Umrandung */
  transition: transform 0.3s ease; /* Übergangseffekt für das Hover */
}

.slideshow-text:hover {
  transform: scale(1.05); /* Vergrößert den Text beim Hover */
}

.arrow-icon {
  fill: white;
  width: 24px;
  height: 24px;
  transition: all 0.2s ease-in-out;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  padding: 4px;
}

.arrow-icon:hover {
  transform: scale(1.1);
  background-color: rgba(0, 0, 0, 0.6);
}

button.prev, button.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
}

button.prev {
  left: 10px;
}

button.next {
  right: 10px;
}

.section-divider {
  margin: 40px 0;
  border: 0;
  border-top: 1px solid #ccc;
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.content-wrapper.reverse {
  flex-direction: row-reverse;
}

.text {
  flex: 1;
  padding: 10px;
}

.image {
  flex: 1;
  padding: 10px;
  display: flex;
  justify-content: center;
}

.image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

#benefits, #requirements, #contact-us, #bewerbung {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 30px;
  background-color: #F7F7F7;
  color: #1C1D18;
}

.button-home-styling {
  color: #FFF;
  background-color: #1C1D18;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.button-home-styling:hover {
  background-color: #333;
}
</style>
