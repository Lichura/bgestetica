class RemoveColumnsFromEvents < ActiveRecord::Migration[5.0]
  def self.up
  remove_column :events, :medico
  remove_column :events, :equipo
  remove_column :events, :paciente
end
end
