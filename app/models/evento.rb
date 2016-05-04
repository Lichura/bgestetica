class Evento < ActiveRecord::Base

	def self.search(search)
		  where("nombre LIKE ? or apellido LIKE ? or dni LIKE ? or email LIKE ?", "%#{search}%", "%#{search}%", "%#{search}%", "%#{search}%") 
	end

end
