<!-- src/components/Home.vue -->
<template>
  <div>
    <div id="hero">
    <img src="/hero-banner.jpg" alt="Hero Banner" />    
  </div>
    <section id="about-us">
      <h1>Willkommen bei TechInnovate Solutions</h1>
      <p>Wir stehen an der Spitze der technologischen Innovation und sind verpflichtet, bahnbrechende Lösungen zu entwickeln, die unsere Kunden und Mitarbeiter stärken.</p>
    </section>
  
    <section id="our-values">
    <h2>Wir suchen ab sofort Systemadministratoren für unser Team (m/w/d)</h2>
    </section>

<div class="slideshow-container-background">
  <div class="slideshow-container">
    <div class="slides" :style="{ 'transform': 'translateX(' + (-currentSlide * 100) + '%)' }">
      <div class="slide" v-for="(image, index) in images" :key="index" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
    </div>
    <button class="prev" @click="prevSlide">❮</button>
    <button class="next" @click="nextSlide">❯</button>
    <h2>Werfen Sie einen Blick in unser modernes Bürogebäude und lernen Sie unsere Arbeitswelt kennen</h2>
  </div>
</div>
  

  <section id="benefits">
  <h2>Warum bei uns arbeiten?</h2>
  <p>Teil von TechInnovate Solution zu werden bedeutet, Teil eines unterstützenden und dynamischen Teams zu sein. Hier ist, was wir bieten:</p>
  <ul>
    <li>Wettbewerbsfähige Gehälter</li>
    <li>Flexible Arbeitszeiten</li>
    <li>Gesundheits- und Wellnessprogramme</li>
    <li>Fortlaufende Lern- und Entwicklungsmöglichkeiten</li>
  </ul>  
</section>

<section id="contact-us">
  <h2>Bereit für neue Herausforderungen? Jetzt bewerben und Teil unseres Teams werden!</h2>
  <button class="button-home-styling">JETZT BEWERBEN!</button>
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
    };
  },
  mounted() {
    this.startSlideshow();
  },
  methods: {
    startSlideshow() {
      setInterval(() => {
        this.nextSlide();
      }, 6000); // Wechselt die Slides alle 3 Sekunden
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide + this.images.length - 1) % this.images.length;
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
  }

#hero img {
  width: 40%;
  height: auto;
  border-radius: 500px;
}

#about-us {
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
  background-color: #F7F7F7;
  color: #1C1D18;
}

#our-values {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
  color: #234A5F;
}

.slideshow-container {
  position: relative;
  max-width: 40%;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  color: #1C1D18;
}

.slideshow-container-background {
  background-color: #F7F7F7;
  padding-top: 30px;
  padding-bottom: 30px;
}

.slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slide {
  flex: 0 0 100%;
  height: 500px; /* Höhe Ihrer Wahl */
  background-size: cover;
  background-position: center;
  border-radius: 500px;
  object-fit: cover;
}

button.prev,
button.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

button.prev { left: 10px; }
button.next { right: 10px; }

#benefits {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 30px;
  padding-bottom: 30px;
  color: #234A5F;
}

#contact-us {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #F7F7F7;
  color: #1C1D18;
}

.button-home-styling {
  color: #1C1D18;
  border-color: #1C1D18;
  background-color: transparent;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.button-home-styling:hover {
  color: white;
  background-color: #1C1D18;
}
</style>