class AddColorToEquipo < ActiveRecord::Migration
  def change
    add_column :equipos, :color, :string
  end
end
