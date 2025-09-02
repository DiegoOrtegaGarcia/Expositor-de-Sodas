<script setup lang="ts">
  import { useChanceSection } from '@/hooks/useChanceSection'

  const { decrement, increment } = useChanceSection()
</script>
<template>
  <div class="ChanceSection h-screen w-100 d-flex justify-sm-space-between align-sm-center">
    <v-btn class="ma-10" icon="mdi-arrow-left" variant="outlined" @click="decrement" />
    <v-btn class="ma-10" icon="mdi-arrow-right" variant="outlined" @click="increment" />
  </div>
</template>
<style scoped>
</style>
