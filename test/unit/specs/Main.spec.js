import { mount } from '@vue/test-utils'
import Main from '@/components/Main.vue'

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

  it('should render hex color', () => {
    const renderStyle = wrapper
      .find('.light-effect')
      .contains('[style="background-color: rgb(25, 77, 51);"]')

    expect(renderStyle).toBe(true)
  })

  it('should update hex color', () => {
    wrapper.setData({
      colors: {
        hex: '#092929'
      }
    })

    const renderStyle = wrapper
      .find('.light-effect')
      .contains('[style="background-color: rgb(9, 41, 41);"]')

    expect(renderStyle).toBe(true)
  })

  it('should trigger light switch', () => {
    expect(wrapper.vm.lightsOn).toBe(false)

    wrapper
      .find('.switch input[type="checkbox"]')
      .trigger('click')

    expect(wrapper.vm.lightsOn).toBe(true)
  })
})
