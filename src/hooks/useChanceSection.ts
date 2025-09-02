import { useSodaStore } from '@/stores/app'

export const useChanceSection = () => {
  const sodaStorage = useSodaStore()

  const increment = () => {
    sodaStorage.increment()
  }
  const decrement = () => {
    sodaStorage.decrement()
  }

  return { increment, decrement }
}
