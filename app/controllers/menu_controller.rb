class MenuController < ApplicationController
  def index
  end

  def buscar
  	  	@eventos = Evento.all
	  if params[:search]
	    @eventos = Evento.search(params[:search]).order('start_date DESC')
	  else
	    @eventos = Evento.all.order('created_at DESC')
	  end
  end
end
