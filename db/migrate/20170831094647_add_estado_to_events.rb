class AddEstadoToEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :estado, :integer
  end
end
