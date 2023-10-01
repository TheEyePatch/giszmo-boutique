module Client
  class HomeController < ApplicationController
    def index
      @featured = Product.includes(images_attachments: :blob).limit(4)
    end
  end
end
