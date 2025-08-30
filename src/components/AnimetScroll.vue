<script setup lang="ts">
  import type { ComponentPublicInstance } from 'vue'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { SplitText } from 'gsap/SplitText'
  import { onMounted, ref } from 'vue'

  const textScrollContainer = ref<HTMLElement | null>(null)
  gsap.registerPlugin(ScrollTrigger, SplitText)

  // Array de refs con tipo explícito
  const textRefs = ref<HTMLElement[]>([])

  const setTextRef = (el: Element | ComponentPublicInstance | null, index: number) => {
    if (el && 'tagName' in el) {
      // Es un Element nativo
      textRefs.value[index] = el as HTMLElement
    } else if (el && '$el' in el) {
      // Es una instancia de componente Vue
      textRefs.value[index] = (el as ComponentPublicInstance).$el as HTMLElement
    }
  }

  const animate = () => {
    if (!textScrollContainer.value) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textScrollContainer.value,
        start: 'top 50%',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    // Animar todos los párrafos
    for (const textRef of textRefs.value) {
      if (textRef) {
        const textAnimation = SplitText.create(textRef, { type: 'words, lines' })
        tl.from(textAnimation.lines, {
          y: -10,
          opacity: 0.001,
          stagger: {
            each: 0.05,
            grid: [2, 1],
            from: 'end',
          },
          color: 'red',
        }, 0)
      }
    }
  }

  onMounted(() => {
    animate()
  })
</script>

<template>
  <div ref="textScrollContainer" class="d-flex justify-sm-space-between align-sm-center ma-10 h-screen">
    <p :ref="el => setTextRef(el, 0)" class="texto">Lorem, ipsum dolor sit amet consectetur adipisicing Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque unde provident, ratione doloremque earum, sit minima natus eum cupiditate distinctio totam dolor. Ullam velit iusto fuga vero qui tempore repellat.</p>
    <p :ref="el => setTextRef(el, 1)" class="texto">Lorem ipsum dolor, sit amet consectetur adipisicing elit...</p>
  </div>
</template>

<style scoped>
.texto{
  max-width: 30%;
}
</style>
