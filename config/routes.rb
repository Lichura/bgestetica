Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  resources :profiles
  resources :events
  #get 'password_resets/new'

  get 'menu/index'
  get 'menu/nuevo_turno'
  get 'perfiles/home'
  get "buscar_turnos" => "menu#buscar_turnos"
  get "menu/buscar"
  resources :pacientes
  resources :medicos
  resources :equipos
  get 'home/index'
  post "menu/buscar" => "menu#buscar_turnos"
  post "home/nuevo_contacto" => "home#nuevo_contacto"
  get "nuevo_turno" => "menu#nuevo_turno"
  get "generar_turnos" => "menu#generar_turnos"
  post "nuevo_turno" => "menu#nuevo_turno"
  post "menu/generar_turnos" 
  #get 'sessions/new'
  get 'home/home'
  get 'home/medico_index', to: 'home#medico_index'
  #get 'users/new'
  # => get 'home/equipos.xml'

  get 'menu/buscar_turnos'
  get 'home/schedule', :as => "schedule"
  post 'home/schedule'
  get 'home/db_action', :as => "db_action"
  #get "home/data", :as => "data"
  get 'home/data', to: 'home#data', as: :data
  post 'home/data', to: 'home#data'
  get 'events/new'
  post 'events/create_or_update', to: "events#create_or_update"
  get 'events/recurring', to: "events#recurring"
  #get 'events/edit', to: "events#edit"
  get 'events/:id/confirm', to: "events#confirm", :as => "event_confirm"


  get "log_out" => "sessions#destroy", :as=> "log_out"
  get "log_in" => "sessions#new", :as => "log_in"
  get "sign_up" => "users#new", :as => "sign_up"
  root :to => "home#index"
  #get 'users/index' => "user#index"
  #get 'users/edit_multiple' => "user#edit_multiple"
  #resources :users, :collection => { :edit_multiple => :post, :update_multiple => :put }
  #resources :users
  resources :sessions
  resources :equipos_todos
  resources :password_resets
  resources :historias_clinicas  


resources :equipos do
  get :autocomplete_equipo_nombre, :on => :collection
end

  resources :users do
    collection do
      get :edit_multiple
      put :update_multiple
      get :buscar
    end
  end

  get 'users/buscar' => 'users#edit_multiple'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
