<template lang="pug">
  label.switch
    input(type="checkbox", @click="flipSwitch")
    span.slider.round
</template>

<script>
import Hue from 'hue'

const hue = Hue.init({
  ip: process.env.IP || '127.0.0.1',
  username: process.env.USERNAME || 'My Hue'
})

export default {
  name: 'ToggleSwitch',
  props: ['colors'],
  data () {
    return {
      checked: false
    }
  },
  methods: {
    async flipSwitch () {
      const { r, g, b } = this.colors.rgba

      this.checked = !this.checked
      this.$emit('input', this.checked)

      if (this.checked) {
        try {
          const { x, y } = this.applyCorrections(r, g, b)

          await hue.setLightStateAll({
            xy: [+x, +y]
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        try {
          await hue.turnOffAllLights()
        } catch (error) {
          console.error(error)
        }
      }
    },
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
.switch {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {display:none;}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(56px);
  -ms-transform: translateX(56px);
  transform: translateX(56px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
