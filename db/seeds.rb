# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# db/seeds.rb
5.times do |i|
  user = User.create!(
    email: "user#{i}@example.com",
    password: "password123",
    password_confirmation: "password123",
    username: "User#{i}",
    admin: i == 0
  )

  Pin.create!(
    user_id: user.id,
    latitude: rand(-90.0..90.0).round(6),
    longitude: rand(-180.0..180.0).round(6)
  )
end


