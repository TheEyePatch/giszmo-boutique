class AdminConsole::SizesController < AdminController
  def index
    @sizes = Size.where(sizable_id: params[:sizable_id], sizable_type: params[:sizable_type])
  end
end
