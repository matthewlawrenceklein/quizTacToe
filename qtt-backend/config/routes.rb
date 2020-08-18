Rails.application.routes.draw do
  resources :highscores
  resources :scoreboards
  resources :easy_questions
  resources :hard_questions
  resources :medium_questions
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
