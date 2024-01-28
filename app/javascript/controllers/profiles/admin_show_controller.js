import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets =[
    'profileData',
    'profileForm'
  ]

  connect() {
    console.log('hello profile')
  }

  showForm(e) {
    e.preventDefault()

    this.profileDataTarget.setAttribute('hidden', true)
    this.profileFormTarget.removeAttribute('hidden')
    console.log(this.profileDataTarget)
  }
}
