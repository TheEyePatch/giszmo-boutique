module AdminConsole
  class ProfilesController < AdminController
    def show
      @profile = current_admin.profile
    end

    def edit
      profile = Profile.new(profilable: current_admin, first_name: '', last_name: '')
      current_admin.profile = profile if current_admin.profile.blank?
    end

    def update
      current_admin.update(profile_params)
    end

    private

    def profile_params
      params.require(:admin).permit(
        :username,
        :email,
        profile_attributes: %i[
          id
          photo
          first_name
          last_name
          age
        ]
      )
    end

    def initialize_breadcrumb
      super

      breadcrumb.add('Profile', admin_console_profile_path(params[:id])) if params[:id]
      breadcrumb.add('Edit', edit_admin_console_profile_path(params[:id])) if action_name == 'edit'
    end
  end
end