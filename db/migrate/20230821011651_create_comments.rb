class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.bigint :product_id
      t.bigint :user_id
      t.json :comment
      t.timestamps
    end

    add_index :comments, %i[product_id user_id]
  end
end
