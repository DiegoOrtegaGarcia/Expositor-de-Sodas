import type { ComponentPublicInstance, Ref } from 'vue'

export const setTextRef = (el: Element | ComponentPublicInstance | null, index: number, textRefs: Ref<HTMLElement[]>) => {
  if (el && 'tagName' in el) {
    // Es un Element nativo
    textRefs.value[index] = el as HTMLElement
  } else if (el && '$el' in el) {
    // Es una instancia de componente Vue
    textRefs.value[index] = (el as ComponentPublicInstance).$el as HTMLElement
  }
}
