class User < ApplicationRecord
  has_secure_password  # requires 'bcrypt' gem
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }
  validates :password_confirmation, presence: true
  has_many :pins
end
