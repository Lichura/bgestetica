class EventsController < ApplicationController
before_action :set_event, only: [:show, :edit, :update, :destroy]

	def new
		@event = Event.new
		render :partial=> 'events/new'
	end
  def create
    @event = Event.new(event_params)
	@event.save
  end

  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { notice: 'Medico was successfully updated.' }
      else
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
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


	 def event_params
	 	params.require(:event).permit(:text, :start_date, :end_date, :medico, :equipo, :paciente, :color, :rec_type, :event_length, :event_pid)
	 end
end
