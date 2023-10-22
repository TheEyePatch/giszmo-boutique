class Product < ApplicationRecord
  has_many :orders
  has_many :customers, through: :orders
  has_many :comments, dependent: :destroy
  has_many :variations, dependent: :destroy
  has_rich_text :detail
  has_many_attached :images, dependent: :destroy
  belongs_to :category
  has_many :sizes, dependent: :destroy

  paginates_per 15

  accepts_nested_attributes_for :variations
  accepts_nested_attributes_for :sizes
  # Validations

  validates :name, presence: true, uniqueness: true
  validates :price, presence: true
  validates :detail, presence: true
end
