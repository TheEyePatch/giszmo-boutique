class Customer < ApplicationRecord
  has_many :orders, foreign_key: 'customer_id'
  has_many :products, through: :orders
  has_one :billing_detail
  has_many :comments, foreign_key: 'user_id'
end
