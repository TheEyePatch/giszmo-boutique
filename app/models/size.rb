class Size < ApplicationRecord
  belongs_to :sizable, polymorphic: true
  validates :size, presence: true
  validates :price, presence: true
  validates :size, uniqueness: { scope: :sizable, message: 'should be unique per product' }
end
