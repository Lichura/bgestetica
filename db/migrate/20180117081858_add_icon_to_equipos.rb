class AddIconToEquipos < ActiveRecord::Migration[5.0]
  def change
    add_column :equipos, :icon, :string
  end
end
