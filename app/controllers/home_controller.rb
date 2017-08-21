class HomeController < ApplicationController
  before_filter :login_required, :except => :index
  def index
  	@contactos = Contacto.all
  end

  def nuevo_contacto
 	
  	@contacto = Contacto.new(contacto_params)
  		if @contacto.save
  			redirect_to root_url,
  			contacto_error: "Muchas gracias por contactarte con BG Estetica. Nos pondremos en contacto contigo a la brevedad."
  		else
  			redirect_to root_url,
  			contacto_error: "Hubo un problema con tu solicitud, por favor intenta nuevamente"
  		end
  end
  def buscar_turnos
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

  	 #@events = Event.all.to_json
  	
  	 #puts(@events)

  	#@events = [{id:1,start_date:"2017-08-14 01:50:00",end_date:"2017-08-14 01:55:00",text:"prueba"},{id:2,start_date:"2017-08-15 02:20:00",end_date:"2017-08-15 02:25:00",text:"otro"},{id:3,start_date:"2017-08-16 03:30:00",end_date:"2017-08-16 03:35:00",text:"hoa"},{id:4,start_date:"2017-08-16 02:20:00",end_date:"2017-08-16 04:25:00",text:"prueba"},{id:5,start_date:"2017-08-16 01:20:00",end_date:"2017-08-16 01:25:00",text:"prueba"},{id:6,start_date:"2017-08-16 01:20:00",end_date:"2017-08-16 01:25:00",text:"fdsa"}]
  end


  def equipos_todos

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
	   #color = Equipo.where(id: equipo).pluck(:color).to_s[2,8]
	   paciente_nombre = Paciente.where(id: paciente).pluck(:nombre)
	   paciente_apellido = Paciente.where(id: paciente).pluck(:apellido)
	   paciente_mail = Paciente.where(id: paciente).pluck(:email)
	   paciente_dni = Paciente.where(id: paciente).pluck(:dni)
	   equipo_nombre = Equipo.where(id: equipo).pluck(:nombre)
	   medico_nombre = Medico.where(id: medico).pluck(:nombre, :apellido)
	   #color = Equipo.where(id: equipo).pluck(:color).to_s.slice(2,8)


	   case mode
	     when "inserted"
	       event = Event.create :start_date => start_date, :end_date => end_date, :text => text, :medico => "medico1", :paciente => "paciente1", :equipo => "euqipo1"
	       tid = event.id
	       evento = Evento.create :event_id => tid, :equipo => equipo_nombre, :medico => medico_nombre, :nombre => paciente_nombre, :apellido => paciente_apellido, :dni => paciente_dni, :email => paciente_mail, :start_date => start_date, :end_date => end_date
	       buscar_turno = Turno.where("(medico = ? OR equipo = ?) AND start_date <= ? AND end_date >= ?", medico, equipo, end_date, start_date)
	       buscar_turno.delete_all

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

	 def data
		   events.map {|event| {
		              :id => event.id,
		              :start_date => event.start_date.to_formatted_s(:db),
		              :end_date => event.end_date.to_formatted_s(:db),
		              :text => event.text
		          }}

	end

	 private
	 def contacto_params
	 	params.require(:contacto).permit(:nombre, :mail, :telefono, :texto)
	 end
end
