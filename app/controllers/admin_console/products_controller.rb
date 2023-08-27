module AdminConsole
  class ProductsController < AdminController
    def index
      # binding.pry
      @products = Product.all
    end

    def new
      @product = Product.new
    end

    def create
      @product = Product.new(product_params)
      if @product.valid? && @product.save
        respond_to do |format|
          messages = ['Successfully created product']
          response_formatter(format, :turbo_stream, :notice, messages, :create, { product: @product })
        end
      else
        respond_to do |format|
          messages = @product.errors.full_messages
          response_formatter(format, :turbo_stream, :alert, messages, :create, { product: nil })
        end
      end
    end

    def show; end

    private

    def product_params
      params.require(:product).permit(:name, :description, :price)
    end

    def response_formatter(format, format_method, type, messages, method, locals)
      format.send(format_method) do
        if [:turbo_stream].include?(format_method)
          flash.now[type] = messages
        else
          flash[type] = messages
        end

        render method, locals: locals.merge({ flash: flash })
      end
    end
  end
end
