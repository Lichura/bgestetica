class Turno < ActiveRecord::Base

	def self.search(medico, equipo, start_date)
		start_date = DateTime.parse(start_date)
		end_date = start_date + 50.minutes
		where("(medico = ? OR equipo = ?) AND start_date <= ? AND end_date >= ?", medico, equipo, end_date, start_date)
	end
end

