<template>
  <div class="page-wrapper" :class="{'shifted': isMenuOpen}">
    <header id="main-header">
      <nav>
        <div class="nav-wrapper">
          <!-- Burger Menü -->
          <div class="burger-menu" @click="toggleMenu">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
          <!-- Navigationslinks -->
          <ul :class="{'open': isMenuOpen}">
            <li><NuxtLink to="/" active-class="active-link" @click.native="closeMenu">Homepage</NuxtLink></li>
            <li><NuxtLink to="/contactform" active-class="active-link" @click.native="closeMenu">Kontakt</NuxtLink></li>
            <li><NuxtLink to="/qualificationform" active-class="active-link" @click.native="closeMenu">Bewerbungsformular</NuxtLink></li>
            <li><NuxtLink to="/impressum" active-class="active-link" @click.native="closeMenu">Impressum</NuxtLink></li>
            <li class="spacer"></li>
            <li><NuxtLink to="/login" active-class="active-link" @click.native="closeMenu">Login für Interne</NuxtLink></li>
          </ul>
        </div>
      </nav>
    </header>
    
    <div class="content-wrapper">
      <!-- Seiteninhalt -->
      <slot />
    </div>

    <!-- Footer -->
    <footer id="main-footer">
      <div class="footer-content">
        <ul>
          <li><NuxtLink to="/" active-class="active-link" @click.native="closeMenu">Homepage</NuxtLink></li>
          <li><NuxtLink to="/contactform" active-class="active-link" @click.native="closeMenu">Kontakt</NuxtLink></li>
          <li><NuxtLink to="/qualificationform" active-class="active-link" @click.native="closeMenu">Bewerbungsformular</NuxtLink></li>
          <li><NuxtLink to="/impressum" active-class="active-link" @click.native="closeMenu">Impressum</NuxtLink></li>
          <li><NuxtLink to="/login" active-class="active-link" @click.native="closeMenu">Login für Interne</NuxtLink></li>
        </ul>
        <p>&copy; 2024 TechInnovate Solutions. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false // Zustand des Menüs (geöffnet/geschlossen)
    };
  },
  methods: {
    toggleMenu() {
      // Menüstatus umschalten (öffnen/schließen)
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      // Menü schließen
      this.isMenuOpen = false;
    }
  }
}
</script>

<style>
/* Grundlegende Stile für den Body */
body {
  margin: 0;
  padding: 0;
}

/* Wrapper für die gesamte Seite */
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: transform 0.3s ease;

}

/* Verschobener Zustand des Page Wrappers, wenn das Menü geöffnet ist */
.page-wrapper.shifted {
  transform: translateX(250px); /* Anpassung entsprechend der Menübreite */
}

/* Header-Stile */
#main-header {
  background-color: rgba(0, 123, 255, 0.6);
  color: white;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
  height: 55px;
  display: flex;
  align-items: center;
}

/* Navigation im Header */
#main-header nav {
  width: 100%;
}

/* Wrapper für die Navigation */
.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

/* Burger Menü-Stile */
.burger-menu {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
  position: fixed;
  left: 10px; /* Anpassung um Überlappung zu vermeiden */
  top: 5px; /* Anpassung um Überlappung zu vermeiden */
  z-index: 1001;
}

.burger-menu .bar {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 4px 0;
}

/* Navigationsliste im Header */
#main-header nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

/* Listenelemente in der Navigation */
#main-header nav ul li {
  margin: 0 10px;
}

/* Links in der Navigation */
#main-header nav ul li a {
  text-decoration: none;
  color: white;
  padding: 2px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border: 1px solid transparent;
  border-radius: 5px;
  transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
}

/* Hover-Effekte für Links in der Navigation */
#main-header nav ul li a:hover {
  border-color: rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* Aktiver Link */
.active-link {
  border-color: white;
}

/* Platzhalter für Flex-Grow */
.spacer {
  flex-grow: 1;
}

/* Wrapper für den Seiteninhalt */
.content-wrapper {
  flex: 1;
  padding-top: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* Footer-Stile */
#main-footer {
  background-color: rgba(0, 123, 255, 0.6);
  color: white;
  width: 100%;
  position: relative;
  text-align: center;
  padding: 20px;
  margin-top: 40px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
}

#main-footer ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

#main-footer ul li {
  margin: 0 10px;
}

#main-footer ul li a {
  color: white;
  text-decoration: none;
}

#main-footer p {
  margin-top: 10px;
  font-size: 0.9rem;
}

/* Responsive Stile für kleinere Bildschirme */
@media (max-width: 768px) {
  :root {
    --menu-height: 300px; 
    
  }

  /* Burger Menü wird sichtbar */
  .burger-menu {
    display: flex;
  }

  /* Anpassung der Navigationsliste für mobile Ansicht */
  #main-header nav ul {
    flex-direction: column;
    top: 0;
    left: -250px; /* Start außerhalb des Viewports */
    width: 250px;
    height: 100%; /* Höhe 100% */
    background-color: rgba(0, 123, 255, 0.9);
    overflow-y: auto; /* Ermöglicht Scrollen im Menü */
    transition: left 0.3s ease; /* Übergangseffekt */
    z-index: 1000;
    position: fixed; /* Fixiert bei geöffnetem Menü */
  }


  #main-header nav ul li {
    margin: 10px 0;
  }
}

/* Verschieben des Inhalts, wenn das Menü geöffnet ist */
.page-wrapper.shifted .content-wrapper {
  transform: translateX(250px);
}
</style>
