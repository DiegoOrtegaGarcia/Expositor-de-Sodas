import gsap from 'gsap'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { SODAS } from '@/constants/constants'
import { useSodaStore } from '@/stores/app'

export const useSodaInfo = () => {
  const sodaStorage = useSodaStore()
  const containersRef = ref<HTMLElement[]>([])
  const textElements = ref<HTMLElement[]>([])

  // Usamos una computed property para reactividad automática
  const currentSoda = ref(SODAS[sodaStorage.currentSodaIndex])

  // Actualizamos cuando cambia el índice
  watch(() => sodaStorage.currentSodaIndex, async newIndex => {
    // Primero animamos la salida del contenido actual
    await animateOut()

    // Actualizamos el contenido
    currentSoda.value = SODAS[newIndex]

    // Esperar a que el DOM se actualice con la nueva información
    await nextTick()

    // Ejecutar animación de entrada del nuevo contenido
    animateIn()
  })

  const setContainerRef = (el: unknown, index: number) => {
    if (el && (el as HTMLElement).style) {
      containersRef.value[index] = el as HTMLElement
    }
  }

  const setTextRef = (el: unknown, index: number) => {
    if (el && (el as HTMLElement).style) {
      textElements.value[index] = el as HTMLElement
    }
  }

  const animateOut = () => {
    const promises: Promise<void>[] = []

    // Animación de salida para contenedores
    for (const [_index, container] of containersRef.value.entries()) {
      if (container) {
        const promise = new Promise<void>(resolve => {
          gsap.to(container, {
            y: -50,
            opacity: 0,
            scale: 0.8,
            ease: 'power2.in',
            duration: 0.4,
            onComplete: () => resolve(),
          })
        })
        promises.push(promise)
      }
    }

    return Promise.all(promises)
  }

  const animateIn = () => {
    const tl = gsap.timeline()

    // Animación de entrada para contenedores
    for (const [index, container] of containersRef.value.entries()) {
      if (container) {
        tl.fromTo(container,
          {
            y: 50,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            ease: 'back.out(1.7)',
            duration: 0.8,
            scale: 1,
          }, index * 0.2)
      }
    }

    // Animación de texto con efecto de escritura
    for (const [index, textElement] of textElements.value.entries()) {
      if (textElement && textElement.textContent) {
        const originalText = textElement.textContent
        const text = originalText.trim()
        const chars = text.split('')

        // Limpiar el elemento
        textElement.textContent = ''

        // Crear spans para cada carácter
        for (const [charIndex, char] of chars.entries()) {
          const charSpan = document.createElement('span')
          charSpan.textContent = char === ' ' ? '\u00A0' : char
          charSpan.style.display = 'inline-block'
          charSpan.style.opacity = '0'
          charSpan.style.transform = 'translateY(20px) rotateX(-90deg)'
          textElement.append(charSpan)

          // Animar cada carácter
          tl.to(charSpan, {
            y: 0,
            opacity: 1,
            rotationX: 0,
            ease: 'power2.out',
            duration: 0.3,
          }, index * 0.2 + 0.3 + charIndex * 0.02)
        }
      }
    }
  }

  onMounted(() => {
    // Pequeño delay para asegurar que el DOM esté listo
    setTimeout(() => {
      animateIn()
    }, 100)
  })

  // Limpiar cuando el componente se desmonte
  onUnmounted(() => {
    gsap.killTweensOf(containersRef.value)
    gsap.killTweensOf(textElements.value)
  })

  return {
    setContainerRef, setTextRef, currentSoda,
  }
}
