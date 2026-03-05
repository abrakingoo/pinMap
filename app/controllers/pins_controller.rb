class PinsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:user_pin, :destroy]
  
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

  def user_pin
    pin = Pin.find_by(user_id: params[:user_id])
    if pin
      render json: { has_pin: true, pin_id: pin.id }
    else
      render json: { has_pin: false }
    end
  end

  def destroy
    pin = Pin.find_by(id: params[:id])
    if pin && pin.user_id == current_user&.id
      pin.destroy
      render json: { message: 'Pin removed successfully' }, status: :ok
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end

