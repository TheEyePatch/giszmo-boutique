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
  }

  preview(e) {
    const input = this.inputTarget
    const preview = this.previewContainerTarget
    const files = input.files

    if(files.length == 0 ) return

    preview.innerHTML = ''
    preview.classList.add('border')

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
    // image.setAttribute('width', 150)
    image.setAttribute('class', 'border')

    preview.appendChild(image)
  }

  // For carousels on show page

  selectImage(e) {
    const preview = this.previewContainerTarget
    preview.innerHTML = ''
    
    let image = document.createElement('img')
    image.setAttribute('src', e.currentTarget.src)
    image.setAttribute('class', 'border mx-auto h-54 max-h-full')
    preview.appendChild(image)
  }

  selectRightArrow() {
    this.imageListTarget.scrollBy({left: this.imageListTarget.firstElementChild.clientWidth})
  }

  selectLeftArrow() {
    this.imageListTarget.scrollBy({left: -this.imageListTarget.firstElementChild.clientWidth})
  }
}
