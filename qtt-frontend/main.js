let currentLevel = "easy"
let userTotalScore = 0 
let userTurnCount = 0 

function main(){
    startModalListener()
}

function startModalListener(){
    button = document.getElementById('modal-start-btn')
    button.addEventListener('click', function(event){
        
        let mainDiv = document.getElementById('main-div')
        mainDiv.removeEventListener('click', handleGridClick)
        mainDiv.innerHTML = ''
        
        userTotalScore = 0
        userTurnCount = 0 
        currentLevel = "easy"

        document.getElementById('highscores').innerHTML = ''
        document.getElementById('highscores').className = ''
        
        let scoreDiv = document.getElementById('score-div')
        scoreDiv.innerHTML = ''

        let scoreCounter = document.createElement('p')
        scoreCounter.id = 'score-counter'
        scoreCounter.innerText = `Score: ${userTotalScore}`

        
        scoreDiv.appendChild(scoreCounter) 

        loadQuestions(currentLevel)
    })
}



function loadQuestions(difficulty){
    fetch(`http://localhost:3000/${difficulty}_questions/`)
        .then(resp => resp.json())
        .then(questionsData => {  
            
            for (let step = 0; step < 9; step++) {
                let squareId = step 
                let randomQuestionObject = questionsData[Math.floor ( Math.random() * questionsData.length )]
                renderCategory(randomQuestionObject, squareId)
            }
            addGridListener(currentLevel)
        })
}

function renderCategory(question, squareId){
    let mainDiv = document.getElementById('main-div')
    let questionDiv = document.createElement('div')
    questionDiv.className = `${squareId} item  `
    questionDiv.dataset.id = question.id 
    questionDiv.dataset.type = 'card'
    questionDiv.dataset.squareId = squareId
    questionDiv.dataset.displayState = ''
    questionDiv.id = question.id

    let txt = decodeHtml(question.category)
    let questionText = txt.value;

    questionDiv.innerText = questionText
    mainDiv.appendChild(questionDiv)

}
function handleGridClick(event){
    if (event.target.dataset.type){
        const questionId = event.target.dataset.id;
        fetch(`http://localhost:3000/${currentLevel}_questions/${questionId}`)
            .then(resp => resp.json())
            .then(questionData => {
                let questionDiv = document.getElementById(`${questionData.id}`);
                
                let question = decodeHtml(questionData.question) 

                // ${questionData.difficulty} <br>
                
                if(questionDiv.dataset.displayState !== 'showing') {
                    questionDiv.innerHTML = `
                        ${question.innerText} <br>
                        ${questionData.answer} <br>

                        <button class="button" value="true" data-id='${questionData.id}-true'> TRUE </button>
                        <button class="button" value="false" data-id='${questionData.id}-false'> FALSE </button>
                    `
                }
                questionDiv.dataset.displayState = 'showing'
                answerListener(questionData)
            })
    }
}

function addGridListener(difficulty){

    const grid = document.getElementById('main-div')
    grid.addEventListener('click', handleGridClick)
}

function decodeHtml(html) {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt  
}

