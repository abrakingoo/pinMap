class Pin < ApplicationRecord
  belongs_to :user

  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :username, presence: true

end
