class EasyQuestionsController < ApplicationController

    def index
        questions = EasyQuestion.all 
        render json: questions 
    end

    def show
        question = EasyQuestion.all.find(params[:id])
        render json: question 
    end
end
