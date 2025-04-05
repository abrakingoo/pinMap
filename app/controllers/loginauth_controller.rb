class LoginauthController < ApplicationController
  def login
    Rails.logger.info "LOGIN DETAILS: #{user_params}"

    # Find the user by email
    user = User.find_by(email: user_params[:email])

    if user && user.authenticate(user_params[:password])
      # Successful login
      session[:user]= user
      session[:user_id] = user.id
      session[:email] = user.email 
      redirect_to root_path, notice: 'Login successful'
    else
      # Invalid credentials
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:loginauth).permit(:email, :password)
  end
end
