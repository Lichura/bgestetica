class Event < ActiveRecord::Base

	def self.search(term)
		where("text LIKE ?", "%#{term}")
	end
end