function answerListener(question){

    console.log(question.difficulty);
    let targetDiv = document.getElementById(`${question.id}`)
    targetDiv.addEventListener('click', function(event){

        if(userTurnCount === 8){
            alert('no one wins');
        }

        if (event.target.dataset.id === `${question.id}-true` || event.target.dataset.id === `${question.id}-false`){
            if (event.target.value == question.answer.toLowerCase()){
                targetDiv.className += 'rightAnswerStyling '
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

    function winState(condition, message){
    
        if (condition.includes('0') && condition.includes('1') && condition.includes('2')){
            winSteps(message) 
        }
        if (condition.includes('3') && condition.includes('4') && condition.includes('5')){
            winSteps(message) 
        }
        if (condition.includes('6') && condition.includes('7') && condition.includes('8')){
            winSteps(message) 
        }
        if (condition.includes('0') && condition.includes('3') && condition.includes('6')){
            winSteps(message) 
        }
        if (condition.includes('1') && condition.includes('4') && condition.includes('7')){
            winSteps(message) 
        }
        if (condition.includes('2') && condition.includes('5') && condition.includes('8')){
            winSteps(message) 
        }
        if (condition.includes('0') && condition.includes('4') && condition.includes('8')){
            winSteps(message) 
        }
        if (condition.includes('2') && condition.includes('4') && condition.includes('6')){
            winSteps(message) 
        }
    }
    
    function winSteps(message){
        let roundScore = Math.floor(9000 / userTurnCount)

        if (message === 'you win'){

            userTotalScore += roundScore 
            let counter = document.getElementById('score-counter')
            counter.innerText =  `Score: ${userTotalScore}`

            userTurnCount = 0
            let mainDiv = document.getElementById('main-div')
            const grid = document.getElementById('main-div')
            grid.removeEventListener('click', handleGridClick)
            mainDiv.innerHTML = ''
                if(currentLevel === 'easy'){
                    currentLevel = 'medium'
                    let modalBody = document.getElementById('next-level-body')
                    modalBody.innerText += "It's gonna get a little harder. Good luck!"
                    nextLevelModal()
                } else if (currentLevel === 'medium'){
                    currentLevel = 'hard'
                    let modalBody = document.getElementById('next-level-body')
                    modalBody.innerText = "Super Job! One more level to go! You can do it!"
                    nextLevelModal()
                } else if (currentLevel === 'hard'){
                    let modalh2 = document.getElementById('user-score')
                    modalh2.innerHTML = `Your score is ${userTotalScore}!`
                    gameEndModal()
                }
        } else if (message === 'you lose'){


            currentLevel = 'easy'
            userTurnCount = 0
            userTotalScore = 0
            document.getElementById('score-div').innerHTML = ''
            document.getElementById('main-div').innerHTML = ''
            document.getElementById('main-div').removeEventListener('click', handleGridClick)
            youLoseModal()
         }
    }
    
}
function youLoseModal(){
    $('#youLoseModalCenter').modal({
        focus: true
      })
}

function nextLevelModal(){
    $('#nextLevelModalCenter').modal({
        focus: true
      })
    loadQuestions(currentLevel)
}

function gameEndModal(){
    $('#gameEndModalCenter').modal({
        focus: true
      })

    const endSubmit = document.getElementById('end-game-submit')
    endSubmit.addEventListener('click',function(event){
        event.preventDefault()
        
        const username = document.getElementById('username-input').value
        const questionBody = document.getElementById('question-input').value
        const questionAnswer = document.getElementById('true-false').value
        const questionCategory = document.getElementById('question-category').value
        const questionObj = {
            questionBody: questionBody, 
            answer: questionAnswer, 
            category: questionCategory,
            theDumpster_id: 1
        }
        const reqObj = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionObj)
        }

        fetch('http://localhost:3000/user_questions', reqObj)
            .then(resp => resp.json())
            .then(questionData => {

            fetch('http://localhost:3000/highscores')
                .then(resp => resp.json())
                .then(highScores => {

                for (i = 0; i < highScores.length; i++){
                    if (highScores[i].username == username && userTotalScore > highScores[i].score){
                        highscorePatch(highScores[i])
                    } 
                }

                let filteredScores = highScores.filter(score => score.username === username)
                if (filteredScores.length === 0){
                    highscorePost(username)
                }


                let scoresUl = document.getElementById('highscores')
                scoresUl.className = 'score-item'
                const mainDiv = document.getElementById('main-div')
                mainDiv.innerHTML = `
                <h1 id="banner2" class="item"> HIGH SCORES <h1> <br>
                
                `
            })
    })
            })
        
        // grab user submitted name
        // conditional to check if name exists in db
        // patch or post high score depending on above
        // make fetch request


        
}

function renderScores(scoreObj){

    let scoreLi = document.createElement('li')
    scoreLi.className = 'highscore'
    scoreLi.innerText = `
        ${scoreObj.username} ................. ${scoreObj.score}
    `
    document.getElementById('highscores').appendChild(scoreLi)
}

function highscorePatch(userData){
    const highscoreObj = {
        score: userTotalScore,
        username: userData.username
    }

    console.log(highscoreObj);

    const reqObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(highscoreObj)
    }
    fetch(`http://localhost:3000/highscores/${userData.id}`, reqObj)
        .then(resp => resp.json())
        .then(userData => {
            
            fetch('http://localhost:3000/highscores')
                .then(resp => resp.json())
                .then(highScores => {
                    highScores.sort((a, b) => (a.score < b.score) ? 1 : -1)

                    for(i = 0; i < 5; i++){
                        renderScores(highScores[i])
                    }
                })
        })        
}

function highscorePost(username){
    const highscoreObj = {
        score: userTotalScore,
        username: username,
        scoreboard_id: 10
    }

    const reqObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(highscoreObj)
    }

    fetch(`http://localhost:3000/highscores`, reqObj)
        .then(resp => resp.json())
        .then(userData => {
            console.log(userData);

            fetch('http://localhost:3000/highscores')
                .then(resp => resp.json())
                .then(highScores => {
                    highScores.sort((a, b) => (a.score < b.score) ? 1 : -1)

                    for(i = 0; i < 5; i++){
                        renderScores(highScores[i])
                    }
                })

        })
}


main()

