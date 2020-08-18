class HardQuestionsController < ApplicationController
    def index
        questions = MediumQuestion.all 
        render json: questions 
    end

    def show
        question = MediumQuestion.all.find(params[:id])
        render json: question 
    end
end
