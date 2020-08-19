class UserQuestionsController < ApplicationController



    def index
        userQuestions = UserQuestion.all
        render json: userQuestions
    end

    def create
        userQuestion = UserQuestion.create(question_params)

        render json: userQuestion
    end

    private

    def question_params
        params.permit(:questionBody, :answer, :category, :theDumpster_id)
    end
end
