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
  private

  def current_user
  	@current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end
