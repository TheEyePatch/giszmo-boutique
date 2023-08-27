import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  // static targets = ['modal']
  connect() {
    // console.log('hello')
  }

  close(e) {
    e.preventDefault();

    const modal = document.getElementById('modal')
    modal.innerHTML = ''
  }
}