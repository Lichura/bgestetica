# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


turnos = Turno.create([{ medico: 1, equipo: 1, start_date: DateTime.parse("09/05/2016 8:00"), end_date: DateTime.parse("09/05/2016 8:30")},
	{ medico: 1, equipo: 1, start_date: DateTime.parse("09/05/2016 8:30"), end_date:DateTime.parse("09/05/2016 9:00") },
	{ medico: 1, equipo: 1, start_date: DateTime.parse("09/05/2016 9:00"), end_date: DateTime.parse("09/05/2016 9:30")},
	{ medico: 1, equipo: 1, start_date: DateTime.parse("09/05/2016 9:30"), end_date: DateTime.parse("09/05/2016 10:00")},
	{ medico: 1, equipo: 1, start_date: DateTime.parse("09/05/2016 10:00"), end_date: DateTime.parse("09/05/2016 10:30")},
	{ medico: 1, equipo: 1, start_date: DateTime.parse("09/05/2016 10:30"), end_date: DateTime.parse("09/05/2016 11:00")}])