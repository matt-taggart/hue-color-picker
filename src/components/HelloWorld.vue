<template>
  <main>
    <h1>Hue Color Picker</h1>
    <slider-picker v-model="colors" />
  </main>
</template>

<script>
import { Slider } from 'vue-color'

const defaultProps = {
  hex: '#194d33',
  hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
  hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
  rgba: { r: 25, g: 77, b: 51, a: 1 },
  a: 1
}

export default {
  name: 'HelloWorld',
  components: {
    'slider-picker': Slider
  },
  data () {
    return {
      colors: defaultProps
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
a {
  color: #42b983;
}
#app > main > .vc-slider {
  margin: 0 auto;
}
</style>
