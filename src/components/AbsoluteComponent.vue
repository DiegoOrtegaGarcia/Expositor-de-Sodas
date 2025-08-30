<script lang="ts" setup>
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { onMounted, ref } from 'vue'

  gsap.registerPlugin(ScrollTrigger)

  const fotoRef = ref<HTMLImageElement | null>(null)
  const textScrollContainer = ref<HTMLElement | null>(null)

  const animate = () => {
    if (!fotoRef.value) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.app',
        start: '70% bottom',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    tl.from(textScrollContainer.value, {
      y: -100,
      opacity: 0,
      scale: 0.8,
      rotation: -5,
      duration: 1.5,
      ease: 'power2.out',
    })
  }

  onMounted(() => {
    animate()
  })
</script>

<template>
  <div ref="textScrollContainer" class="photo-container">
    <div class="photo-wrapper">
      <img
        ref="fotoRef"
        alt="Imagen decorativa"
        class="styled-photo"
        src="/fondo.jpg"
      >
      <div class="photo-overlay" />
      <div class="photo-frame" />
    </div>
  </div>
</template>

<style scoped>
.photo-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  pointer-events: none;
}

.photo-wrapper {
  position: relative;
  display: inline-block;
  perspective: 1000px;
}

.styled-photo {
  width: 350px;
  height: 500px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transform-style: preserve-3d;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  filter:
    brightness(1.05)
    contrast(1.1)
    saturate(1.2);
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.styled-photo:hover {
  transform: scale(1.02) rotateY(5deg) rotateX(5deg);
  box-shadow:
    0 35px 60px -12px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  filter:
    brightness(1.1)
    contrast(1.2)
    saturate(1.3);
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  border-radius: 20px;
  pointer-events: none;
  mix-blend-mode: overlay;
}

.photo-frame {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  pointer-events: none;
  box-shadow:
    inset 0 0 20px rgba(255, 255, 255, 0.1),
    0 0 30px rgba(0, 0, 0, 0.3);
}

/* Efectos de iluminación */
.photo-wrapper::before {
  content: '';
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 70%
  );
  border-radius: 30px;
  pointer-events: none;
  z-index: -1;
}

/* Responsive */
@media (max-width: 768px) {
  .styled-photo {
    width: 280px;
    height: 400px;
    border-radius: 15px;
  }

  .photo-frame {
    border-radius: 20px;
  }
}

@media (max-width: 480px) {
  .styled-photo {
    width: 220px;
    height: 320px;
    border-radius: 12px;
  }

  .photo-frame {
    border-radius: 16px;
  }
}

/* Animación sutil de flotación */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.styled-photo {
  animation: float 6s ease-in-out infinite;
}
</style>
