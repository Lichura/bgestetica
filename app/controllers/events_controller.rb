class EventsController < ApplicationController
  autocomplete :equipo, :nombre
  #before_action :set_event, only: [:confirm, :show, :edit, :update, :destroy, :cancel, :cancel_confirm]
  before_action :set_scheduler_data, only: [:scheduler, :create_or_update]


def show
end

def scheduler
  @user = User.new
  @event = Event.new
  @profiles = Profile.all
  case current_user.is_admin
  when false
    @events = Event.where('start_date >= ?', Time.now).all
    @fechas_bloqueadas = @eventos.map {|event| {
        :start_date => event.start_date.strftime("%Y-%m-%d,%H:%M"),
        :end_date => event.end_date.strftime("%Y-%m-%d,%H:%M")}}.to_json
  when true
    if params[:search] && params[:search] != ""
          @events = Event.search(params[:search]).all
    else
          @events = Event.all
    end

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
        :event_pid => event.event_pid
    }}.to_json


    render :scheduler
  end
end

  def vacaciones
    @vacaciones = Event.new(text: "Vacaciones", medico: current_user.id, equipo: 1, paciente: current_user.id)
  end

  def create_or_update
      if params[:id].length < 13
        @event = Event.find(params[:id])
        @event_update = @event
      else
        @event = Event.new(start_date: params[:start_date], end_date: params[:end_date], text: params[:text])
      end
      respond_to do |format|
        format.js { render :action => "new_event" }
      end
  end


  private
    def set_scheduler_data
      @profile = current_user.profile
      @medicos = Medico.all
      @medicos = User.where(profile: [:medico]).all
      @pacientes = Paciente.where(profile: [:paciente]).all
    end

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

