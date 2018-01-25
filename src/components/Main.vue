<template lang="pug">
  main
    h1 Hue Color Picker
    slider-picker(v-model="colors")
    .light-bulb-container
      div
        .light-effect
        i.fa.fa-lightbulb-o
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
  name: 'Main',
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
.light-bulb-container {
  margin: 2em 5em;
  > div {
    display: flex;
    justify-content: center;
  }
  .fa-lightbulb-o {
    font-size: 10em;
  }
  .light-effect {
    position: absolute;
    text-align: center;
    width: 70px;
    height: 80px;
    border-radius: 80px;
    margin: 1.25em 0 0 0;
    background: yellow;
    z-index: -1;
  }
}
</style>
