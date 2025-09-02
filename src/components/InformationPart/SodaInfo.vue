<script setup lang="ts">
  import { useSodaInfo } from '@/hooks/useSodaInfo'

  const { setContainerRef, setTextRef, currentSoda } = useSodaInfo()

</script>

<template>
  <div class="h-screen w-100 d-flex align-center justify-sm-space-between px-4 Info">
    <!-- Card izquierda - Información compacta -->
    <div :ref="el => setContainerRef(el, 0)">
      <v-card
        class="soda-card left-card ma-10"
        elevation="0"
        min-height="320"
        width="280"
      >
        <v-card-title class="text-h5 font-weight-bold white--text text-center pa-3">
          <span :ref="el => setTextRef(el, 0)">{{ currentSoda.name }}</span>
        </v-card-title>

        <v-divider class="mx-3 my-2 neon-divider" />

        <v-card-text class="pa-3">
          <v-row class="mb-2">
            <v-col class="py-1" cols="6">
              <div class="text-caption grey--text text--lighten-2">Precio:</div>
              <div class="text-h6 font-weight-bold neon-red--text">
                <span :ref="el => setTextRef(el, 1)">${{ currentSoda.price }}</span>
              </div>
            </v-col>
            <v-col class="py-1" cols="6">
              <div class="text-caption grey--text text--lighten-2">Calorías:</div>
              <div class="text-h6 font-weight-bold white--text">
                <span :ref="el => setTextRef(el, 2)">{{ currentSoda.calories }}</span>
              </div>
            </v-col>
          </v-row>

          <v-row class="mb-2">
            <v-col class="py-1" cols="6">
              <div class="text-caption grey--text text--lighten-2">Tamaño:</div>
              <div class="text-body-1 font-weight-bold white--text">
                <span :ref="el => setTextRef(el, 3)">{{ currentSoda.size }}</span>
              </div>
            </v-col>
          </v-row>

          <div class="mb-2">
            <div class="text-caption grey--text text--lighten-2 mb-1">Sabor:</div>
            <div class="text-body-2 white--text">
              <span :ref="el => setTextRef(el, 4)">{{ currentSoda.flavor }}</span>
            </div>
          </div>

          <div class="mb-2">
            <div class="text-caption grey--text text--lighten-2 mb-1">Valoración:</div>
            <div class="d-flex align-center">
              <v-rating
                background-color="grey darken-2"
                class="neon-rating"
                color="#ff2a6d"
                :length="currentSoda.rating"
                readonly
                size="18"
              />
              <span :ref="el => setTextRef(el, 5)" class="ml-2 text-caption white--text">{{ currentSoda.rating }}</span>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>

    <!-- Card derecha - Información adicional compacta -->
    <div :ref="el => setContainerRef(el, 1)">
      <v-card
        class="soda-card right-card ma-10"
        elevation="0"
        min-height="320"
        width="280"
      >
        <v-card-text class="pa-3">
          <v-row class="mb-2">
            <v-col class="py-1" cols="6">
              <div class="text-caption grey--text text--lighten-2">Azúcar:</div>
              <div class="text-h6 font-weight-bold neon-red--text">
                <span :ref="el => setTextRef(el, 6)">{{ currentSoda.sugar }}g</span>
              </div>
            </v-col>
            <v-col class="py-1" cols="6">
              <div class="text-caption grey--text text--lighten-2">Cafeína:</div>
              <div class="text-h6 font-weight-bold white--text">
                <span :ref="el => setTextRef(el, 7)">{{ currentSoda.caffeine }}mg</span>
              </div>
            </v-col>
          </v-row>

          <div class="mb-2">
            <div class="text-caption grey--text text--lighten-2 mb-1">Ingredientes:</div>
            <div class="d-flex flex-wrap">
              <v-chip
                v-for="(ingredient, index) in currentSoda.ingredients.slice(0, 3)"
                :key="index"
                class="ma-1 neon-chip"
                dark
                x-small
              >
                <span :ref="el => setTextRef(el, 8 + index)">{{ ingredient }}</span>
              </v-chip>
            </div>
          </div>

          <div class="mb-3">
            <div class="text-caption grey--text text--lighten-2 mb-1">Beneficios:</div>
            <ul class="pl-3 ma-0">
              <li
                v-for="(benefit, index) in currentSoda.benefits.slice(0, 2)"
                :key="index"
                class="text-caption mb-1 white--text"
              >
                <span :ref="el => setTextRef(el, 11 + index)">{{ benefit }}</span>
              </li>
            </ul>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.soda-card {
  border-radius: 16px;
  transition: all 0.4s ease;
  background: transparent;
  backdrop-filter: blur(12px);
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}

