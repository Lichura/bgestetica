class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.string :nombre
      t.string :descripcion

      t.timestamps null: false
    end
  end
end
