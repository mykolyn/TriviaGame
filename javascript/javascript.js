var count = 20
var questNumber = 0;
var answered = 0
var correct = 0
var wrong = 0
var unanswered = 0

//questionbank declaration
var questionBank = [{
    question: 'What is a single piece of coiled DNA is known as?',
    answer: ["Chromosome", "Mitochondria", "Phospholipids"]
},
{
    question: 'The name for this semi-precious stone comes from the Latin for "sea water"?',
    answer: ["Aquamarine", "Diamond", "Posedion"]

},
{
    question: 'What is it called when water hits your behind when you go number 2?',
    answer: ["Poseidons kiss", "Backlash", "Splash Mountain"]

},

]
//answers declaration
var answerbank = {
    "What is a single piece of coiled DNA is known as?": ["Chromosome", '<iframe src="https://www.youtube.com/embed/IePMXxQ-KWY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'],
    'The name for this semi-precious stone comes from the Latin for "sea water"?': ["Aquamarine", '<iframe src="https://www.youtube.com/embed/RoL6uSQgbLY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'],
    'What is it called when water hits your behind when you go number 2?': ["Poseidons kiss", '<iframe src="https://www.youtube.com/embed/-XNDM4eAn1U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'],
}

//main run function
function run() {
    intervalId = setInterval(decrement, 1000);    
    setQuestion()


}
//shuffle questionbank
function shuffle() {
    for (i = questionBank.length - 1; i > 0; i--) {
        randomNum = Math.floor(Math.random() * (i + 1));
        t = questionBank[i];
        questionBank[i] = questionBank[randomNum];
        questionBank[randomNum] = t
    }
}

//timer
function decrement() {

    count--

    $(".timeremain").html(`<h2 class="text-center">Time Remaining: ${count}sec</h2>`)
    if (count == 0) {
        clearInterval(intervalId)
        $(".answers").attr("disabled", true)
        var question = questionBank[questNumber].question
        var newDiv = $("<div>")
        newDiv.addClass("embed-responsive embed-responsive-16by9")
        newDiv.append(answerbank[question][1])
        $(".card-text").append(newDiv)
        unanswered++
        var newDiv1 = `<h5 style="color: red;">Time's Up, correct answer is: ${answerbank[question][0]}</h5>`
        $(".card-text").append(newDiv1)

        setTimeout(function () {
            questNumber++
            if (questNumber < questionBank.length) {
                count = 20
                $(".timeremain").html(`<h2 class="text-center">Time Remaining: 20sec</h2>`)
                run()
            }
            else {
                showResult()
            }

        }, 3000);


    }


}


//set questions on screen
function setQuestion() {
    $(".card-title").text(questionBank[questNumber].question)
    $(".card-text").empty()
    for (i = 0; i < questionBank[0].answer.length; i++) {
        var newDiv = `<div><input class="answers" type="radio" name="answer" value="${questionBank[questNumber].answer[i]}"> ${questionBank[questNumber].answer[i]}</div>`
        $(".card-text").append(newDiv)
    }

}

//show result after the run
function showResult() {
    $(".timeremain").html(`<h2 class="text-center">Time Remaining: 0sec</h2>`)
    $(".card-text").empty()
    $(".card-body").html(`<h5 class="text-center" style=" font:bold;"> Score</h5>`)
    var newDiv = `<h6 class="text-center">Answered: ${answered}</h6>
    <h6 class="text-center" >Unanswered: ${unanswered}</h6>
    <h6 class="text-center" style="color: green;">Correct: ${correct}</h6>
    <h6 class="text-center" style="color: red;">Wrong: ${wrong}</h6>`

    $(".card-body").append(newDiv)

}

//after answer selection trigger
$(".card-text").click(function (event) {
    clearInterval(intervalId)
    answered++
    console.log($(event.target).attr("value"))
    var question = questionBank[questNumber].question
    var vType = $(event.target).attr("type")
    //console.log(vType)
    console.log(answerbank[question][0])


    if ($(event.target).attr("value") == answerbank[question][0] && vType == "radio") {
        //$(".card-text").empty()   
        $(".answers").attr("disabled", true)
        var newDiv = $("<div>")
        newDiv.addClass("embed-responsive embed-responsive-16by9")
        newDiv.append(answerbank[question][1])
        $(".card-text").append(newDiv)
        correct++
        var newDiv1 = `<h5 style="color: green;">Your answer is correct</h5>`
        $(".card-text").append(newDiv1)
        setTimeout(function () {
            questNumber++
            if (questNumber < questionBank.length) {
                count = 20
                $(".timeremain").html(`<h2 class="text-center">Time Remaining: 20sec</h2>`)
                run()
            }
            else {
                showResult()
            }

        }, 4000);

    }
    else if ($(event.target).attr("value") != answerbank[question][0] && vType == "radio") {
        //$(".card-text").empty()   
        $(".answers").attr("disabled", true)
        var newDiv = $("<div>")
        newDiv.addClass("embed-responsive embed-responsive-16by9")
        newDiv.append(answerbank[question][1])
        $(".card-text").append(newDiv)
        wrong++
        var newDiv1 = `<h5 style="color: red;">Sorry, you are incorrect.</h5>`+`<h5 style="color: green;">The correct answer is: ${answerbank[question][0]}</h5>`
        $(".card-text").append(newDiv1)
        setTimeout(function () {
            questNumber++
            if (questNumber < questionBank.length) {
                count = 20
                $(".timeremain").html(`<h2 class="text-center">Time Remaining: 20sec</h2>`)
                run()
            }
            else {
                showResult()
            }

        }, 4000);

    }

}

)
//run program
shuffle()
run()