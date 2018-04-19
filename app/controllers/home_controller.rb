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
    @eventos_pasados = Event.where.not(text: "Vacaciones").where("DATE(end_date) < ?", Date.today).where(estado: :pendiente).order(start_date: :desc).limit(5)
    @proximos_eventos = Event.where("DATE(start_date) >= ?", Date.today).order(start_date: :asc).limit(10)
  end

  def schedule_paciente
 
    @eventos = Event.where('start_date >= ?', Time.now).all
    #@events = Event.where('start_date >= ? AND paciente == ?', Time.now, 1).all
    #@events = @events.map {|event| {
              # :id => event.id,
              # :start_date => event.start_date.to_formatted_s(:db),
              # :end_date => event.end_date.to_formatted_s(:db),
              # :text => event.text,
              # :paciente => User.find(event.paciente).fullname,
              # :medico => User.find(event.medico).fullname,
              # :equipo => Equipo.find(event.equipo).nombre,
              # :rec_type => event.rec_type,
              # :event_length => event.event_length,
              # :event_pid => event.event_pid}}.to_json

    @fechas_bloqueadas = @eventos.map {|event| {
              :start_date => event.start_date.strftime("%Y-%m-%d,%H:%M"),
              :end_date => event.end_date.strftime("%Y-%m-%d,%H:%M")}}.to_json
  end


  def schedule
	@equipos_todos = Equipo.all
	@medicos = User.where(profile: [:medico]).all
	@pacientes = Paciente.where(profile: [:paciente]).all
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

	@events = @events.map {|event| {
              :id => event.id,
              :start_date => event.start_date.to_formatted_s(:db),
              :end_date => event.end_date.to_formatted_s(:db),
              :text => event.text,
              :paciente => event.user.fullname,
              :medico => event.medico.nombre,
              :equipo => event.equipo.nombre,
              :color => event.equipo.color,
              :rec_type => event.rec_type,
              :event_length => event.event_length,
              :event_pid => event.event_pid}}.to_json

  end






	# def db_action
	#    mode = params[:dhx_editor_status]

	#    case mode
	#      when "inserted"
	#        @event = Event.create(event_params)

	#      when "deleted"
	#          @event = set_event
	#          @event.update(event_params)
	#          @event.destroy

	#      when "updated"
	#      	@event = set_event
	#         @event.update(update_params)
	#    	 end

	#    render :json => {
	#               :type => mode,
	#               :sid => @event.id,
	#               :tid => @event.id,
	#           }
	# end


	private
	 def set_event
      @event = Event.find(params[:id])
     end

	 def contacto_params
	 	params.require(:contacto).permit(:nombre, :mail, :telefono, :texto)
	 end

	 def event_params
	 	params.permit(:text, :start_date, :end_date, :medico_id, :equipo_id, :user_id, :color, :rec_type, :event_length, :event_pid)
	 end

	 def update_params
	 	params.permit(:start_date, :end_date)
	 end

end
