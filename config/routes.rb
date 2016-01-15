Rails.application.routes.draw do
  root to: "colors#index"

  resources :configs, only: [:index]
end
