module AdminConsole
  class VariationsController < AdminController
    def index; end

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
      @variation ||= Variation.find(params[:id])
    end
  end
end
