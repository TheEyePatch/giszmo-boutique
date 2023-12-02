module AdminConsole
  class AdminsController < ApplicationController
    def index
      @admins = Admin.order(id: :desc).page(params[:page])
    end

    def new
      @admin = Admin.new
    end

    def edit
      @admin = admin
    end

    def update
      @admin = admin

      if admin.update admin_params.except(:password, :password_confirmation)
        respond_to do |format|
          format.html
          format.turbo_stream do
            flash.now[:notice] = 'Successfully update Admin'
            render __method__, locals: { admin: @admin }
          end
        end
      else
        respond_to do |format|
          flash.now[:alert] = @admin.errors.full_messages
          render __method__, locals: { admin: nil }
        end
      end
    end

    def create
      @admin = Admin.new admin_params

      if @admin.valid? && @admin.save
        respond_to do |format|
          format.html
          format.turbo_stream do
            flash.now[:notice] = 'Successfully created Admin'
            render __method__, locals: { admin: @admin }
          end
        end
      else
        respond_to do |format|
          format.html
          format.turbo_stream do
            flash.now[:alert] = @admin.errors.full_messages
            render __method__, locals: { admin: nil }
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
