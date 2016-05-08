class CreateContactos < ActiveRecord::Migration
  def change
    create_table :contactos do |t|
      t.string :nombre
      t.string :mail
      t.string :telefono
      t.string :texto

      t.timestamps null: false
    end
  end
end
