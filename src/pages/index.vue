<template>
  <div class="gradient-background">
    <Dashboard />
    <TresCanvas alpha class="canvas" shadows window-size>
      <TresPerspectiveCamera :look-at="[0,0,0]" :position="[12, 1, 12]" />
      <TresGroup ref="groupRef">
        <primitive v-if="model" ref="SodaRef" :object="model" :scale="[1.5,1.5,1.5]" />
      </TresGroup>
      <TresAmbientLight :intensity="2" />
      <TresDirectionalLight
        cast-shadow
        :intensity="1"
        :position="[10, 10, 5]"
      />
    </TresCanvas>
    <SodaInfo />
    <ChanceSectio />
  </div>
</template>

<script lang="ts" setup>
  import { TresCanvas } from '@tresjs/core'
  import { useIndex } from '@/hooks/useIndex'

  const { SodaRef, model } = useIndex()

</script>

<style scoped>
.gradient-background {
  position: relative;
  background: radial-gradient(#fefeff, #860702,#0f0f0f);
}
</style>
