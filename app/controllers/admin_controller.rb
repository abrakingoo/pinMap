class AdminController < ApplicationController
  before_action :require_admin

  def dashboard
    user_data = session.delete(:current_user)  # clear after reading
    users = User.all.select(:id, :email, :username, :created_at)
    render inertia: 'Admin', props: { users: users, flash_user: user_data }
  end

  def destroy_user
    user = User.find(params[:id])
    user.destroy
    redirect_to admin_path, notice: 'user deleted'
  end

  private

  def require_admin
    unless current_user&.admin?
      render inertia: 'Login', props: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end
