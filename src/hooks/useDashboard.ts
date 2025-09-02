import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { nextTick, onMounted, ref } from 'vue'
import { setTextRef } from '@/helpers/arrayTextRef'

export const useDashboard = () => {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  const dasbordRef = ref<HTMLElement>()
  const textRefs = ref<HTMLElement[]>([])

  const setAnimation = (el: Element | ComponentPublicInstance | null, index: number) => {
    setTextRef(el, index, textRefs)
  }

  const animeteDashBoard = () => {
    if (!dasbordRef.value) {
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.app',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })

    tl.to(dasbordRef.value, {
      opacity: 0,
      duration: 0.5,
    })
  }

  const initialAnimation = () => {
    const tl = gsap.timeline({})
    tl.from('.DasboardTitle', {
      y: -20,
      x: -10,
      opacity: 0.3,
      color: 'gray',
      ease: 'power2.inOut',
      duration: 1,
    })

    // Esperar a que las referencias estén listas
    nextTick(() => {
      for (const [index, text] of textRefs.value.entries()) {
        if (text && text.textContent?.trim()) {
          const textAnimation = SplitText.create(text, {
            type: 'words, chars',
            wordsClass: 'word',
            charsClass: 'char',
          })
          tl.from(textAnimation.chars, {
            y: -10,
            opacity: 0.001,
            stagger: {
              each: 0.05,
              from: 'center',
            },
            color: 'red',
            duration: 0.8,
          }, index * 0.2)
        }
      }
    })
  }

  const smoothScrollTo = (target: string) => {
    const element = document.querySelector(target)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }
  onMounted(() => {
    nextTick(() => {
      initialAnimation()
      animeteDashBoard()
    })
  })

  return { setAnimation, smoothScrollTo }
}
