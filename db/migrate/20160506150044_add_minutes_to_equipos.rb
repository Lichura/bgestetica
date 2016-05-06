class AddMinutesToEquipos < ActiveRecord::Migration
  def change
    add_column :equipos, :minutes, :integer
  end
end
