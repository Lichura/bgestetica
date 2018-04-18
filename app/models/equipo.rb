class Equipo < ActiveRecord::Base
	has_many :insumos, through: :equipo_insumos
	has_many :equipo_insumos
	has_many :events

def nombre_con_apellido
    nombre
  end


  def destroy
    raise "No se puede eliminar un equipo con turnos asociados" unless events.count == 0
    # ... ok, go ahead and destroy
    super
  end



end
