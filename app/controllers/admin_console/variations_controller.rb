module AdminConsole
  class VariationsController < AdminController
    def show
      @variation = variation
    end

    def edit
      @varition = variation
    end

    def update
      @variation = variation

      if variation.update(variation_params)
        respond_to do |format|
          format.html { redirect_to admin_console_product_variation_path(variation.product_id), notice: 'Variation updated!' }
          format.turbo_stream do
            flash.now[:notice] = 'Variation updated!'
            render :update, locals: { variation: @variation }
          end
        end
      else
        respond_to do |format|
          format.html { redirect_to redirect_to admin_console_product_variation_path(variation.product_id), alert: variation.errors.full_messages }
          format.turbo_stream do
            flash.now[:alert] = variation.errors.full_messages
            render :update, locals: { variation: nil }
          end
        end
      end
    end

    def destroy
      return if variation.blank?

      variation.destroy

      if variation.destroyed?
        redirect_to admin_console_product_path(variation.product_id), notice: 'Variation deleted!'
      else
        redirect_to admin_console_product_variation_path(variation.product_id), alert: 'Fail to delete variation!'
      end
    end

    private
    
    def variation_params
      params.require(:variation).permit(:name, :image)
    end

    def variation
      @variation ||= product.variations.find(params[:id])
    end

    def product
      @product ||= Product.find params[:product_id]
    end

    def initialize_breadcrumb
      super
      breadcrumb.add(product.name, admin_console_product_path(product))
      breadcrumb.add(variation.name, admin_console_product_variation_path(product, variation)) if params[:id]
      breadcrumb.add('Edit', edit_admin_console_product_variation_path(product, variation)) if action_name == 'edit'
    end
  end
end
