require 'httparty'

Question.destroy_all 

easy_response = HTTParty.get('https://opentdb.com/api.php?amount=100&difficulty=easy&type=boolean')
easy_hash = easy_response.to_hash 

easy_hash['results'].each do |question|
    Question.create(category: question["category"], question: question["question"], answer: question["correct_answer"], difficulty: question["difficulty"]) 
end 



medium_response = HTTParty.get('https://opentdb.com/api.php?amount=100&difficulty=medium&type=boolean')
medium_hash = medium_response.to_hash

medium_hash['results'].each do |question|
    Question.create(category: question["category"], question: question["question"], answer: question["correct_answer"], difficulty: question["difficulty"]) 
end 


