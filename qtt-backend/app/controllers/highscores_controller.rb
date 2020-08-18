class HighscoresController < ApplicationController

    def index
        highscores = Highscore.all
        render json: highscores 
    end

    def show
        highscore = Highscore.all.find(params[:id])
        render json: highscore 
    end


end
