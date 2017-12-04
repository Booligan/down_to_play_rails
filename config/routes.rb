Rails.application.routes.draw do
  # devise_for :users

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks"}

  controller :pages do
    get :home
    get :about
    get :profile
  end

  resources :games

  get '/games/:id/join', to: 'games#join', as: 'join_game'
  root 'pages#home'
end
