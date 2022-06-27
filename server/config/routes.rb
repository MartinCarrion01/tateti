Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :players, only: [:create, :show] do 
    collection do
      post :login
    end
    member do
      get :active_match
    end
  end

  resources :matches, only: :create do
    member do
      put :join
      patch :join
      put :make_move
      patch :make_move
      put :abandon_match
      patch :abandon_match
      get :refresh
    end
  end
    
  #rutas orientadas a casos de uso
  #post '/matches/join/:match_number', to: 'matches#join'
  #post '/matches/start/:match_number', to: 'matches#start'
  #post '/matches/makemove/:match_number', to: 'matches#make_move'
  #get '/players/:id/active_match', to: 'players#active_match'
end
