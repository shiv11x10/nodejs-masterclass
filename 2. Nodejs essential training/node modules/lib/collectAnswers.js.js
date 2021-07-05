// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });

//   //adding done = f => f will make our function optional. It works like default arguments
// module.exports = (questions, done = f => f) => {
//     const answers = []
//     const [firstQuestion] = questions;

//     const questionAnswered = answer => {
//         answers.push(answer);
//         if(answers.length < questions.length) {
//             rl.question(questions[answers.length], questionAnswered);
//         } else{
//             done(answers);
//         }
//     }

//     rl.question(firstQuestion, questionAnswered);
// }

//The above module can be enhanced by using event emitter too

const readline = require('readline');
const { EventEmitter } = require("events");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  //adding done = f => f will make our function optional. It works like default arguments
module.exports = (questions, done = f => f) => {
    const answers = []
    const [firstQuestion] = questions;
    const emitter = new EventEmitter();

    const questionAnswered = answer => {
        emitter.emit("answer", answer);
        answers.push(answer);
        if(answers.length < questions.length) {
            rl.question(questions[answers.length], questionAnswered);
        } else{
            emitter.emit("complete", answers);
            done(answers);
        }
    }

    rl.question(firstQuestion, questionAnswered);

    return emitter;
}