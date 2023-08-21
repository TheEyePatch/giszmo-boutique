class Product < ApplicationRecord
  has_many :orders
  has_many :customers, through: :orders
  has_many :comments
end
