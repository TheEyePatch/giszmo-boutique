class Product < ApplicationRecord
  has_many :orders
  has_many :customers, through: :orders
  has_many :comments, dependent: :destroy
  has_many :variations, dependent: :destroy
  has_many :sizes, through: :variations
  has_rich_text :detail
  has_many_attached :images, dependent: :destroy
  belongs_to :category

  paginates_per 15

  accepts_nested_attributes_for :variations
  # Validations

  validates :name, presence: true, uniqueness: true
  validates :detail, presence: true
end
