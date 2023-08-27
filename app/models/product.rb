class Product < ApplicationRecord
  has_many :orders
  has_many :customers, through: :orders
  has_many :comments

  # Validations

  validates :name, uniqueness: true
  validates :price, presence: true
end
