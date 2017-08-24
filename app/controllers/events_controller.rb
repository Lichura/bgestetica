class EventsController < ApplicationController
before_action :set_event, only: [ :show, :edit, :update, :destroy]

	def new
    puts("renderizando")
		 if Event.find(params[:id])
        @event = Event.find(params[:id])
      else
        @event = Event.new
      end 
    respond_to do |format|  
		  format.html
    end
	end


  def create
    @event = Event.new(event_params)
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
      if Event.find(params[:id])
        @event = Event.find(params[:id])
      else
        @event = Event.new
      end 
      end


	 def event_params
	 	params.require(:event).permit(:text, :start_date, :end_date, :medico, :equipo, :paciente, :color, :rec_type, :event_length, :event_pid)
	 end
end
