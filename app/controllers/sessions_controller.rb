class SessionsController < ApplicationController
  def destroy
    reset_session
    Inertia.redirect('/users/sign_in')  # Redirect to the login page after logging out
  end
end