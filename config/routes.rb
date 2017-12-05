Rails.application.routes.draw do
  # devise_for :users

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks"}

  resources :users, only: [:show, :index] do
    resources :games, only: [:show, :index, :new, :edit]
  end

  resources :games

  get '/games/:id/join', to: 'games#join', as: 'join_game'
  get '/games/:id/leave', to: 'games#leave', as: 'leave_game'

  controller :pages do
    get :home
    get :about
  end

  root 'pages#home'
end
