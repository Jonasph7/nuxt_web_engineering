<template>
    <div>
      <header id="main-header">
        <nav>
          <ul>
            <li><NuxtLink to="/" active-class="active-link">Homepage</NuxtLink></li>
            <li><NuxtLink to="/contactform" active-class="active-link">Kontakt</NuxtLink></li>
            <li><NuxtLink to="/qualificationform" active-class="active-link">Qualifikation</NuxtLink></li>
            <li><NuxtLink to="/impressum" active-class="active-link">Impressum</NuxtLink></li>
          </ul>
        </nav>
      </header>
      <!-- Page Content -->
      <div>
        <slot />
      </div>
    </div>
  </template>
  
  <style>
  body {
    margin: 0;
    padding: 0;
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
  
  #main-header nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
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
  </style>
  
  <script>
  export default {
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        const header = document.getElementById('main-header');
        if (window.scrollY > 50) {
          header.style.backgroundColor = 'rgba(0, 123, 255, 0.9)';
        } else {
          header.style.backgroundColor = 'rgba(0, 123, 255, 0.6)';
        }
      }
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
  </script>
  