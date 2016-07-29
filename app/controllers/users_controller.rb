class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_filter :admin_required, only: [:update, :index, :edit, :show]
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
  		redirect_to root_url, :notice => @user.password
  	else
  		render "new"
  	end
  end

  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'Usuario was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
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
			params.require(:user).permit(:name, :lastname, :email, :age, :profile_id, :password, :password_confirmation)
		end
end
