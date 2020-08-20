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
        scoreboard_id = ScoreBoard.first.id 
        highscore = Highscore.create(highscore_params, scoreboard_id: scoreboard_id)
    end

    private

    def highscore_params
        params.permit(:score, :username)
    end

end
