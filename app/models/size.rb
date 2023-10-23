class Size < ApplicationRecord
  belongs_to :sizable, polymorphic: true
  validates :size, uniqueness: { scope: :sizable, message: 'should be unique per product' }
end
