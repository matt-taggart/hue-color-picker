import { mount } from '@vue/test-utils'
import Main from '@/components/Main.vue'
import dotenv from 'dotenv'

describe('Main.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Main)
  })

  it('should render main component with default prop colors', () => {
    const defaultProps = {
      hex: '#194d33',
      hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
      hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
      rgba: { r: 25, g: 77, b: 51, a: 1 },
      a: 1
    }

    expect(wrapper.vm.colors).toEqual(defaultProps)
  })

  it('should render heading with text', () => {
    expect(wrapper.find('h1').text()).toEqual('Hue Color Picker')
  })

  it('should render connection status of "No Hue Bridge Connection Found"', () => {
    expect(wrapper.find('.connection-bar').text()).toEqual('No Hue Bridge Connection Found')
  })

  it('should render red status bar when not connected', () => {
    expect(wrapper.find('.connection-bar').attributes().style)
      .toBe('background-color: rgb(255, 56, 96);')
  })

  it('should render connection status of "Hue Bridge Connected"', () => {
    wrapper.setData({
      connected: true,
      connectionStatus: 'Hue Bridge Connected'
    })

    expect(wrapper.find('.connection-bar').text()).toEqual('Hue Bridge Connected')
  })

  it('should render green status bar when connected', () => {
    wrapper.setData({
      connected: true,
      connectionStatus: 'Hue Bridge Connected'
    })

    expect(wrapper.find('.connection-bar').attributes().style)
      .toBe('background-color: rgb(0, 209, 178);')
  })

  it('should render white hex color in off state', () => {
    const renderStyle = wrapper
      .find('.light-effect')
      .contains('[style="background-color: rgb(255, 255, 255);"]')

    expect(renderStyle).toBe(true)
  })

  it('should trigger light switch', () => {
    expect(wrapper.vm.lightsOn).toBe(false)

    switchLight()

    expect(wrapper.vm.lightsOn).toBe(true)
  })

  it('should update hex color in on state', () => {
    switchLight()

    wrapper.setData({
      colors: {
        hex: '#092929'
      }
    })

    expect(wrapper.find('.light-effect').attributes().style)
      .toBe('background-color: rgb(9, 41, 41);')
  })

  function switchLight () {
    wrapper
      .find('.switch input[type="checkbox"]')
      .trigger('click')
  }
})
