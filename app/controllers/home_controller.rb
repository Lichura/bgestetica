class HomeController < ApplicationController
  before_filter :login_required, :except => :index
  before_filter :admin_required, :only => [:schedule]
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
  	  #	@eventos = Events
	  #if params[:search]
	  #  @eventos = Evento.search(params[:search]).order('start_date DESC').flatten
	  #else
	  #  @eventos = Events.all.order('created_at DESC').flatten
	  #end
	  @eventos = Event.all
  end


  def schedule
	@equipos_todos = Equipo.all
	@medicos = User.where("profile_id in (1,2)")
	@pacientes = User.where("profile_id = 3")
	@user = User.new
	@profiles = Profile.all
  end


  def equipos_todos

  end

  
  def data
  	if params[:search]
  		events = Event.search(params[:search]).all
  	else
   		events = Event.all
	end

      render :json => events.map {|event| {
              :id => event.id,
              :start_date => event.start_date.to_formatted_s(:db),
              :end_date => event.end_date.to_formatted_s(:db),
              :text => event.text
              # :paciente => event.paciente,
              # :medico => event.medico,
              # :equipo => event.equipo,
              # :color => Equipo.where(id: event.equipo).pluck(:color).to_s.slice(2,8),
              # :rec_type => event.rec_type,
              # :event_length => event.event_length,
              # :event_pid => event.event_pid
          }}
 	end

  #render :json => events.map {|event| {
  #           :id => event.id,
  #            :start_date => event.start_date.to_formatted_s(:db),
  #            :end_date => event.end_date.to_formatted_s(:db),
  #            :text => event.text,
  #            :paciente => event.paciente,
  #            :medico => event.medico,
  #            :equipo => event.equipo,
  #            :color => Equipo.where(id: event.equipo).pluck(:color).to_s.slice(2,8),
  #            :rec_type => event.rec_type,
  #            :event_length => event.event_length,
  #           :event_pid => event.event_pid
  #        }}
  # end

	def db_action
	   mode = params["!nativeeditor_status"]
	   id = params["id"]
	   paciente = params["paciente"]
	   equipo = params["equipo"]
	   medico = params["medico"]
	   start_date = params["start_date"]
	   end_date = params["end_date"]
	   text = params["text"]
	   rec_type = params["rec_type"]
	   event_length = params["event_length"]
	   event_pid = params["event_pid"]
	   color = Equipo.where(id: equipo).pluck(:color).to_s[2,8]
	   #@paciente = User.find(paciente)
	   #@medico = User.find(medico)
	   #paciente_nombre = Paciente.where(id: paciente).pluck(:nombre).first
	   #paciente_apellido = Paciente.where(id: paciente).pluck(:apellido).first
	   #paciente_mail = Paciente.where(id: paciente).pluck(:email).first
	   #paciente_dni = Paciente.where(id: paciente).pluck(:dni).first
	   equipo_nombre = Equipo.where(id: equipo).pluck(:nombre).first
	   #medico_nombre = Medico.where(id: medico).pluck(:nombre, :apellido).first.join(" ");
	   #color = Equipo.where(id: equipo).pluck(:color).to_s.slice(2,8)
	   tid = id

	   case mode
	     when "inserted"
	       event = Event.create :start_date => start_date, :end_date => end_date, :text => text, :medico => "medico1", :paciente => "paciente1", :equipo => "euqipo1"
	       tid = event.id
	       #evento = Evento.create :event_id => tid, :equipo => equipo_nombre, :medico => @medico.name, :nombre => @paciente.name, :apellido => @paciente.lastname, :email => @paciente.email, :start_date => start_date, :end_date => end_date
	       if rec_type == 'none'
	       	mode = 'deleted'
	       end
	       buscar_turno = Turno.where("(medico = ? OR equipo = ?) AND start_date <= ? AND end_date >= ?", medico, equipo, end_date, start_date)
	       buscar_turno.delete_all


	     when "deleted"
	       if rec_type != ''
         		Event.where(event_pid: id).destroy_all
       		end
	       if event_pid != 0 and event_pid != ''
	         event = Event.find(id)
	         event.rec_type = 'none'
	         event.save
	       else
	         Event.find(id).destroy
	       end
	       tid = id

	     when "updated"
	     	if rec_type != ''
         		Event.where(event_pid: id).destroy_all
       		end
	       event = Event.find(id)
	       event.start_date = start_date
	       event.end_date = end_date
	       event.text = text
	       event.paciente = paciente
	       event.medico = medico
	       event.equipo = equipo
	       event.color = color
	       event.rec_type = rec_type
	       event.event_length = event_length
	       event.event_pid = event_pid
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
