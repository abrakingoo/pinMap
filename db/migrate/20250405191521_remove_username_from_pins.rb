class RemoveUsernameFromPins < ActiveRecord::Migration[6.0]
  def change
    remove_column :pins, :username
  end
end
