class CreateEventos < ActiveRecord::Migration
  def change
    create_table :eventos do |t|
      t.integer :dni
      t.string :nombre
      t.string :apellido
      t.string :email
      t.datetime :start_date
      t.datetime :end_date
      t.string :equipo
      t.string :medico
      t.string :event_id

      t.timestamps null: false
    end
  end
end
