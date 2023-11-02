import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = [
    'priceContainer',
  ]

  connect() {
    console.log('hello admin product')
  }

  setPriceRange(e) {
    this.priceContainerTarget.innerText = e.currentTarget.dataset.priceRange
  }

  selectImageVariant(e) {
    // e.preventDefault()
    if(!e.currentTarget.querySelector('img')) return

    const image = e.currentTarget.querySelector('img').cloneNode(true)
    image.setAttribute('class', 'mx-auto max-h-full')
    const imageContainer = document.getElementById('main-image')

    imageContainer.innerHTML = ''
    imageContainer.appendChild(image)
  }


}
