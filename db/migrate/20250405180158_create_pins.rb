class CreatePins < ActiveRecord::Migration[8.0]
  def change
    create_table :pins do |t|
      t.float :latitude
      t.float :longitude
      t.bigint :user_id
      t.string :username

      t.timestamps
    end

    add_index :pins, :user_id
  end
end
