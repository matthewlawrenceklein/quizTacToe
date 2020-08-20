class HighscoresController < ApplicationController

    def index
        highscores = Highscore.all
        render json: highscores 
    end

    def show
        highscore = Highscore.all.find(params[:id])
        render json: highscore 
    end

    def create
        # scoreboard_id = ScoreBoard.first.id 
        highscore = Highscore.create(highscore_params)
        render json: highscore
    end

    def update
        highscore = Highscore.all.find(params[:id])
        highscore.update(score: params[:score])
        render json: highscore 

    end

    private

    def highscore_params
        params.permit(:score, :username, :scoreboard_id)
    end

end
