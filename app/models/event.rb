class Event < ActiveRecord::Base

	
	def self.search(term)
		where("text LIKE ? OR paciente LIKE ? OR equipo LIKE ?", "%#{term}","%#{term}","%#{term}")
	end

	def self.today
		where("start_date > ? AND start_date <= ?", Date.yesterday, (Date.tomorrow + 1.day))
	end
end
