class AddPacienteToEvents < ActiveRecord::Migration
  def change
    add_column :events, :paciente, :string
    add_column :events, :medico, :string
    add_column :events, :equipo, :string
  end
end
