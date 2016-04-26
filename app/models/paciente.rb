class Paciente < ActiveRecord::Base
	has_many :events
end
