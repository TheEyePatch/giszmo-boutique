class Product < ApplicationRecord
  has_many :orders
  has_many :customers, through: :orders
  has_many :comments
  has_many :variations
  has_rich_text :detail
  has_many_attached :images
  belongs_to :category

  paginates_per 15

  # Validations

  validates :name, presence: true, uniqueness: true
  validates :price, presence: true
  validates :detail, presence: true
end
