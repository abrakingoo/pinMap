class PagesController < ApplicationController
  def landing
    pins = Pin.includes(:user).select(:id, :latitude, :longitude, :user_id)

    render inertia: "Landing", props: {
      pins: pins.as_json(include: { user: { only: :email } }),
      auth: {
        user: current_user&.as_json(only: [:id, :email])
      }
    }
  end
end

