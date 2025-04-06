class PinLocationController < ApplicationController
  def create
    lat = params[:latitude]
    lng = params[:longitude]

    # If the user is logged in, associate the pin with the current user, otherwise, use a default user or nil
    if current_user
      Rails.logger.info "CURRENT USER FROM PIN LOCATION: #{current_user.username}"
      user_id = current_user.id
      username = current_user.username
    else
      user_id = nil
      username = 'Anonymous'
    end

    pin = Pin.new(latitude: lat, longitude: lng, user_id: user_id, username: username)

    if pin.save
      # Location successfully saved
      render json: { message: "Pin saved successfully!" }, status: :ok
    else
      # If save fails, log the errors
      Rails.logger.error "Pin save failed: #{pin.errors.full_messages.join(', ')}"
      render json: { error: pin.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
