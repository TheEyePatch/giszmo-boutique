class CreateVariations < ActiveRecord::Migration[7.0]
  def change
    create_table :variations do |t|
      t.belongs_to :product
      t.string :name
      t.decimal :price, precision: 10, scale: 2
      t.timestamps
    end
  end
end
