Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  get '/cohorts', to: "homes#index"

  namespace :api do
    namespace :v1 do
      resources :cohorts, only: [:index, :create]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
