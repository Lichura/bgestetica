class Event < ActiveRecord::Base
	belongs_to :recurring
	def self.search(term)
		where("text LIKE ? OR paciente LIKE ? OR equipo LIKE ?", "%#{term}","%#{term}","%#{term}")
	end
end
