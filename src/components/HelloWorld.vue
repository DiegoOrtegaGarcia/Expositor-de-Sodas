<template>
  <div ref="element" class="animated-element d-flex justify-center h-screen align-sm-center">
    <p ref="textRef" class="text">Te Amo Mucho Papa </p>
  </div>
</template>

<script setup>
  import { gsap } from 'gsap'
  import { SplitText } from 'gsap/SplitText'
  import { onMounted, ref } from 'vue'

  gsap.registerPlugin(SplitText)
  const element = ref(null)
  const textRef = ref()

  const jajaj = () => {
    const textAnimation = SplitText.create(textRef.value, { type: 'words, chars' })

    const tl = gsap.timeline({
      delay: 0.05,
      eases: 'power3',
    })

    tl.from(textAnimation.chars, {
      duration: 1,
      y: 150,
      scale: 12,
      autoAlpha: 0,
      stagger: 0.05,
      color: 'red',
    })

    tl.to(textRef.value, {
      y: -100,
      scale: 2,
      ease: 'power1.inOut',
      rotate: 360,
      duration: 1,
    })

    tl.to(textAnimation.chars, {
      duration: 1,
      y: -150,
      x: -100,
      scale: 12,
      autoAlpha: 0,
      stagger: 0.15,
      color: 'violet',
    })
  }

  onMounted(() => {
    jajaj()
  })
</script>

<style>
.text{
  color: pink;
  }
</style>
