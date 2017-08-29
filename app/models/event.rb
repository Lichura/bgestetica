class Event < ActiveRecord::Base
	
	def self.search(term)
		where("text LIKE ? OR paciente LIKE ? OR equipo LIKE ?", "%#{term}","%#{term}","%#{term}")
	end
end
