Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  get '/cohorts', to: "homes#index"
  get '/cohorts/:id', to: 'homes#index'
  get '/', to: "homes#index"

  namespace :api do
    namespace :v1 do
      resources :cohorts, only: [:index, :show, :create] do
        resources :students, only: [:create, :destroy]
        resources :groups, only: [:create]
      end
      resources :weeks, only: :update
    end
  end
end
