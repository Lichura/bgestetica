class HomeController < ApplicationController
  before_action :login_required, :except => :index
  before_action :admin_required, :only => [:schedule]
 


  def index
  	@contactos = Contacto.all

  end
  # GET /medicos/new
  def new
    @event = Event.new
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


  def medico_index
    @proximos_eventos = Event.today
      end

  def schedule
	@equipos_todos = Equipo.all
	@medicos = Medico.all
	@pacientes = Paciente.all
	@user = User.new
	@profiles = Profile.all
	if params[:search] && params[:search] != ""
  			puts("estoy buscando")
  			@events = Event.search(params[:search]).all
  	else
  			puts("no estoy buscando")
   			@events = Event.all
	end
	@event = Event.new

	@recurring = Recurring.all.map {|event| {
			  :id => event.id,
              :start_date => event.start_date.to_formatted_s(:db),
              :end_date => event.end_date.to_formatted_s(:db),
              :text => event.text,
              :rec_type => event.rec_type,
              :event_length => event.event_lenght,
              :event_pid => event.event_pid
		}}.to_json
puts @events.each { |event| event.id}
	@events = @events.map {|event| {
              :id => event.id,
              :start_date => event.start_date.to_formatted_s(:db),
              :end_date => event.end_date.to_formatted_s(:db),
              :text => event.text,
              :paciente => event.paciente,
              :medico => event.medico,
              :equipo => event.equipo,
              :color => event.color,
              :rec_type => event.rec_type,
              :event_length => event.event_length,
              :event_pid => event.event_pid}}.to_json


  end






	def db_action
	   mode = params[:dhx_editor_status]

	   case mode
	     when "inserted"
	       @event = Event.create(event_params)

	     when "deleted"
	         @event = set_event
	         @event.update(event_params)
	         @event.destroy

	     when "updated"
	     	@event = set_event
	        @event.update(event_params)
	   	 end

	   render :json => {
	              :type => mode,
	              :sid => @event.id,
	              :tid => @event.id,
	          }
	end


	private
	 def set_event
      @event = Event.find(params[:id])
     end

	 def contacto_params
	 	params.require(:contacto).permit(:nombre, :mail, :telefono, :texto)
	 end

	 def event_params
	 	params.permit(:text, :start_date, :end_date, :medico, :equipo, :paciente, :color, :rec_type, :event_length, :event_pid)
	 end

end
