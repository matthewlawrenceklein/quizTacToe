require 'httparty'

EasyQuestion.destroy_all 
MediumQuestion.destroy_all 
HardQuestion.destroy_all

easy_response = HTTParty.get('https://opentdb.com/api.php?amount=50&difficulty=easy&type=boolean')
easy_hash = easy_response.to_hash 

easy_hash['results'].each do |question|
    EasyQuestion.create(category: question["category"], question: question["question"], answer: question["correct_answer"], difficulty: question["difficulty"]) 
end 



medium_response = HTTParty.get('https://opentdb.com/api.php?amount=50&difficulty=medium&type=boolean')
medium_hash = medium_response.to_hash

medium_hash['results'].each do |question|
    MediumQuestion.create(category: question["category"], question: question["question"], answer: question["correct_answer"], difficulty: question["difficulty"]) 
end 


hard_response = HTTParty.get('https://opentdb.com/api.php?amount=50&difficulty=hard&type=boolean')
hard_hash = hard_response.to_hash

hard_hash['results'].each do |question|
    HardQuestion.create(category: question["category"], question: question["question"], answer: question["correct_answer"], difficulty: question["difficulty"]) 
end 
