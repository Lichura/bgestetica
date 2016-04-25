class PerfilesController < ApplicationController
before_filter :admin_required
  def home
  	@users = User.all
  end
  def new
    @paciente = Paciente.new
  end
  def edit
  end
  def create
  	@user = User.new(user_params)
  	if @user.save
  		redirect_to root_url, :notice => "Gracias por create un usuario"
  	else
  		render "new"
  	end
  end

  	private
		def user_params
			params.require(:user).permit(:username, :email, :password, :password_confirmation, :profile)
		end
end
