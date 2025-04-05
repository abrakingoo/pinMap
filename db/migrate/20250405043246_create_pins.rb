class CreatePins < ActiveRecord::Migration[8.0]
  def change
    create_table :pins do |t|
      t.float :latitude
      t.float :longitude
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
