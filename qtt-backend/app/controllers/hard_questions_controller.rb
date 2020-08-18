class HardQuestionsController < ApplicationController
    def index
        questions = HardQuestion.all 
        render json: questions 
    end

    def show
        question = HardQuestion.all.find(params[:id])
        render json: question 
    end
end
