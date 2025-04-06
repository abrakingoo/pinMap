class PagesController < ApplicationController
  def landing
    user_data = session.delete(:current_user)  # clear after reading
    @pins = Pin.includes(:user).select(:id, :latitude, :longitude, :user_id)
    render inertia: 'Landing', props: {
      pins: @pins.map do |pin|
        {
          id: pin.id,
          latitude: pin.latitude,
          longitude: pin.longitude,
          user_id: pin.user_id,
          username: pin.user ? pin.user.username : 'Unknown' 
        }
      end,
      flash_user: user_data 
    }
  end

  def login
    render inertia: "Login", props: { auth: { user: current_user&.as_json(only: [:id, :email]) } }
  end

  def register
    render inertia: "Register", props: { auth: { user: current_user&.as_json(only: [:id, :email]) } }
  end
end
