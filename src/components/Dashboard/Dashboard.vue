<script setup lang="ts">
  import { useDashboard } from '@/hooks/useDashboard'

  const { setAnimation, smoothScrollTo } = useDashboard()

</script>

<template>
  <!-- Div contenedor fixed -->
  <div class="fixed-header">
    <v-app-bar
      ref="dasbordRef"
      app
      class="fixed-navbar"
      color="black"
      dark
      elevation="4"
      height="70"
    >
      <!-- Logo/Brand -->
      <v-app-bar-nav-icon class="mr-2">
        <v-icon color="red-darken-4">mdi-fire</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title class="text-h6 font-weight-bold red--text text--darken-1 DasboardTitle">
        Soda Expoxition
      </v-toolbar-title>

      <v-spacer />

      <!-- Botones de navegación -->
      <v-btn
        class="mx-1 nav-btn"
        color="white"
        variant="text"
        @click="smoothScrollTo(`.Info`)"
      >
        <span :ref="el => setAnimation(el, 0)" class="button-text">Inicio</span>
        <v-icon color="red-darken-2" right>mdi-home</v-icon>
      </v-btn>

      <v-btn
        class="mx-1 nav-btn"
        color="white"
        variant="text"
        @click="smoothScrollTo(`.ChanceSection`)"
      >
        <span :ref="el => setAnimation(el, 1)" class="button-text">Refrescos</span>
        <v-icon color="red-darken-2" right>mdi-star</v-icon>
      </v-btn>
    </v-app-bar>
  </div>

  <!-- Espaciador para el contenido debajo del navbar -->
</template>

<style scoped>
/* Contenedor fixed */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

/* Navbar fijo */
.fixed-navbar {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
}

/* Espaciador para el contenido */
.navbar-spacer {
  height: 70px;
  width: 100%;
}

/* Asegurar que el navbar se mantenga arriba de todo */
.v-app-bar {
  position: fixed !important;
}

/* Efectos hover personalizados */
.nav-btn {
  position: relative;
  overflow: visible !important;
  transition: all 0.3s ease;
}

/* Estilos para SplitText */
.char {
  display: inline-block;
  position: relative;
}

.word {
  white-space: nowrap;
}

.nav-btn::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #f44336, transparent);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-btn:hover::before {
  width: 100%;
}

.nav-btn:hover {
  transform: translateY(-2px);
  color: #f44336 !important;
}

.nav-btn:hover .button-text {
  color: #f44336 !important;
}

.nav-btn:hover .v-icon {
  color: #f44336 !important;
  transform: scale(1.1);
}

.v-icon {
  transition: all 0.3s ease;
}

.button-text {
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  z-index: 2;
}

/* Efecto de ripple personalizado */
:deep(.v-ripple__container) {
  color: #f44336 !important;
}

/* Animación de subrayado al hacer hover */
.nav-btn::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #f44336;
  transition: width 0.3s ease;
  z-index: 1;
}

.nav-btn:hover::after {
  width: 100%;
}

/* Asegurar que el navbar esté siempre visible */
.v-toolbar__content {
  position: relative;
  z-index: 1001;
}
</style>
