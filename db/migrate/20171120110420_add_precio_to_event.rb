class AddPrecioToEvent < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :precio, :decimal
  end
end
