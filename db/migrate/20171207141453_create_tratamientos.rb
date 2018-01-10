class CreateTratamientos < ActiveRecord::Migration[5.0]
  def change
    create_table :tratamientos do |t|
      t.string :nombre
      t.string :instrucciones
      t.integer :sesiones

      t.timestamps
    end
  end
end
