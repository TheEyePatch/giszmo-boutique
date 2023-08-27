Rails.application.routes.draw do
  devise_for :admins, controllers: { sessions: 'admins/sessions' }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root 'home#index'

  namespace :admin_console do
    root 'products#index'
    resources :products
  end
  # Defines the root path route ("/")
  # root "articles#index"
end
