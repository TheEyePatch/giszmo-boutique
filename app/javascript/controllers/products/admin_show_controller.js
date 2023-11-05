import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = [
    'priceContainer',
    'quantityContainer'
  ]

  connect() {
  }

  setPriceRange(e) {
    this.priceContainerTarget.innerText = e.currentTarget.dataset.priceRange
  }

  selectImageVariant(e) {
    // e.preventDefault()
    const target = e.currentTarget.children[0]
    const prevActive = document.querySelector('.active-variant')
    if(prevActive) prevActive.classList.remove('active-variant')

    target.classList.add('active-variant')

    if(!target.querySelector('img')) return
    const image = e.currentTarget.querySelector('img').cloneNode(true)
    image.setAttribute('class', 'mx-auto max-h-full')
    const imageContainer = document.getElementById('main-image')

    imageContainer.innerHTML = ''
    imageContainer.appendChild(image)
  }

  selectSize(e) {
    const target = e.currentTarget
    let prevActive = document.querySelector('.active-size')
    if(prevActive) prevActive.classList.remove('active-size')

    target.classList.add('active-size')

    this.setPriceRange(e)
    const quantity = target.dataset.quantity
    this.quantityContainerTarget.innerHTML = ''
    this.quantityContainerTarget.innerText = quantity
  }
}
