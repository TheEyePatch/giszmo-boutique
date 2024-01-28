class Profile < ApplicationRecord
  belongs_to :profilable, polymorphic: true
  has_one_attached :photo
end
