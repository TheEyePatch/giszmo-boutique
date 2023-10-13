Rails.application.routes.draw do
  devise_for :admins, controllers: { sessions: 'admins/sessions' }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :admin_console, path: '/admin' do
    root 'products#index'
    resources :products
  end
  # Defines the root path route ("/")
  # root "articles#index"

  scope module: 'client' do
    root 'home#index'
    resources :products
  end
end
