Rails.application.routes.draw do
  # devise_for :users

  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks"}

  controller :pages do
    get :home
    get :about
    get :profile
  end

  resources :games

  root 'pages#home'
end
