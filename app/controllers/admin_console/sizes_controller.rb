class AdminConsole::SizesController < AdminController
  def index
    @sizes = Size.where(sizable_id: params[:sizable_id], sizable_type: params[:sizable_type])
  end

  def new
    @size = Size.new
    @sizable_id = params[:sizable_id]
    @sizable_type = params[:sizable_type]
  end

  def create
    hash = { sizable_id: params.dig(:size, :sizable_id), sizable_type: params.dig(:size, :sizable_type) }
    @size = Size.new(size_params.merge(hash))
    if @size.valid? && @size.save
      respond_to do |format|
        format.html do
          redirect_to admin_console_product_variation_path(product, variation), notice: 'Successfully create variation size'
        end
        format.turbo_stream do
          flash.now[:notice] = 'Successfully create variation size'
          render :create, locals: { size: @size }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_console_product_variation_path(product, variation), alert: @size.errors.full_messages
        end
        format.turbo_stream do
          flash.now[:alert] = @size.errors.full_messages
          render :create, locals: { size: nil }
        end
      end
    end
  end

  def edit
    @size = Size.find params[:id]
  end

  def update
    @size = Size.find params[:id]

    if @size.update(size_params)
      respond_to do |format|
        format.html do
          redirect_to admin_console_product_variation_path(product, variation), notice: 'Succesfully update variation size'
        end
        format.turbo_stream do
          flash.now[:notice] = 'Size successfully updated!'
          render :update, locals: { size: @size }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to edit_admin_console_size_path(@size), alert: @size.errors.full_messages
        end
        format.turbo_stream do
          flash[:alert] = @size.errors.full_messages
          render :update, locals: { size: nil }
        end
      end
    end
  end

  def destroy
    size.destroy

    if size.destroyed?
      respond_to do |format|
        format.html do
          redirect_to admin_console_product_variation_path(product, variation), notice: 'Successfully deleted size!'
        end
        format.turbo_stream do
          flash[:notice] = 'Successfully deleted size!'
          render :destroy, locals: { size: size }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to admin_console_product_variation_path(product, variation), alert: size.errors.full_messages
        end
        format.turbo_stream do
          flash[:alert] = size.errors.full_messages
          render :destroy, locals: { size: nil }
        end
      end
    end
  end

  private

  def size_params
    params.require(:size).permit(:size, :price, :quantity, :length, :width, :height)
  end

  def size
    @size ||= Size.find params[:id]
  end

  def variation
    return if size.sizable_type != 'Variation'

    @variation ||= Variation.find size.sizable_id
  end

  def product
    @product ||= variation.product
  end
end
