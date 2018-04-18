class Medico < ActiveRecord::Base


has_many :events



  def destroy
    raise "No se puede eliminar un medico con turnos asociados" unless events.count == 0
    # ... ok, go ahead and destroy
    super
  end
end
