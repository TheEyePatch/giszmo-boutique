class Admin < User
  paginates_per 10

  has_one :profile, as: :profilable
  accepts_nested_attributes_for :profile, allow_destroy: true
end
