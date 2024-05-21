<template>
  <div class="page-wrapper" :class="{'shifted': isMenuOpen}">
    <header id="main-header">
      <nav>
        <div class="nav-wrapper">
          <!-- Burger Menu -->
          <div class="burger-menu" @click="toggleMenu">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
          <!-- Navigation Links -->
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
      <!-- Page Content -->
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
      isMenuOpen: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);

    // Close the burger menu when the route changes
    this.$router.beforeEach((to, from, next) => {
      this.closeMenu();
      next();
    });
  },
  methods: {
    handleScroll() {
      const header = document.getElementById('main-header');
      if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(0, 123, 255, 0.9)';
      } else {
        header.style.backgroundColor = 'rgba(0, 123, 255, 0.6)';
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Macht die Wrapper-Höhe mindestens so groß wie die Höhe des Ansichtsfensters */
  transition: padding-top 0.3s ease;
}

.page-wrapper.shifted {
  padding-top: calc(40px + var(--menu-height));
}

#main-header {
  background-color: rgba(0, 123, 255, 0.6);
  color: white;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
  height: 40px;
  display: flex;
  align-items: center;
}

#main-header nav {
  width: 100%;
}

.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.burger-menu {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
}

.burger-menu .bar {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 4px 0;
}

#main-header nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

#main-header nav ul li {
  margin: 0 10px;
}

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

#main-header nav ul li a:hover {
  border-color: rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.active-link {
  border-color: white;
}

.spacer {
  flex-grow: 1; /* Dieser Platzhalter sorgt dafür, dass "Login für Interne" rechts ausgerichtet wird */
}

.content-wrapper {
  flex: 1; /* Vergrößert den Inhaltsbereich, damit der Footer unten bleibt */
  padding-top: 60px; /* Platz für den fixierten Header */
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: flex-start; /* Align the content at the top */
}

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

/* Responsive Styles */
@media (max-width: 768px) {
  :root {
    --menu-height: 300px; 
  }

  .burger-menu {
    display: flex;
  }

  #main-header nav ul {
    flex-direction: column;
    position: fixed;
    top: 40px;
    left: 0;
    width: 100%;
    background-color: rgba(0, 123, 255, 0.9);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  #main-header nav ul.open {
    max-height: var(--menu-height); 
  }

  #main-header nav ul li {
    margin: 10px 0;
  }
}
</style>
