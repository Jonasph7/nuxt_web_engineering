<template>
  <div :class="{ dark: isDarkMode }">
    <div class="page-wrapper" :class="{ shifted: isMenuVisible }">
      <header class="bg-gray-900 sticky top-0 z-50">
        <div class="container mx-auto flex justify-between items-center py-4">
          <div class="flex items-center">
            <nuxt-link to="/"><img src="@/public/Bild1-removebg-preview.png" alt="TechInnovate Solutions Logo" class="h-14 w-auto mr-4"></nuxt-link>
          </div>
          <div class="flex md:hidden">
            <button id="hamburger" class="text-white focus:outline-none" @click="toggleMenu">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
          <nav class="hidden md:flex md:flex-grow justify-center">
            <ul class="flex justify-center space-x-4 text-white">
              <li><nuxt-link to="/" class="hover:text-secondary font-bold">Home</nuxt-link></li>
              <li><nuxt-link to="/contactform" class="hover:text-secondary font-bold">Kontakt</nuxt-link></li>
              <li><nuxt-link to="/qualificationform" class="hover:text-secondary font-bold">Karriere</nuxt-link></li>
              <li><nuxt-link to="/impressum" class="hover:text-secondary font-bold">Impressum</nuxt-link></li>
              <li v-if="isLoggedIn"><nuxt-link to="/backend" class="hover:text-secondary font-bold">Backend</nuxt-link></li>
            </ul>
          </nav>
          <div class="hidden lg:flex items-center space-x-4">
            <button @click="toggleDarkMode" class="bg-primary hover:bg-secondary text-white font-semibold px-4 py-2 rounded-full">
              {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
            </button>
            <button v-if="isLoggedIn" @click="logout" class="bg-primary hover:bg-secondary text-white font-semibold px-4 py-2 rounded-full inline-block">Logout</button>
            <nuxt-link v-else to="/login" class="bg-primary hover:bg-secondary text-white font-semibold px-4 py-2 rounded-full inline-block">Login</nuxt-link>
          </div>
        </div>
      </header>
      <nav id="mobile-menu-placeholder" v-show="isMenuVisible" class="mobile-menu flex flex-col items-center space-y-8 md:hidden">
        <ul>
          <li><nuxt-link to="/" class="hover:text-secondary font-bold">Home</nuxt-link></li>
          <li><nuxt-link to="/contactform" class="hover:text-secondary font-bold">Kontakt</nuxt-link></li>
          <li><nuxt-link to="/qualificationform" class="hover:text-secondary font-bold">Karriere</nuxt-link></li>
          <li><nuxt-link to="/impressum" class="hover:text-secondary font-bold">Impressum</nuxt-link></li>
          <li v-if="isLoggedIn"><nuxt-link to="/backend" class="hover:text-secondary font-bold">Backend</nuxt-link></li>
        </ul>
        <div class="flex flex-col mt-6 space-y-2 items-center">
          <button @click="toggleDarkMode" class="bg-primary hover:bg-secondary text-white font-semibold px-4 py-2 rounded-full">
            {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
          </button>
          <button v-if="isLoggedIn" @click="logout" class="bg-primary hover:bg-secondary text-white font-semibold px-4 py-2 rounded-full flex items-center justify-center min-w-[110px]">Logout</button>
          <nuxt-link v-else to="/login" class="bg-primary hover:bg-secondary text-white font-semibold px-4 py-2 rounded-full flex items-center justify-center min-w-[110px]">Login</nuxt-link>
        </div>
      </nav>
      
      <div class="content-wrapper bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <slot />
      </div>

      <footer class="py-10 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <img src="@/public/Bild1-removebg-preview.png" alt="Logo" class="h-14 w-auto mx-auto mb-5">
        <span class="block text-center text-gray-txt font-semibold">© 2024 TechInnovate Solutions. Alle Rechte vorbehalten.</span>
        <ul class="flex justify-center mt-10 space-x-8">
          <li><a href="https://instagram.com" target="_blank"><img src="@/public/instagram.png" alt="Instagram" class="h-10 w-10 hover:drop-shadow-sm"></a></li>
          <li><a href="https://youtube.com" target="_blank"><img src="@/public/youtube.png" alt="YouTube" class="h-10 w-10"></a></li>
          <li><a href="https://facebook.com" target="_blank"><img src="@/public/facebook.png" alt="Facebook" class="h-10 w-10"></a></li>
          <li><a href="https://twitter.com" target="_blank"><img src="@/public/twitter.png" alt="Twitter" class="h-10 w-10"></a></li>
          <li><a href="https://linkedin.com" target="_blank"><img src="@/public/linkedin.png" alt="LinkedIn" class="h-10 w-10"></a></li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabase'

export default {
  data() {
    return {
      isMenuVisible: false,
      isLoggedIn: false,
      isDarkMode: false
    };
  },
  mounted() {
    this.checkAuthStatus();
    supabase.auth.onAuthStateChange((event, session) => {
      this.isLoggedIn = !!session;
    });
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  },
  methods: {
    async checkAuthStatus() {
      const { data: { session } } = await supabase.auth.getSession();
      this.isLoggedIn = !!session;
    },
    async logout() {
      await supabase.auth.signOut();
      this.isLoggedIn = false;
      this.$router.push('/'); // Weiterleitung zur Startseite nach dem Logout
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    closeMenu() {
      this.isMenuVisible = false;
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('darkMode', this.isDarkMode);
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}
</script>

<style scoped>
.mobile-menu {
  position: fixed;  
  top: 80px;           
  left: 0;          
  right: 0;         
  padding: 2rem;    
  background-color: white; 
  z-index: 1;
  opacity: 0.9; 
}

.dark .mobile-menu {
  background-color: #1a1a1a;
}

.mobile-menu ul {
  width: 100%;
  text-align: center;
}

.mobile-menu li {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1rem;
  padding-top: 1rem;
}

.dark .mobile-menu li {
  border-bottom: 1px solid #4a4a4a;
}

footer a:hover {
  filter: drop-shadow(0 0 4px #010717);
}

.dark footer span {
  color: #cccccc;
}

.dark footer a:hover {
  filter: drop-shadow(0 0 4px #fafafa);
}

.page-wrapper {
  transition: background-color 0.3s, color 0.3s;
}
</style>
