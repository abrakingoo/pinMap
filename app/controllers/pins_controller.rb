class PinsController < ApplicationController
  def index
    @pins = Pin.includes(:user).all
    pins_data = @pins.map do |pin|
      {
        id: pin.id,
        latitude: pin.latitude,
        longitude: pin.longitude,
        user_id: pin.user_id,
        username: pin.user ? pin.user.username : 'Unknown' 
      }
    end
    render inertia: 'Landing', props: { pins: @pins_data }
  end
end

