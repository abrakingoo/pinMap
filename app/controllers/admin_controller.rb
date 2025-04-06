class AdminController < ApplicationController
  before_action :require_admin

  def dashboard
    user_data = session.delete(:current_user)  # clear after reading
    users = User.joins(:pins)
    .select('users.id, users.email, users.username, users.created_at, users.admin, pins.latitude, pins.longitude')
    render inertia: 'Admin', props: { users: users, flash_user: user_data }
  end

  def destroy_user
    user = User.find(params[:id])
    user.destroy
    redirect_to admin_path, notice: 'user deleted'
  end

  private

  def require_admin
    unless current_user
      redirect_to login_path and return
    end
    unless current_user&.admin?
      redirect_to root_path and return
    end
  end
end
