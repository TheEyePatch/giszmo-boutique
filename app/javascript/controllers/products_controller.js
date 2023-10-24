import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    'colorField',
    'colorPicker',
    'colorGroup',
    'imageGroup',
  ]

  connect() {
    // console.log(this.sizesContainerTarget)
  }

  selectColor() {
    const colorField = this.colorFieldTarget

    if(!colorField.value) {
      colorField.value = this.colorPickerTarget.value
    } else {
      let stringArray = colorField.value.split(', ')
      stringArray.push(this.colorPickerTarget.value)

      colorField.value = stringArray.join(', ')
    }
  }

  selectVariantType(e) {
    const button  = e.currentTarget
    const variant = button.value
    switch (variant) {
      case 'color':
        this.colorGroupTarget.removeAttribute('hidden')
        this.imageGroupTarget.setAttribute('hidden', true)
        break;
      case 'image':
        console.log(this.imageGroupTarget)
        this.colorGroupTarget.setAttribute('hidden', true)
        this.imageGroupTarget.removeAttribute('hidden')
        break;
    }
  }
}
