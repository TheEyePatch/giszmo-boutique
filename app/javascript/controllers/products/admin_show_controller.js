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
}
