module AdminConsole
  class ProductsController < AdminController
    before_action :check_button_action, only: %i[create update]
    after_action :remove_variations, only: %i[update]

    FORMATTERS = %i[
      turbo_stream
    ].freeze

    def index
      @products = Product.includes(:sizes).order(id: :desc).page(params[:page])
    end

    def new
      @product = Product.new
    end

    def edit
      @product = product
    end

    def update
      @product = product
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

    def destroy
      @product = Product.find params[:id]
      @product.destroy if @product.present?

      if @product.destroyed?
        redirect_to admin_console_products_path, notice: 'OK'
      else
        redirect_to admin_console_products_path, alert: @product.errors
      end
    end

    def show
      @product = Product.includes(variations: %i[image_attachment sizes]).find params[:id]
      @price_range = @product.sizes.pluck(:price).minmax.uniq
      @images = @product.images
    end

    private

    def product_params
      product_params = params.require(:product).permit(
        :name,
        :detail,
        :featured,
        :category_id,
        variations_attributes: [
          :id,
          :name,
          :image,
          sizes_attributes: %i[size price weight quantity length width height],
        ],
        images: [],
      )

      if product_params[:images].all?(&:blank?)
        product_params.except(:images) 
      else
        product_params
      end
    end

    def product
      @product ||= Product.find params[:id]
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

    def remove_variations
      Variation.where(id: params[:variation_ids]).destroy_all
    end

    def initialize_breadcrumb
      super

      breadcrumb.add(product.name, admin_console_product_path(product)) if params[:id]
      breadcrumb.add('Edit', edit_admin_console_product_path(product)) if action_name == 'edit'
    end
  end
end
