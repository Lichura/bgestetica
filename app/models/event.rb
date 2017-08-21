class Event < ActiveRecord::Base

<<<<<<< HEAD

	def self.search(term)
		where("text LIKE ? OR paciente LIKE ? OR equipo LIKE ?", "%#{term}","%#{term}","%#{term}")
=======
	def self.search(term)
		where("text LIKE ?", "%#{term}")
>>>>>>> b8d9f9c017f2018641dfe59f266162fb4425f69f
	end
end
