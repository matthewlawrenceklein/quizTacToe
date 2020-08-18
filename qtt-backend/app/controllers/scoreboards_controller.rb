class ScoreboardsController < ApplicationController
    def index
        scoreboards = Scoreboard.all 
        render json: scoreboards
    end

    def show
        scoreboard = Scoreboard.all.find(params[:id])
        render json: scoreboard..to_json(:include => {
            :highscores => {:only => [:score]}
            }
        )
    end
end
