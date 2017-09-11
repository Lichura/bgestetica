class Event < ActiveRecord::Base

	before_create :set_estado

	def set_estado
		self.estado = 1
	end

	def self.search(term)
		paciente = Paciente.where("nombre LIKE ?", "%#{term}%").ids
		equipo = Equipo.where("nombre LIKE ?", "%#{term}%").ids
		where("text LIKE ? OR paciente IN (?) OR equipo IN (?)", "%#{term}%",paciente,equipo)
	end

	def self.today
		where("start_date > ? AND estado = ?", Date.yesterday, "1")
	end
end
