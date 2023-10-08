module AdminConsole
  class ProductsController < AdminController
    before_action :check_button_action, only: %i[create update]

    FORMATTERS = %i[
      turbo_stream
    ].freeze

    def index
      @products = Product.order(id: :desc).page(params[:page])
    end

    def new
      @product = Product.new
    end

    def edit
      @product = Product.find params[:id]
    end

    def update
      @product = Product.find params[:id]
      if @product.update(product_params)
        redirect_to admin_console_product_path(@product), notice: 'OK'
      else
        redirect_to edit_admin_console_product_path(@product), alert: @product.errors
      end
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
      product_params = params.require(:product).permit(
        :name,
        :price,
        :detail,
        :quantity,
        :category_id,
        variants: [],
        sizes: [],
        images: [],
      )

      if product_params[:images].all?(&:blank?)
        product_params.except(:images) 
      else
        product_params
      end
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

    def check_button_action
      redirect_to request.path if params[:cancel]
    end
  end
end
