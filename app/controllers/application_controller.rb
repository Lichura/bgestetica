class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user
  add_flash_types :contacto_error, :another_custom_type
  def login_required

   if current_user.blank?
   	redirect_to root_url, :notice => "no esta autorizado!"
   end
  end

  def admin_required
    if current_user.blank? || current_user.profile[:id] != 1
      redirect_to root_url, :notice => "no esta autorizado!"
    end  
  end
  private

  def current_user
  	#@current_user ||= User.find_by_auth_token!(cookies[:auth_token]) if cookies[:auth_token]
    @current_user ||= User.where("auth_token =?", cookies[:auth_token]).first if cookies[:auth_token]
  end
end
