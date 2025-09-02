// stores/app.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSodaStore = defineStore('app', () => {
  const currentSodaIndex = ref(0)

  const increment = () => {
    if (currentSodaIndex.value <= 3) {
      currentSodaIndex.value++
    } else {
      setIndexSoda(0)
    }
  }

  const decrement = () => {
    if (currentSodaIndex.value > 0) {
      currentSodaIndex.value--
    }
  }

  const setIndexSoda = (index: number) => {
    currentSodaIndex.value = index
  }

  return {
    currentSodaIndex,
    increment,
    decrement,
    setIndexSoda,
  }
})
