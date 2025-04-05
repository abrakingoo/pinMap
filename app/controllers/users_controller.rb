# app/controllers/users_controller.rb
class UsersController < ApplicationController
  # UsersController
  def register
    # Check if the user already exists
    Rails.logger.info "USER DETAILS: #{user_params}"
    if User.exists?(email: params[:user][:email])
      # Render the Register page with an error message if the email already exists
      return render inertia: 'Register', props: { error: 'Email is already taken' }
    else
      user = User.new(user_params)
      
      if user.save
        # User created successfully, return the success response
        Rails.logger.info "User created successfully: #{user.inspect}" # Log the user object
        return render inertia: 'Dashboard', props: { user: user }
      else
        # Validation failed, return the errors
        Rails.logger.info "User failed to save: #{user.errors.full_messages}" # Log the errors
        return render inertia: 'Register', props: { errors: user.errors.full_messages }
      end
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
  
  
end
