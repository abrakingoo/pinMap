class SessionsController < ApplicationController
  def destroy
    reset_session
    # Option 1: Redirect to login or home using Inertia
    # redirect_to inertia_path('/') # or login_path, etc.

    # Option 2 (if you want to show a page with props immediately):
    redirect_to root_path, notice: 'Logged out successfully.'
  end
end
