class CreateTurnos < ActiveRecord::Migration
  def change
    create_table :turnos do |t|
      t.integer :medico
      t.integer :equipo
      t.datetime :start_date
      t.datetime :end_date

      t.timestamps null: false
    end
  end
end
