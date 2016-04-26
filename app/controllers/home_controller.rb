class HomeController < ApplicationController
  before_filter :login_required, :except => :index
  def index
  end
  def schedule
	@equipos_todos = Equipo.all
	@medicos = Medico.all
	@paciente = Paciente.new
  end
  def equipos_todos

  end
  
  def data
   events = Event.all
   render :json => events.map {|event| {
              :id => event.id,
              :start_date => event.start_date.to_formatted_s(:db),
              :end_date => event.end_date.to_formatted_s(:db),
              :text => event.text,
              :paciente => event.paciente,
              :medico => event.medico,
              :equipo => event.equipo,
              :color => event.color
          }}
    end

	 def db_action
	   mode = params["!nativeeditor_status"]
	   id = params["id"]
	   paciente = params["paciente"]
	   equipo = params["equipo"]
	   medico = params["medico"]
	   start_date = params["start_date"]
	   end_date = params["end_date"]
	   text = params["text"]
	   color = params["color"]

	   case mode
	     when "inserted"
	       event = Event.create :start_date => start_date, :end_date => end_date, :text => text, :medico => medico, :paciente => paciente, :color => Equipo.find(1).color, :equipo => equipo
	       tid = event.id

	     when "deleted"
	       Event.find(id).destroy
	       tid = id

	     when "updated"
	       event = Event.find(id)
	       event.start_date = start_date
	       event.end_date = end_date
	       event.text = text
	       event.paciente = paciente
	       event.medico = medico
	       event.equipo = equipo
	       event.color = @equipos_todos[1].color
	       event.save
	       tid = id
	   end

	   render :json => {
	              :type => mode,
	              :sid => id,
	              :tid => tid,
	          }
	 end
end
