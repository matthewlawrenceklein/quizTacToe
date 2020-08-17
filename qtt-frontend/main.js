function main(){
    loadQuestions()
}

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
    questionDiv.className = 'item'
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
        if (event.target.dataset.id === `${question.id}-true` || event.target.dataset.id === `${question.id}-false`){
            if (event.target.value === question.answer.toString()){
                console.log(event.target.value);
                console.log(question.answer)
                // targetDiv.innerHTML = 'you got it right'
            } else {
                // targetDiv.innerHTML = 'you got it wrong'
                console.log(event.target.value);
                console.log(question.answer)
            }
        }
    })
}














main()