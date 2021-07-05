//demo of how to use custom modules
const collectAnswers = require("./lib/collectAnswers.js");

const questions = [
    "What is your name? ",
    "Where do you live? ",
    "What are you going to do with node js? "
];

// collectAnswers(questions, (answers) => {
//     console.log("Thankyou for your answers. ");
//     console.log(answers);
//     process.exit();
// })

//above call can be enhanced by using event listener in collectAnswer module

const answerEvents = collectAnswers(questions);

answerEvents.on("answer", answer => {
    console.log(`question answered: ${answer}`);
})

answerEvents.on("complete", answers => {
    console.log("Thankyou for your answers. ");
    console.log(answers);
})

//we can set more than one listeners for same event.
answerEvents.on("complete", () => process.exit());