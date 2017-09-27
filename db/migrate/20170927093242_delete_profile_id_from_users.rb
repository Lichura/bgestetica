class DeleteProfileIdFromUsers < ActiveRecord::Migration[5.0]
  def change
  	remove_column :users, :profile_id
  end
end
