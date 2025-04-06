Rails.application.routes.draw do
  root "pages#landing"

  get "/login", to: "pages#login"
  get "/signup", to: "pages#register"
  post '/login_auth', to: 'loginauth#login'
  post "/register", to: "users#register"
  post '/logout', to: 'sessions#destroy'
  post '/pin_location', to: 'pin_location#create'
  get 'pins', to: 'pins#index'
  get '/admin', to: 'admin#dashboard'
  delete '/admin/users/:id', to: 'admin#destroy_user'




  # get "home/index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
