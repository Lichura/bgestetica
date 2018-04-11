class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :admin_required, only: [:index, :edit, :show]
  before_action :admin_required, only: [:update],  :unless => :user_is_current_user?

  def user_is_current_user?
    puts current_user.id
    puts params[:id]
    return true if (current_user == User.find(params[:id]))
  end
  def new
  	@user = User.new
  end
  def index
    @user = User.all
  end
  def show
  end
  def edit
        @profiles = Profile.all
  end

def buscar
    @user = User
    if params[:search]
      @user = User.search(params[:search])
    else
      @user = User.all
    end
end

def edit_multiple
    @profiles = Profile.all
    @user = User.all
    if params[:search]
      @user = User.search(params[:search])
    else
      @user = User.all
    end
end

def update_multiple
  @user = User.update(params[:users].keys, params[:users].values)
  @user.reject! { |u| u.errors.empty? }
  if @user.empty?
    redirect_to edit_multiple_users_url
  else
    render "index"
  end
end


  def create
  	@user = User.new(user_params)
    if @user.password.blank?
      randomstring = SecureRandom.hex(5)
      puts randomstring
      @user.password = randomstring
      @user.password_confirmation = randomstring
    end
  	if @user.save
      UserMailer.envio_de_password(@user, @user.password).deliver_later
  		redirect_to root_url, :notice => "Muchas gracias #{@user.name}"
  	else
  		render "new"
  	end
  end

  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to root_url, notice: 'Usuario was successfully updated.' }
        format.json { render root_url, status: :ok }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to edit_multiple_users_url, notice: 'El usuario fue eliminado correctamente' }
      format.json { head :no_content }
    end
  end

  	private
    def set_multiple_ids
      params[:user_ids]
    end
    def set_user
      @user = User.find(params[:id])
    end
		def user_params
			params.require(:user).permit(:name, :lastname, :email, :address, :phone, :age, :profile_id, :password, :password_confirmation)
		end
end
