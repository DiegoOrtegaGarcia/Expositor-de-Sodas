import { useGLTF } from '@tresjs/cientos'
import { type TresObject3D, useRenderLoop } from '@tresjs/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { markRaw, onMounted, type Raw, ref, watch } from 'vue'
import { useSodaStore } from '@/stores/app'

export const useIndex = () => {
  gsap.registerPlugin(ScrollTrigger)

  const sodaStorage = useSodaStore()

  const model = ref<Raw<TresObject3D> | null>(null)
  const groupRef = ref<TresObject3D | null>(null)
  const isLoading = ref(false)
  const SodaRef = shallowRef()

  // Cargar modelo inicial

  const uploadSoda = async (index: number) => {
    if (isLoading.value) {
      return
    }

    isLoading.value = true
    try {
      // Limpiar modelo anterior
      model.value = null

      // Cargar nuevo modelo
      const { nodes } = await useGLTF(`/models/${index}/lata.gltf`, { draco: true })
      model.value = markRaw(nodes.Circle)
      console.log('Model loaded:', model.value)
    } catch (error) {
      console.error('Error loading model:', error)
      // Intentar cargar un modelo por defecto si el específico falla
      try {
        const { nodes } = await useGLTF('/models/0/lata.gltf', { draco: true })
        model.value = markRaw(nodes.Circle)
      } catch (fallbackError) {
        console.error('Error loading fallback model:', fallbackError)
      }
    } finally {
      isLoading.value = false
    }
  }

  // Animación de flotar
  const { onLoop } = useRenderLoop()

  onLoop(({ elapsed }) => {
    if (groupRef.value) {
      // Animamos el grupo
      groupRef.value.position.y = Math.sin(elapsed) * 0.1
      groupRef.value.rotation.x = Math.sin(elapsed * 0.5) * 0.05
      groupRef.value.rotation.z = Math.cos(elapsed * 0.5) * 0.05
    }
  })

  const animeteSodaEntry = () => {
    const tl = gsap.timeline({})
    tl.from(SodaRef.value.position, {
      x: -5,
      z: -5,
      y: 6.5,
      duration: 1.5,
    }, 0)
    tl.from(SodaRef.value.rotation, {
      x: 0.4,
      duration: 1.3,
    }, 0)
    tl.from(SodaRef.value.scale, {
      x: 0.7,
      y: 0.7,
      z: 0.7,
      duration: 1.5,
    }, 0)
  }
  const animeWhithScroll = () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.app',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })
    tl.to(SodaRef.value.scale, {
      y: 1.1,
      x: 1.1,
      z: 1.1,
    }, 0)
    tl.to(SodaRef.value.rotation, {
      y: 4,
    }, 0)
  }

  onMounted(async () => {
    await uploadSoda(sodaStorage.currentSodaIndex)
    animeteSodaEntry()
    animeWhithScroll()
  })

  // Observar cambios en el índice
  watch(() => sodaStorage.currentSodaIndex, async newIndex => {
    await uploadSoda(newIndex)
    animeWhithScroll()
  })

  return { model, SodaRef }
}
