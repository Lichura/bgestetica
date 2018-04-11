class CreateEquipos < ActiveRecord::Migration
  def change
    create_table :equipos do |t|
      t.string :nombre
      t.string :descripcion
      t.boolean :activo

      t.timestamps null: false
    end
  end
end
