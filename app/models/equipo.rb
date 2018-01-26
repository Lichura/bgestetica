class Equipo < ActiveRecord::Base
	has_many :insumos, through: :equipo_insumos
	has_many :equipo_insumos

def nombre_con_apellido
    nombre
  end




end
