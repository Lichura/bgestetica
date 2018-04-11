class CreateEquipoInsumos < ActiveRecord::Migration[5.0]
  def change
    create_table :equipo_insumos do |t|
      t.integer :equipo_id
      t.integer :insumo_id
      t.float :quantity

      t.timestamps
    end
  end
end
