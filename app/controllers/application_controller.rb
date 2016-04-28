class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user
  def login_required

   if current_user.blank?
   	redirect_to root_url, :notice => "no esta autorizado!"
   end
  end

  def admin_required
    if current_user.blank? || current_user.profile != "admin"
      redirect_to root_url, :notice => "no esta autorizado!"
    end  
  end
  private

  def current_user
  	@current_user ||= User.find_by_auth_token!(cookies[:auth_token]) if cookies[:auth_token]
  end
end
