import { Controller } from "@hotwired/stimulus"


export default class extends Controller {
  static targets = ['notice']

  connect() {
    setTimeout(() => {
      this.noticeTarget.remove()
    }, 5000)
  }

  close() {
    this.noticeTarget.remove()
  }
}
