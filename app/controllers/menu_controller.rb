class MenuController < ApplicationController
  def index
  end

   def buscar_turnos
  	  @eventos = Evento.all
	  if params[:search]
	  	#@eventos.start_date = @eventos.start_date - (30*60)
	    @eventos = Evento.search(params[:search]).order('start_date DESC')
	  else
	    @eventos = Evento.all.order('created_at DESC').limit(10)
	  end
  end

  def nuevo_turno
    @medicos = Medico.all
    @equipos = Equipo.all
  	@eventos = Evento.where('start_date >= ?',Date.today).order('start_Date DESC')
    @turnos = Turno.all
    @turno_unico = Turno.group("strftime('%Y%m%d', start_date)")
    if params[:medico]
      @turnos = Turno.search(params[:medico], params[:equipo], params[:start_date].to_s)
    else
      @turnos = Turno.all
    end
  end

  def generar_turnos
      medicos = Medico.all
      equipos = Equipo.all 
      d = DateTime.now.beginning_of_hour + 20.days
    medicos.each do |medico|
      equipos.each do |equipo|
        for horas in 1..24
          start_date = d + (30 * horas).minutes
          end_date = start_date + 30.minutes
          Turno.create([{medico: medico.id, equipo: equipo.id, start_date: start_date, end_date: end_date}])
        end
      end
    end
    redirect_to root_url
  end

end
