<template>
    <div>
     <header>
     <nav>
     <ul>
     <li><NuxtLink to="/">Homepage</NuxtLink></li>
     <li><NuxtLink to="/contactform">Kontakt</NuxtLink></li>
     <li><NuxtLink to="/qualificationform">Qualifikation</NuxtLink></li>
     <li><NuxtLink to="/impressum">Impressum</NuxtLink></li>
     </ul>
     </nav>
     </header>
     <!-- Page Content -->
     <div>
     <slot />
     </div>
    </div>
    </template>