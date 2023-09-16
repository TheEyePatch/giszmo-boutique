import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="previews"
export default class extends Controller {
  static targets = [
    'input',
    'previewContainer',
    'imageList'
  ]

  connect() {
    // console.log(this.previewContainerTarget)
    // console.log(this.imageListTarget)
    this.counter = 1
    // console.log(this.imageListTarget.firstElementChild)
    // console.log(this.imageListTarget.firstElementChild.clientWidth)
    // console.log(this.imageListTarget)
  }

  preview(e) {
    const input = this.inputTarget
    const preview = this.previewContainerTarget
    const files = input.files

    if(files.length == 0 ) return

    preview.innerHTML = ''
    preview.classList.add('border')
    preview.classList.add('border-black')

    for (const file of files) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.addImagePreview(reader)
      } 
    }
  }

  addImagePreview(reader) {
    const preview = this.previewContainerTarget
    let image = document.createElement('img')
    image.setAttribute('src', reader.result)
    image.setAttribute('width', 150)
    image.setAttribute('class', 'border')

    preview.appendChild(image)
  }

  // For carousels on show page

  selectImage(e) {
    const preview = this.previewContainerTarget
    preview.innerHTML = ''
    
    let image = document.createElement('img')
    image.setAttribute('src', e.currentTarget.src)
    image.setAttribute('class', 'mx-auto')
    preview.appendChild(image)
  }

  selectRightArrow() {
    // const preview = this.previewContainerTarget
    // this.imageListTarget.style.transform = `translateX( ${ - this.imageListTarget.firstElementChild.clientWidth * this.counter}px)`
    // this.counter++
    this.imageListTarget.scrollBy({left: this.imageListTarget.firstElementChild.clientWidth})
  }

  selectLeftArrow() {
    this.imageListTarget.scrollBy({left: -this.imageListTarget.firstElementChild.clientWidth})
  }
}
