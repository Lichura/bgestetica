class UsuariosYPerfiles < ActiveRecord::Migration
  def change

  	     add_column :users, :profile_id, :integer
  	     remove_column :users, :profile, :string
  end
end
