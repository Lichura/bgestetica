class HomeController < ApplicationController
  before_filter :login_required, :except => :index
  def index

  end
  def buscar_turno
  	  	@eventos = Evento.all
	  if params[:search]
	    @eventos = Evento.search(params[:search]).order('start_date DESC')
	  else
	    @eventos = Evento.all.order('created_at DESC')
	  end
  end
  def schedule
	@equipos_todos = Equipo.all
	@medicos = Medico.all
	@pacientes = Paciente.all
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
              :color => Equipo.where(id: event.equipo).pluck(:color).to_s.slice(2,8)
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
	   color = Equipo.where(id: equipo).pluck(:color).to_s[2,8]
	   paciente_nombre = Paciente.where(id: paciente).pluck(:nombre)
	   paciente_apellido = Paciente.where(id: paciente).pluck(:apellido)
	   paciente_mail = Paciente.where(id: paciente).pluck(:email)
	   paciente_dni = Paciente.where(id: paciente).pluck(:dni)
	   equipo_nombre = Equipo.where(id: equipo).pluck(:nombre)
	   medico_nombre = Medico.where(id: medico).pluck(:nombre, :apellido)
	   #color = Equipo.where(id: equipo).pluck(:color).to_s.slice(2,8)


	   case mode
	     when "inserted"
	       event = Event.create :start_date => start_date, :end_date => end_date, :text => text, :medico => medico, :paciente => paciente, :equipo => equipo
	       tid = event.id
	       evento = Evento.create :event_id => tid, :equipo => equipo_nombre, :medico => medico_nombre, :nombre => paciente_nombre, :apellido => paciente_apellido, :dni => paciente_dni, :email => paciente_mail, :start_date => start_date, :end_date => end_date


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
	       #event.color = color
	       event.save
	       tid = id
	   end

	   render :json => {
	              :type => mode,
	              :sid => id,
	              :tid => tid,
	          }
	 end

	 private
end