.soda-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 16px;
  padding: 2px;
  background: linear-gradient(45deg,
    transparent 0%,
    #ff2a2a 25%,
    #d10000 50%,
    #ff2a2a 75%,
    transparent 100%
  );
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  animation: neonGlow 3s ease-in-out infinite alternate;
}

.soda-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow:
    0 0 20px rgba(255, 42, 42, 0.3),
    0 0 40px rgba(255, 42, 42, 0.2),
    0 0 60px rgba(255, 42, 42, 0.1) !important;
}

.soda-card:hover::before {
  animation: neonGlow 1.5s ease-in-out infinite alternate;
}

.left-card::before {
  background: linear-gradient(45deg,
    transparent 0%,
    #ff2a2a 25%,
    #d10000 50%,
    #ff2a2a 75%,
    transparent 100%
  );
}

.right-card::before {
  background: linear-gradient(225deg,
    transparent 0%,
    #ff2a2a 25%,
    #d10000 50%,
    #ff2a2a 75%,
    transparent 100%
  );
}

.neon-divider {
  border-color: rgba(255, 42, 42, 0.5) !important;
  box-shadow: 0 0 8px rgba(255, 42, 42, 0.3);
}

.neon-chip {
  border: 1px solid #ff2a2a;
  background: rgb(0, 0, 0) !important;
  box-shadow: 0 0 6px rgba(247, 244, 244, 0.3);
  transition: all 0.3s ease;
  color: #f7f4f4;
}

.neon-chip:hover {
  background: rgba(255, 42, 42, 0.2) !important;
  box-shadow: 0 0 12px rgba(255, 42, 42, 0.5);
  transform: translateY(-1px);
}

.neon-rating {
  filter: drop-shadow(0 0 2px #ff2a2a);
}

/* Animación neón */
@keyframes neonGlow {
  0% {
    opacity: 0.7;
    box-shadow:
      0 0 5px rgba(255, 42, 42, 0.3),
      0 0 10px rgba(255, 42, 42, 0.2);
  }
  100% {
    opacity: 1;
    box-shadow:
      0 0 10px rgba(255, 42, 42, 0.5),
      0 0 20px rgba(255, 42, 42, 0.3),
      0 0 30px rgba(255, 42, 42, 0.2);
  }
}

/* Texto neón personalizado */
.neon-red--text {
  color: #ff2a2a !important;
  text-shadow:
    0 0 5px #ff2a6d,
    0 0 10px rgba(255, 42, 42, 0.5),
    0 0 15px rgba(255, 42, 42, 0.3);
}

/* Efecto de brillo en hover para toda la card */
.soda-card:hover .neon-red--text {
  animation: textPulse 2s ease-in-out infinite alternate;
}

@keyframes textPulse {
  0% {
    text-shadow:
      0 0 5px #ff2a2a,
      0 0 10px rgba(255, 42, 42, 0.5);
  }
  100% {
    text-shadow:
      0 0 10px #ff2a2a,
      0 0 20px rgba(255, 42, 42, 0.7),
      0 0 30px rgba(255, 42, 42, 0.5);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .soda-card {
    width: 250px !important;
  }
}

@media (max-width: 768px) {
  .d-flex {
    flex-direction: column;
    gap: 30px;
  }

  .soda-card {
    width: 100% !important;
    max-width: 320px;
    margin: 20px auto !important;
  }
}

/* Asegurar que el contenido esté por encima del borde */
.v-card__title, .v-card__text {
  position: relative;
  z-index: 2;
}
</style>

<style>
/* Clase global para el color neón */
.neon-red--text {
  color: #ff2a2a !important;
}

/* Estilos para la animación de texto */
.char {
  display: inline-block;
}

.word {
  white-space: nowrap;
}
</style>
