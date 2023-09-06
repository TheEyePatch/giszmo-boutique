module AdminConsole
  class ProductsController < AdminController
    FORMATTERS = %i[
      turbo_stream
    ].freeze

    def index
      @products = Product.order(id: :desc).page(params[:page])
    end

    def new
      @product = Product.new
    end

    def create
      @product = Product.new(product_params)
      if @product.valid? && @product.save
        messages = ['Successfully created product']
        respond_to do |format|
          response_formatter(format, :notice, messages, :create, { product: @product })
        end
      else
        messages = @product.errors.full_messages
        respond_to do |format|
          response_formatter(format, :alert, messages, :create, { product: nil })
        end
      end
    end

    def show
      @product = Product.find params[:id]
    end

    private

    def product_params
      params.require(:product).permit(:name, :price, :detail, images: [])
    end

    def response_formatter(format, type, messages, method, locals)
      FORMATTERS.each do |format_method|
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
end
