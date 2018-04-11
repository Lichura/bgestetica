class AddProfileToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :profile, :integer, default: 3
  end
end
