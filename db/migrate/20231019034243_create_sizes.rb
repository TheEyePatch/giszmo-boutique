class CreateSizes < ActiveRecord::Migration[7.0]
  def change
    create_table :sizes do |t|
      t.references :sizable, polymorphic: true
      t.string :size, null: false
      t.integer :quantity, precision: 10, scale: 2
      t.decimal :weight, precision: 10, scale: 2
      t.decimal :price, precision: 10, scale: 2
      t.decimal :width, precision: 10, scale: 2
      t.decimal :length, precision: 10, scale: 2
      t.decimal :height, precision: 10, scale: 2
      t.timestamps
    end
  end
end
