Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :players, except: [:new, :edit]
  resources :matches, except: [:new, :edit]
    
  #rutas orientadas a casos de uso
  post '/players/login', to: 'players#login'
  post '/matches/join/:match_number', to: 'matches#join'
  post '/matches/start/:match_number', to: 'matches#start'
  post '/matches/makemove/:match_number', to: 'matches#make_move'
  get '/matches/refresh/:match_number', to: 'matches#refresh'
end
