class Variation < ApplicationRecord
  belongs_to :product
  has_one_attached :image, dependent: :destroy
end
