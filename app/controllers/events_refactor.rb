before_action :set_scheduler_data, only: [:scheduler, :create_or_update]

def scheduler(user)
  @user = User.new
  @event = Event.new
  @profiles = Profile.all
  case user.profile
  when :paciente
    @events = Event.where('start_date >= ?', Time.now).all
    @fechas_bloqueadas = @eventos.map {|event| {
        :start_date => event.start_date.strftime("%Y-%m-%d,%H:%M"),
        :end_date => event.end_date.strftime("%Y-%m-%d,%H:%M")}}.to_json
  when :medico
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

    @recurring = Recurring.all.map {|event| {
        :id => event.id,
              :start_date => event.start_date.to_formatted_s(:db),
              :end_date => event.end_date.to_formatted_s(:db),
              :text => event.text,
              :rec_type => event.rec_type,
              :event_length => event.event_lenght,
              :event_pid => event.event_pid
    }}.to_json

  end
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
      @medicos = Medico.all
      @medicos = User.where(profile: [:medico]).all
      @pacientes = Paciente.where(profile: [:paciente]).all
    end

