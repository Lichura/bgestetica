class Paciente < ActiveRecord::Base
	has_many :historia_clinicas
end
