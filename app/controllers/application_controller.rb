class ApplicationController < ActionController::Base
    helper_method :current_user

  private

  def current_user
    return @current_user if defined?(@current_user)

    if session[:user_id]
      @current_user = User.find_by(id: session[:user_id])
    else
      @current_user = nil
    end
  end
  include InertiaRails::Controller
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
end
