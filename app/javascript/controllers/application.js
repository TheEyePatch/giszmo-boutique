import { Application, defaultSchema } from "@hotwired/stimulus"

const customSchema = {
    ...defaultSchema,
    keyMappings: {
      ...defaultSchema.keyMappings,
    }
}
const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }
