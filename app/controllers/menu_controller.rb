class MenuController < ApplicationController
  def index
  end

   def buscar_turnos
  	  @eventos = Evento.all
	  if params[:search]
	  	#@eventos.start_date = @eventos.start_date - (30*60)
	    @eventos = Evento.search(params[:search]).order('start_date DESC')
	  else
	    @eventos = Evento.all.order('created_at DESC')
	  end
  end

  def nuevo_turno
  	@eventos = Evento.where('start_date >= ?',Date.today).order('start_Date DESC')
    @turnos = Turno.all
    if params[:medico]
      @turnos = Turno.search(params[:medico], params[:equipo], params[:start_date].to_s)
    else
      @turnos = Turno.all
    end

 
  end

end
