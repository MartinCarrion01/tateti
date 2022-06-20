Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :players, only: :create do 
    collection do
      post :login
    end
  end

  resources :matches, only: :create do
    member do
      put :join
      patch :join
      put :start
      patch :start
      patch :make_move
      put :make_move
      get :refresh
    end
  end
    
  #rutas orientadas a casos de uso
  #post '/matches/join/:match_number', to: 'matches#join'
  #post '/matches/start/:match_number', to: 'matches#start'
  #post '/matches/makemove/:match_number', to: 'matches#make_move'
  #get '/matches/refresh/:match_number', to: 'matches#refresh'
end
