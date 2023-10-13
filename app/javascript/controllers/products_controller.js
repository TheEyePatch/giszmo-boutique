import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    'colorField',
    'colorPicker',
    'colorGroup',
    'imageGroup',
    'sizesContainer',
    'variationContainer'
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
      const value = e.currentTarget.value
      if (value.length > 0) return
      if(key == 'Backspace') sizeField.remove()
    })
    const container = this.sizesContainerTarget;

    container.appendChild(sizeField)
  }

  removeField(e, sizeField) {
    const key = e.code
    const value = e.currentTarget.value
    if (value.length > 0) return

    if(key == 'Backspace' && sizeField) return sizeField.remove()

    if(key == 'Backspace') return e.currentTarget.remove()
  }

  addVariationField(e){
    e.preventDefault()
    const nameInput = document.createElement('input')
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('name', 'product[variations_attributes][][name]')
    nameInput.setAttribute('placeholder', 'Input name...')
    nameInput.setAttribute('class', 'border-0 border-b-2 border-black w-72 mr-5 text-base h-14')

    const imageInput = document.createElement('input')
    imageInput.setAttribute('type', 'file')
    imageInput.setAttribute('name', 'product[variations_attributes][][image]')
    imageInput.setAttribute('accept', 'image/png, image/jpeg')
    // imageInput.setAttribute('class', 'w-60')

    const div = document.createElement('div')
    div.setAttribute('class', 'm-2 flex items-center justify-around')
    div.appendChild(nameInput)
    div.appendChild(imageInput)

    this.variationContainerTarget.appendChild(div)
  }
}
