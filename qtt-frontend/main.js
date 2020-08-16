function main(){
    loadQuestions()
}


function loadQuestions(){

    fetch(`http://localhost:3000/questions`)
        .then(resp => resp.json())
        .then(questionData => {
            questionData.forEach(renderQuestion)
        })
}

function renderQuestion(question){

    const mainUl = document.getElementById('question-list')
    let questionLi = document.createElement('li')
    questionLi.innerText = `${question.question} /////////////// ${question.answer}!`
    mainUl.append(questionLi) 
}





















main()