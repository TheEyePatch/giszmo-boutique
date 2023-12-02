module AdminConsole
  class AdminsController < ApplicationController
    def index
      @admins = Admin.order(id: :desc).page(params[:page])
    end

    def new
      @admin = Admin.new
    end

    def create
      @admin = Admin.new admin_params

      if @admin.valid? && @admin.save
        respond_to do |format|
          format.html
          format.turbo_stream do
            flash.now[:notice] = 'Successfully created Admin'
            render :create, locals: { admin: @admin }
          end
        end
      else
        respond_to do |format|
          format.html
          format.turbo_stream do
            flash.now[:alert] = @admin.errors.full_messages
            render :create, locals: { admin: nil }
          end
        end
      end
    end

    private

    def admin
      @admin ||= Admin.find params[:id]
    end

    def admin_params
      params.require(:admin).permit(:email, :username, :password, :password_confirmation)
    end
  end
end
