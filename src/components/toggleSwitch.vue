<template lang="pug">
  label.switch
    input(type="checkbox", @click="flipSwitch")
    span.slider.round
</template>

<script>

export default {
  name: 'ToggleSwitch',
  props: {
    colors: {
      type: Object,
      required: true
    },
    applyCorrections: {
      type: Function,
      required: true
    },
    setLightStateAll: {
      type: Function,
      required: true
    },
    turnOffAllLights: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      checked: false
    }
  },
  methods: {
    async flipSwitch () {
      this.checked = !this.checked
      this.$emit('input', this.checked)

      if (this.checked) {
        this.setLightStateAll()
      } else {
        this.turnOffAllLights()
      }
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
