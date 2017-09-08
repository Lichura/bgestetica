class EventsController < ApplicationController
  autocomplete :equipo, :nombre
before_action :set_event, only: [:confirm, :show, :edit, :update, :destroy]

	def new
	end

  def create_or_update
    @medicos = Medico.all
    @equipos = Equipo.all
    @pacientes = Paciente.all
    if params[:id].length < 13
      @event = Event.find(params[:id])
      puts("estoy haciendo un update")
    else
     @event = Event.new(start_date: params[:start_date], end_date: params[:end_date], text: params[:text])
    end
    respond_to do |format|
      format.js { render :action => "new_event" }
    end
  end

  def recurring
    @event = Event.new
    
  end

  def edit

  end
  
  def confirm
    @event.estado = 3
    @paciente = Paciente.find_by(nombre: @event.paciente)
    puts @event.paciente
    @historia_clinica = HistoriaClinica.new
    @event.save
  end

  def confirmar
    @historia_clinica = HistoriaClinica.new(historia_clinica_params)
    @historia_clinica.save
    respond_to do |format|
      format.html { render 'home/medico_index' }
    end
  end

  def create
    @event = Event.new(event_params)
    @event.color = Equipo.find(@event.equipo).color
    respond_to do |format|
	   if @event.save
        format.html { redirect_to schedule_url , notice: 'El turno se creo con exito' }
      end
    end
  end

  def update
      @event.update(event_params)
  end

  def destroy
    @event.destroy
    respond_to do |format|
      format.json { head :no_content }
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
	 	params.require(:event).permit(:text, :start_date, :end_date, :medico, :equipo, :paciente, :color, :rec_type, :event_length, :event_pid)
	 end

   def historia_clinica_params
    params.require(:historia_clinica).permit(:text, :paciente_id)
   end
end
