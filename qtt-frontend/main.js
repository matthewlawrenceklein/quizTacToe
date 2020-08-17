function main(){
    loadQuestions()
}
let userTurnCount = 0 


function loadQuestions(){
    fetch(`http://localhost:3000/questions/`)
        .then(resp => resp.json())
        .then(questionsData => {      
            for (let step = 0; step < 9; step++) {
                let squareId = step 
                const randomQuestionObject = questionsData[Math.floor ( Math.random() * questionsData.length )]
                renderCategory(randomQuestionObject, squareId)
            }
        addGridListener()
        })
}

function renderCategory(question, squareId){
    let mainDiv = document.getElementById('main-div')
    let questionDiv = document.createElement('div')
    questionDiv.className = `${squareId} item  `
    questionDiv.dataset.id = question.id 
    questionDiv.dataset.squareId = squareId
    questionDiv.id = question.id

    let txt = decodeHtml(question.category)
    let questionText = txt.value;

    questionDiv.innerText = questionText
    mainDiv.appendChild(questionDiv)
}

function addGridListener(){

    const grid = document.getElementById('main-div')

    grid.addEventListener('click', function(event){
        if (event.target.dataset.id && event.target.className !== "showing"){
            const questionId = event.target.dataset.id;

            fetch(`http://localhost:3000/questions/${questionId}`)
                .then(resp => resp.json())
                .then(questionData => {
                    let questionDiv = document.getElementById(`${questionData.id}`);
                    
                    let question = decodeHtml(questionData.question) 
                    
                    if(questionDiv.dataset.displayState !== 'showing') {
                        questionDiv.innerHTML = `
                            ${question.innerText} <br>
                            ${questionData.answer} <br>
                            <button value="true" data-id='${questionData.id}-true'> TRUE </button>
                            <button value="false" data-id='${questionData.id}-false'> FALSE </button>
                        `
                    }
                    questionDiv.dataset.displayState = 'showing'
                    answerListener(questionData)
                })
        }
    })

}

function decodeHtml(html) {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt  
}

function answerListener(question){

    let targetDiv = document.getElementById(`${question.id}`)
    targetDiv.addEventListener('click', function(event){

        if(userTurnCount === 8){
            console.log('no one wins');
        }

        if (event.target.dataset.id === `${question.id}-true` || event.target.dataset.id === `${question.id}-false`){
            if (event.target.value == question.answer.toLowerCase()){
                targetDiv.className += 'rightAnswerStyling'
                targetDiv.innerHTML = 'X'
                userTurnCount += 1
                winLoseStateListener()
            } else {
                targetDiv.className += `wrongAnswerStyling`
                targetDiv.innerHTML = 'O'
                userTurnCount +=1
                winLoseStateListener()
            }
        }
    })
}

function winLoseStateListener(){

    const rightAnswers = document.getElementsByClassName('item rightAnswerStyling')
    const wrongAnswers = document.getElementsByClassName('item wrongAnswerStyling')
    let rightSquareArray = []
    let wrongSquareArray = []

    function winState(condition, message){
        if (condition.includes('0') && condition.includes('1') && condition.includes('2')){
            console.log(message);
        }
        if (condition.includes('3') && condition.includes('4') && condition.includes('5')){
            console.log(message);
        }
        if (condition.includes('6') && condition.includes('7') && condition.includes('8')){
            console.log(message);
        }
        if (condition.includes('0') && condition.includes('3') && condition.includes('6')){
            console.log(message);
        }
        if (condition.includes('1') && condition.includes('4') && condition.includes('7')){
            console.log(message);
        }
        if (condition.includes('2') && condition.includes('5') && condition.includes('8')){
            console.log(message);
        }
        if (condition.includes('0') && condition.includes('4') && condition.includes('8')){
            console.log(message);
        }
        if (condition.includes('2') && condition.includes('4') && condition.includes('6')){
            console.log(message);
        }
    }
    
    if (rightAnswers.length > 0){
        for(let i = 0; i < rightAnswers.length; i++){
            rightSquareArray.push(rightAnswers[i].dataset.squareId)
            winState(rightSquareArray, 'you win')
        }
    }
   
    if(wrongAnswers.length > 0){
        for(let i = 0; i < wrongAnswers.length; i++){
            wrongSquareArray.push(wrongAnswers[i].dataset.squareId)
            winState(wrongSquareArray, 'you lose')
        }
    }
}











main()