class CreatePacientes < ActiveRecord::Migration
  def change
    create_table :pacientes do |t|
      t.string :nombre
      t.string :apellido
      t.string :email
      t.datetime :fecha_nacimiento
      t.string :telefono
      t.integer :dni
      t.string :direccion

      t.timestamps null: false
    end
  end
end
