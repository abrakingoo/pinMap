class UsersController < ApplicationController
 def register
    
    # Rails.logger.info "ERORR DETAILS:"
    # Check if the user already exists
    if User.exists?(email: params[:user][:email])
      # Render the Register page with an error message if the email already exists
      render inertia: 'Register', props: { error: 'Email is already taken' }, status: :unprocessable_entity
    else
      # Create a new user instance with the submitted parameters
      user = User.new(user_params)
      
      # Attempt to save the user
      if user.save
        # If successful, render the Dashboard with the created user
        session[:user_id] = user.id
        redirect_to root_path
      else
        # If user validation fails, return errors in the response
        # You can pass the errors to the frontend to display them
        render inertia: 'Register', props: { error: user.errors.full_messages }
      end
    end
  end
  
  private

  def user_params
    # Permit email, password, and password_confirmation parameters from the form
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end

