class Insumo < ApplicationRecord
	has_many :equipos, through: :equipo_insumos
	has_many :equipo_insumos
end
