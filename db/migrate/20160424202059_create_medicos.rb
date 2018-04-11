class CreateMedicos < ActiveRecord::Migration
  def change
    create_table :medicos do |t|
      t.string :nombre
      t.string :apellido
      t.string :telefono
      t.string :mail

      t.timestamps null: false
    end
  end
end
