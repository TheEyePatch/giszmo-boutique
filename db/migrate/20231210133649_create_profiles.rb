class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.belongs_to :profilable, polymorphic: true
      t.string :first_name
      t.string :last_name
      t.integer :age

      t.timestamps
    end
  end
end
