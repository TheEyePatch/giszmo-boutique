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

  addSizeFields(e) {
    if(e) e.preventDefault();

    const sizeField = this.createSizeField('text', 'size')
    sizeField.setAttribute('required', 'true')
    const priceField = this.createSizeField('number', 'price')

    const mainDetails = document.createElement('div')
    mainDetails.setAttribute('class', 'flex m-1')
    mainDetails.appendChild(sizeField)
    mainDetails.appendChild(priceField)

    const widthField = this.createSizeField('number', 'width')
    const lengthField = this.createSizeField('number', 'length')
    const heightField = this.createSizeField('number', 'height')
  
    const dimensions = document.createElement('div')
    dimensions.setAttribute('class', 'flex m-1')
    dimensions.appendChild(lengthField)
    dimensions.appendChild(widthField)
    dimensions.appendChild(heightField)
    
    const div = document.createElement('div')
    div.setAttribute('class', 'relative border rounded p-2')
    div.appendChild(mainDetails)
    div.appendChild(dimensions)

    const cancelButton = document.createElement('span')
    cancelButton.setAttribute('class', 'absolute -top-4 -right-4 ml-2 p-1 flex items-center justify-center rounded-full text-white bg-gray-300 hover:bg-gray-400 shadow hover:cursor-pointer')
    cancelButton.style.width = '2rem'
    cancelButton.style.height = '2rem'
    cancelButton.innerText = 'x'
    cancelButton.addEventListener('click', (e) => {
      div.remove()
    })

    div.appendChild(cancelButton)
    const container = this.sizesContainerTarget;
    container.appendChild(div)
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
    nameInput.setAttribute('class', 'border-0 border-b-2 border-black mr-5 text-base h-14')

    const imageInput = document.createElement('input')
    imageInput.setAttribute('type', 'file')
    imageInput.setAttribute('name', 'product[variations_attributes][][image]')
    imageInput.setAttribute('accept', 'image/png, image/jpeg')
    imageInput.setAttribute('class', 'variation-image-input')

    const priceInput = document.createElement('input')
    priceInput.setAttribute('type', 'number')
    priceInput.setAttribute('step', 'any')
    priceInput.setAttribute('name', 'product[variations_attributes][][price]')
    priceInput.setAttribute('placeholder', 'Input price...')
    priceInput.setAttribute('class', 'border-0 border-b-2 border-black mr-5 text-base h-14')

    const cancelButton = document.createElement('span')
    cancelButton.setAttribute('class', 'absolute -top-4 -right-4 ml-2 p-1 flex items-center justify-center rounded-full text-white bg-gray-300 hover:bg-gray-400 shadow hover:cursor-pointer')
    cancelButton.style.width = '2rem'
    cancelButton.style.height = '2rem'
    cancelButton.innerText = 'x'
  
    const div = document.createElement('div')
    div.setAttribute('class', 'relative m-2 flex items-center justify-around')
    div.appendChild(nameInput)
    div.appendChild(priceInput)
    div.appendChild(imageInput)
    div.appendChild(cancelButton)
    

    cancelButton.addEventListener('click', (e) => {
      div.remove()
    })

    this.variationContainerTarget.appendChild(div)
  }

  createSizeField(type, name) {
    const input = document.createElement('input')
    input.setAttribute('type', type)
    
    if(['length', 'width', 'height'].includes(name)) {
      input.setAttribute('placeholder', `${name} (cm)`)
    } else {
      input.setAttribute('placeholder', name)
    }

    if(type == 'number') input.setAttribute('step', 'any')

    input.setAttribute('name', `product[sizes_attributes][][${name}]`)
    input.setAttribute('class', 'mx-2 border rounded')

    return input
  }
}
