class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.bigint :product_id
      t.bigint :customer_id
      t.integer :status, null: false, default: 0
      t.integer :quantity, null: false, default: 0
      t.timestamps
    end
  end
end
