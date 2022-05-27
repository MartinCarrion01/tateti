Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :players, except: [:new, :edit]
    
  #rutas orientadas a casos de uso
  post '/players/:id/match/create', to: 'players#match_create'
  post '/players/login', to: 'players#login'
end
