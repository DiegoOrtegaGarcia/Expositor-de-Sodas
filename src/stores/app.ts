// Utilities
import { defineStore } from 'pinia'

export const useSodaStore = defineStore('app', {
  state: () => ({
    currentSodaIndex: 0,
  }),
  actions: {
    setIndexSoda (index: number) {
      this.currentSodaIndex = index
    },
  },
})
