import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    'variationContainer',
    'sizesContainer',
    'variationIds'
  ]

  connect() {
    this.variationCounter = 0
  }

  addVariationField(e){
    e.preventDefault()
    const nameInput = this.createField('text', 'Input Name here...', 'product[variations_attributes][][name]')
    const imageInput = this.createField('file', '', 'product[variations_attributes][][image]')
    const cancelButton = this.createCancelButton()
    const inputGrp = this.createFieldContainer('border m-1 border-gray-300 rounded p-2 flex items-center justify-around')
    const variationContainer = this.createFieldContainer('relative m-1 bg-gray-100 border-2 border-gray-500 rounded p-2 items-center justify-around')
    const sizeButton = document.createElement('button')

    imageInput.setAttribute('accept', 'image/png, image/jpeg')
    imageInput.setAttribute('class', 'variation-image-input')

    const sizeContainer = this.createFieldContainer('', `sizeContainer${this.variationCounter}`)
    sizeContainer.setAttribute('id', `sizeContainer${this.variationCounter}`)

    sizeButton.innerText = 'Add Size'
    sizeButton.setAttribute('data-action', 'click->variation#addSizeFields')
    sizeButton.setAttribute('data-size-button-index', this.variationCounter)
    sizeButton.setAttribute('class', 'bg-gray-100 p-1 border m-1 rounded hover:shadow')

    inputGrp.appendChild(nameInput)
    inputGrp.appendChild(imageInput)
    variationContainer.appendChild(inputGrp)
    variationContainer.appendChild(sizeContainer)
    variationContainer.appendChild(sizeButton)
    variationContainer.appendChild(cancelButton)
    
    cancelButton.addEventListener('click', (e) => {
      variationContainer.remove()
    })

    this.variationContainerTarget.appendChild(variationContainer)
    this.variationCounter += 1
  }
  
  addSizeFields(e) {
    if(e) e.preventDefault();

    const sizeField = this.createField('text', 'Size', 'product[variations_attributes][][sizes_attributes][][size]')
    sizeField.setAttribute('required', 'true')

    const priceField = this.createField('number', 'Price (Php)', 'product[variations_attributes][][sizes_attributes][][price]')
    const weightField = this.createField('number', 'Weight (Kg)', 'product[variations_attributes][][sizes_attributes][][weight]')
    const quantityField = this.createField('number', 'Quantity', 'product[variations_attributes][][sizes_attributes][][quantity]')
    const mainDetails = this.createFieldContainer('grid grid-cols-2 gap-1 m-1')
    mainDetails.appendChild(sizeField)
    mainDetails.appendChild(priceField)
    mainDetails.appendChild(weightField)
    mainDetails.appendChild(quantityField)

    const widthField = this.createField('number', 'Width (cm)', 'product[variations_attributes][][sizes_attributes][][width]')
    const lengthField = this.createField('number', 'Length (cm)', 'product[variations_attributes][][sizes_attributes][][length]')
    const heightField = this.createField('number', 'Height (cm)', 'product[variations_attributes][][sizes_attributes][][height]')
  
    const dimensions = this.createFieldContainer('flex m-1')
    dimensions.appendChild(lengthField)
    dimensions.appendChild(widthField)
    dimensions.appendChild(heightField)

    const div = this.createFieldContainer('relative border m-1 rounded p-2')
    div.appendChild(mainDetails)
    div.appendChild(dimensions)

    const cancelButton = document.createElement('span')
    cancelButton.setAttribute('class', 'absolute -top-4 -right-4 ml-2 p-1 flex items-center justify-center rounded-full text-white bg-gray-300 hover:bg-gray-400 shadow hover:cursor-pointer')
    cancelButton.style.width = '2rem'
    cancelButton.style.height = '2rem'
    cancelButton.innerText = 'x'
    cancelButton.addEventListener('click', (e) => div.remove())

    div.appendChild(cancelButton)
    const container = document.getElementById(`sizeContainer${e.currentTarget.dataset.sizeButtonIndex}`)
    container.appendChild(div)

    console.log(this.data.get('index'))
  }

  createField(type, placeholder = '', name) {
    const input = document.createElement('input')
    input.setAttribute('type', type)
    
    if(['length', 'width', 'height'].includes(name)) {
      input.setAttribute('placeholder', `${name} (cm)`)
    } else {
      input.setAttribute('placeholder', placeholder)
    }

    if(type == 'number') input.setAttribute('step', 'any')

    input.setAttribute('name', name)
    input.setAttribute('class', 'mx-2 border-0 border-b-2 border-black text-base h-14')

    return input
  }

  removeField(e, sizeField) {
    const key = e.code
    const value = e.currentTarget.value
    if (value.length > 0) return

    if(key == 'Backspace' && sizeField) return sizeField.remove()

    if(key == 'Backspace') return e.currentTarget.remove()
  }

  createCancelButton() {
    const cancelButton = document.createElement('span')
    cancelButton.setAttribute('class', 'absolute -top-4 -right-4 ml-2 p-1 flex items-center justify-center rounded-full text-white bg-gray-300 hover:bg-gray-400 shadow hover:cursor-pointer')
    cancelButton.style.width = '2rem'
    cancelButton.style.height = '2rem'
    cancelButton.innerText = 'x'

    return cancelButton
  }

  createFieldContainer(classList, id = null) {
    const div = document.createElement('div')
    div.setAttribute('class', classList)
    if(id)  div.setAttribute('id', id)

    return div
  }

  batchDelete(e) {
    e.preventDefault()
    const element = e.currentTarget
    const id = element.dataset.id

    if(!element.dataset.removed) {
      let variationIdForm = document.createElement('input')
      variationIdForm.setAttribute('name', 'variation_ids[]')
      variationIdForm.setAttribute('hidden', 'true')
      variationIdForm.setAttribute('id', id)
      variationIdForm.setAttribute('value', id)

      this.variationIdsTarget.appendChild(variationIdForm)
      element.dataset.removed = true
      element.innerText = 'Undo'
    } else {
      let variationIdForm = document.getElementById(id)
      variationIdForm.remove()
      delete element.dataset.removed
      element.innerText = 'Remove'
    }
  }

  // SHOW

  selectVariation(e) {
    this.sizesContainerTarget.innerHTML = ''
    this.sizesContainerTarget.setAttribute('class', 'flex border p-1')
    
    console.log(e.currentTarget.dataset.sizes)
  }
}
