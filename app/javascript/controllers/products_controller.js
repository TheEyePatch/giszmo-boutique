import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    'colorField',
    'colorPicker',
    'colorGroup',
    'imageGroup',
    'sizesContainer'
  ]

  connect() {
    // console.log('hello products')
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

  addSize(e) {
    e.preventDefault();

    const sizeField = document.createElement('input')
    sizeField.setAttribute('type', 'text')
    sizeField.setAttribute('name', 'product[sizes][]')
    sizeField.setAttribute('class', 'm-1 w-1/3 border-gray-700 border-0 border-b-2 bg-gray-50')
    sizeField.setAttribute('required', 'true')
    sizeField.addEventListener('keydown', (e) => {
      const key = e.code
      if(key == 'Backspace') sizeField.remove()
    })
    const container = this.sizesContainerTarget;

    container.appendChild(sizeField)
  }

  removeField(e) {
    console.log(e)
  }
}
