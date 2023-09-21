class HomeController < ApplicationController
  def index
    @products = Product.includes(images_attachments: :blob).all
  end
end
