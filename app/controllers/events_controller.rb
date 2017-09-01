class EventsController < ApplicationController
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
    @event.save
    @historia_clinica = HistoriaClinica.new
  end

  def create
    @event = Event.new(event_params)
    @event.color = Equipo.find(params[:equipo]).color
	  @event.save
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
end
