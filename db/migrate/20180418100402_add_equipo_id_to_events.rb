class AddEquipoIdToEvents < ActiveRecord::Migration[5.0]
  def change
  	add_reference :events, :equipo, index: true
  	add_reference :events, :medico, index: true
  	add_reference :events, :user, index: true
  end
end
