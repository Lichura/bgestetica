class Event < ActiveRecord::Base
    enum estado: [:pendiente, :cancelada, :finalizada ]
	before_create :set_estado

	def set_estado
		self.estado = :pendiente
		self.save
	end

	def cancelar_turno
		self.estado = :cancelada
		self.save
	end

	def finalizar_turno
		self.estado = :finalizada
		self.save		
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
