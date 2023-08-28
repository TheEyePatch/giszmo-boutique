import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="previews"
export default class extends Controller {
  static targets = ['input', 'previewContainer']
  connect() {
    console.log(this.previewContainerTarget)
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
}
