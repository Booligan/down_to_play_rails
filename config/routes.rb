Rails.application.routes.draw do
  devise_for :users
  controller :pages do
    get :home
    get :about
    get :contact
  end

  resources :games

  root 'pages#home'
end
