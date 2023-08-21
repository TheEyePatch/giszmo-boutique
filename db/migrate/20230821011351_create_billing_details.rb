class CreateBillingDetails < ActiveRecord::Migration[7.0]
  def change
    create_table :billing_details do |t|
      t.belongs_to :customer
      t.string :email
      t.string :address
      t.integer :contact
      t.string :first_name
      t.string :last_name
      t.timestamps
    end
  end
end
