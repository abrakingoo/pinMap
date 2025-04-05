class AddDetailsToPins < ActiveRecord::Migration[8.0]
  def change
    add_column :pins, :lat, :string
    add_column :pins, :lng, :string
    add_column :pins, :username, :string
  end
end
