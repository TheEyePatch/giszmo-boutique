class Product < ApplicationRecord
  has_many :orders
  has_many :customers, through: :orders
  has_many :comments
  has_rich_text :detail
  has_many_attached :images
  has_many_attached :image_variants

  paginates_per 15

  # Validations

  validates :name, presence: true, uniqueness: true
  validates :price, presence: true
  validates :detail, presence: true
end
