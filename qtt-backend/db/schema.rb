# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_08_19_162513) do

  create_table "easy_questions", force: :cascade do |t|
    t.string "category"
    t.string "question"
    t.string "answer"
    t.string "difficulty"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "hard_questions", force: :cascade do |t|
    t.string "category"
    t.string "question"
    t.string "answer"
    t.string "difficulty"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "highscores", force: :cascade do |t|
    t.integer "score"
    t.integer "scoreboard_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["scoreboard_id"], name: "index_highscores_on_scoreboard_id"
  end

  create_table "medium_questions", force: :cascade do |t|
    t.string "category"
    t.string "question"
    t.string "answer"
    t.string "difficulty"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "scoreboards", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "the_dumpsters", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_questions", force: :cascade do |t|
    t.string "questionBody"
    t.string "answer"
    t.string "category"
    t.integer "theDumpster_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["theDumpster_id"], name: "index_user_questions_on_theDumpster_id"
  end

  add_foreign_key "highscores", "scoreboards"
end
