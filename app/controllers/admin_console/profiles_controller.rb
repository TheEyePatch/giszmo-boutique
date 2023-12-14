module AdminConsole
  class ProfilesController < AdminController
    def show; end

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
  end
end