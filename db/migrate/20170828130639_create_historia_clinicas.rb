class CreateHistoriaClinicas < ActiveRecord::Migration[5.0]
  def change
    create_table :historia_clinicas do |t|
      t.integer :paciente_id
      t.string :text

      t.timestamps
    end
  end
end
