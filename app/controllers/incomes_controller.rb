class IncomesController < ApplicationController
      before_action :set_cobro, only: [:show, :edit, :update, :destroy]


	def index

	end

	def new
		@cobro = Income.new
	end

	def create
    @cobro = Profile.new(cobro_params)

    respond_to do |format|
      if @cobro.save
        format.html { redirect_to @cobro, notice: 'El ingreso se realizo correctamente' }
        format.json { render :show, status: :created, location: @cobro }
      else
        format.html { render :new }
        format.json { render json: @cobro.errors, status: :unprocessable_entity }
      end
    end
  end


	private
    # Use callbacks to share common setup or constraints between actions.
    def set_profile
      @cobro = Cobro.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def cobro_params
      params.require(:income).permit(:monto, :concepto, :user_id, :event_id)
    end

end