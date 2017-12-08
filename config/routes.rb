Rails.application.routes.draw do
  # devise_for :users

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks"}

  resources :users, only: [:show, :index] do
    resources :games, only: [:show, :index, :new, :edit]
  end

  resources :games do
    collection do
      get 'today_games', to: 'games#today'
      get 'past_games', to: 'games#past'
      get 'future_games', to: 'games#future'
    end
  end



  get '/games/:id/join', to: 'games#join', as: 'join_game'
  get '/games/:id/leave', to: 'games#leave', as: 'leave_game'

  controller :pages do
    get :home
    get :about
  end

  root 'pages#home'
end
