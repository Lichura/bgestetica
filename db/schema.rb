# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171120112203) do

  create_table "contactos", force: :cascade do |t|
    t.string   "nombre"
    t.string   "mail"
    t.string   "telefono"
    t.string   "texto"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "equipos", force: :cascade do |t|
    t.string   "nombre"
    t.string   "descripcion"
    t.boolean  "activo"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "color"
    t.integer  "minutes"
  end

  create_table "eventos", force: :cascade do |t|
    t.integer  "dni"
    t.string   "nombre"
    t.string   "apellido"
    t.string   "email"
    t.datetime "start_date"
    t.datetime "end_date"
    t.string   "equipo"
    t.string   "medico"
    t.string   "event_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.datetime "start_date"
    t.datetime "end_date"
    t.string   "text"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "paciente"
    t.string   "medico"
    t.string   "equipo"
    t.string   "color"
    t.string   "rec_type"
    t.integer  "event_length"
    t.integer  "event_pid"
    t.integer  "estado"
    t.decimal  "precio"
  end

  create_table "historia_clinicas", force: :cascade do |t|
    t.integer  "paciente_id"
    t.string   "text"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "incomes", force: :cascade do |t|
    t.decimal  "monto"
    t.integer  "user_id"
    t.integer  "event_id"
    t.string   "concepto"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "insumos", force: :cascade do |t|
    t.integer  "cantidad"
    t.decimal  "costo"
    t.integer  "alerta"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "medicos", force: :cascade do |t|
    t.string   "nombre"
    t.string   "apellido"
    t.string   "telefono"
    t.string   "mail"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pacientes", force: :cascade do |t|
    t.string   "nombre"
    t.string   "apellido"
    t.string   "email"
    t.datetime "fecha_nacimiento"
    t.string   "telefono"
    t.integer  "dni"
    t.string   "direccion"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "profiles", force: :cascade do |t|
    t.string   "nombre"
    t.string   "descripcion"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "recurrings", force: :cascade do |t|
    t.string   "rec_type"
    t.string   "event_lenght"
    t.integer  "event_pid"
    t.datetime "start_date"
    t.datetime "end_date"
    t.string   "text"
    t.string   "details"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "turnos", force: :cascade do |t|
    t.integer  "medico"
    t.integer  "equipo"
    t.datetime "start_date"
    t.datetime "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "lastname"
    t.datetime "age"
    t.string   "email"
    t.string   "password_hash"
    t.string   "password_salt"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "auth_token"
    t.string   "password_reset_token"
    t.datetime "password_reset_sent_at"
    t.string   "password_digest"
    t.integer  "profile",                default: 3
    t.string   "phone"
    t.string   "address"
  end

end
