<template lang="pug">
  main
    .connection-bar(:style="connectionBarStyle") {{ connectionStatus }}
    h1 Hue Color Picker
    slider-picker(:value="colors", @input="updateColor")
    .light-bulb-container
      toggle-switch(
        v-model="lightsOn",
        :colors="colors",
        :applyCorrections="applyCorrections"
      )
      div
        .light-effect(:style="hexColorStyle")
        i.fa.fa-lightbulb-o
</template>

<script>
import { Slider } from 'vue-color'
import Hue from 'hue'
import ToggleSwitch from './toggleSwitch.vue'
import debounce from 'lodash/debounce'

const hue = Hue.init({
  ip: process.env.IP || '127.0.0.1',
  username: process.env.USERNAME || 'My Hue'
})

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
    'slider-picker': Slider,
    'toggle-switch': ToggleSwitch
  },
  data () {
    return {
      colors: defaultProps,
      connected: false,
      connectionStatus: 'No Hue Bridge Connection Found',
      lightsOn: false
    }
  },
  computed: {
    hexColorStyle () {
      return {
        backgroundColor: this.lightsOn
          ? this.colors.hex
          : '#ffffff'
      }
    },
    connectionBarStyle () {
      return {
        backgroundColor: this.connected
          ? '#00d1b2'
          : '#ff3860'
      }
    }
  },
  async mounted () {
    try {
      await hue.getAllLights()
      this.connected = true
      this.connectionStatus = 'Hue Bridge Connected'
    } catch (e) {
      this.connected = false
      this.connectionStatus = 'No Hue Bridge Connection Found'
    }
  },
  methods: {
    updateColor: debounce(function (value) {
      this.colors = value

      const { r, g, b } = this.colors.rgba
      const { x, y } = this.applyCorrections(r, g, b)

      try {
        hue.setLightStateAll({
          xy: [+x, +y]
        })
      } catch (error) {
        console.error(error)
      }
    }, 750),

    computeGammaCorrection (color) {
      return (color > 0.04045)
        ? Math.pow((color + 0.055) / (1.0 + 0.055), 2.4)
        : (color / 12.92)
    },
    computeD65Conversion (r, g, b) {
      const X = r * 0.664511 + g * 0.154324 + b * 0.162028
      const Y = r * 0.283881 + g * 0.668433 + b * 0.047685
      const Z = r * 0.000088 + g * 0.072310 + b * 0.986039

      return { X, Y, Z }
    },
    calculateXYValues (X, Y, Z) {
      const x = (X / (X + Y + Z)).toFixed(4)
      const y = (Y / (X + Y + Z)).toFixed(4)

      return { x, y }
    },
    applyCorrections (r, g, b) {
      const gammaCorrectedRed = this.computeGammaCorrection(r)
      const gammaCorrectedGreen = this.computeGammaCorrection(g)
      const gammaCorrectedBlue = this.computeGammaCorrection(b)

      const { X, Y, Z } = this.computeD65Conversion(
        gammaCorrectedRed,
        gammaCorrectedGreen,
        gammaCorrectedBlue
      )

      return this.calculateXYValues(X, Y, Z)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
a {
  color: #42b983;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    z-index: -1;
  }
}

.connection-bar {
  margin: 0 0 20px 0;
  padding: 0.8em;
  width: 100%;
  color: white;
  font-size: 1.1em
}
</style>
