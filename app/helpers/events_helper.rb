module EventsHelper

	def fecha_y_hora(date)
		string_to_date = DateTime.parse(date)
		return string_to_date.strftime("%d %B a las %I:%M %p")
	end

end
