module AdminConsole
  class VariationsController < AdminController
    def show
      @variation = variation
    end

    def edit
      @varition = variation
    end

    def destroy
      return if variation.blank?

      variation.destroy

      if variation.destroyed?
        redirect_to edit_admin_console_product_path(variation.product_id), notice: 'Variation deleted!'
      else
        redirect_to edit_admin_console_product_path(variation.product_id), alert: 'Fail to delete variation!'
      end
    end

    private

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
