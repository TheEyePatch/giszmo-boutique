class Size < ApplicationRecord
  belongs_to :product
  validates :size, uniqueness: { scope: :product, message: 'should be unique per product' }
end
