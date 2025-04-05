class PagesController < ApplicationController
  def landing
    pins = Pin.includes(:user).select(:id, :latitude, :longitude, :user_id)
    @user = current_user
    render inertia: "Landing", props: {
      pins: pins.as_json(include: { user: { only: :email } }),
      auth: {
        user: current_user&.as_json(only: [:id, :email])
      }
    }
  end
  def login
    render inertia: "Login", props: { auth: { user: current_user&.as_json(only: [:id, :email]) } }
  end

  def register
    render inertia: "Register", props: { auth: { user: current_user&.as_json(only: [:id, :email]) } }
  end
end

