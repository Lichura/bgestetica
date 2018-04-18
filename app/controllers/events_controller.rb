class EventsController < ApplicationController
  autocomplete :equipo, :nombre
before_action :set_event, only: [:confirm, :show, :edit, :update, :destroy, :cancel, :cancel_confirm]

	def new
	end

  def create_or_update
    @medicos = User.where(profile: [:medico]).all
    @equipos = Equipo.all
    @pacientes = User.where(profile: [:paciente]).all
    if params[:id].length < 13
      @event = Event.find(params[:id])
      @event_update = @event
      puts("estoy haciendo un update")
    else
     @event = Event.new(start_date: params[:start_date], end_date: params[:end_date], text: params[:text])
    end
    respond_to do |format|
      format.js { render :action => "new_event" }
    end
  end

  def dragAndDrop
      @event = Event.find(params[:id])
      @event.update(start_date: params[:start_date] , end_date: params[:end_date])
      respond_to do |format|
      if @event.save
        format.html { redirect_to schedule_url , notice: 'El turno se actualizo con exito' }
      end
    end
      puts("estoy haciendo un update por drag and drop")
  end

  def vacaciones
    @vacaciones = Event.new(text: "Vacaciones", medico: current_user.id, equipo: 1, paciente: current_user.id)
  end

  def evento_paciente
    @fecha_inicio = params[:start_date]
    @fecha_fin = params[:end_date]
    @medico = Medico.first
    @equipo = Equipo.first
    @paciente = current_user
    @event = Event.new( text: params[:text])
    respond_to do |format|
      format.js { render :action => "new_event_paciente" }
    end
  end


  def recurring
    @event = Event.new
    
  end

  def edit

  end
  

  def asignar_colores
    Event.all.each do |evento|
      evento.asignar_color_a_evento
    end
  end


  def confirm
    @event.estado = :finalizada
    @paciente = User.find(@event.paciente)
    puts @event.paciente
    @historia_clinica = HistoriaClinica.new(paciente_id: @paciente.id)
    @event.save
  end

  def confirmar
    @historia_clinica = HistoriaClinica.new(historia_clinica_params)
    if @historia_clinica.save
      respond_to do |format|
        format.html { redirect_to medico_index_path, notice: 'El turno se confirmo con exito' }
      end
    end
  end

  def create
    @event = Event.new(event_params)
    #@event.color = Equipo.find(@event.equipo).color
    respond_to do |format|
	   if @event.save
            # Sends email to user when user is created.
      #UserMailer.new_event(User.first, @event, "new event").deliver

      if current_user.is_admin
        format.html { redirect_to schedule_url , notice: 'El turno se creo con exito' }
      else
        #redirect_back(fallback_location: paciente_inicio_url)
        format.html { redirect_to paciente_inicio_url , notice: 'El turno se creo con exito' }
      end
      end
    end
  end

  def update
      @event.update(event_params)
      respond_to do |format|
      if @event.save
        format.html { redirect_to schedule_url , notice: 'El turno se actualizo con exito' }
      end
    end
  end

  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to schedule_url , notice: 'El turno se elimino con exito' }
    end
  end


  def cancel
    @event.estado = :cancelada
    @event.save
    @paciente = User.find(@event.paciente)
    @historia_clinica = HistoriaClinica.new(paciente_id: @paciente.id)
  end

    def cancel_confirm
    @historia_clinica = HistoriaClinica.new(historia_clinica_params)
    if @historia_clinica.save
      respond_to do |format|
        format.html { redirect_to medico_index_path, notice: 'El turno se cancelo con exito' }
      end
    end
  end


  private

    def set_event
      @event = Event.find(params[:id])
    end

    def recurring_event_params
      params.require(:event).permit(:text, :start_date, :end_date, :medico, :equipo, :paciente, :color, :rec_type, :event_length, :event_pid)
    end

	 def event_params
	 	params.require(:event).permit(:text, :start_date, :end_date, :medico_id, :equipo_id, :user_id, :color, :rec_type, :event_length, :event_pid)
	 end

   def historia_clinica_params
    params.require(:historia_clinica).permit(:text, :paciente_id)
   end
end
