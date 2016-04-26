class Event < ActiveRecord::Base
	belongs_to :medico
	belongs_to :paciente
	belongs_to :equipo
end
