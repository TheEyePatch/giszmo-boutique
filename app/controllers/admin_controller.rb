class AdminController < ApplicationController
  before_action :authenticate_admin!
  before_action :initialize_breadcrumb

  private

  def initialize_breadcrumb
    breadcrumb.add('Home', admin_console_root_path)
  end

  def breadcrumb
    @breadcrumb ||= View::Breadcrumb.new
  end
end
