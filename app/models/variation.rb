class Variation < ApplicationRecord
  belongs_to :product
  has_many :sizes, as: :sizable, dependent: :destroy
  has_one_attached :image, dependent: :destroy

  accepts_nested_attributes_for :sizes, allow_destroy: true
end
