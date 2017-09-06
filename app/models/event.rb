class Event < ActiveRecord::Base

	before_create :set_estado

	def set_estado
		self.estado = 1
	end

	def self.search(term)
		where("text LIKE ? OR paciente LIKE ? OR equipo LIKE ?", "%#{term}","%#{term}","%#{term}")
	end

	def self.today
		where("start_date > ? AND start_date <= ? AND estado = ?", Date.yesterday, (Date.tomorrow + 1.day), "1")
	end
end
