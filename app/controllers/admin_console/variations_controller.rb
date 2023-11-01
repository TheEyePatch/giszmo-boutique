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

    def variation_images
      @image = variation.image.attached ? variation.image : nil
    end

    private

    def variation
      @variation ||= product.variations.find(params[:id])
    end

    def product
      @product ||= Product.find params[:product_id]
    end
  end
end
