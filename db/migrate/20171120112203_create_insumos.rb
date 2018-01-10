class CreateInsumos < ActiveRecord::Migration[5.0]
  def change
    create_table :insumos do |t|
      t.integer :cantidad
      t.decimal :costo
      t.integer :alerta

      t.timestamps
    end
  end
end
