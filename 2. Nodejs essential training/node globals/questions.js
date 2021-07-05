//It writes the output to the console with any interference. We are in control of newlines and spacing of terminal
// process.stdout.write("Hello ");
// process.stdout.write("World \n\n\n");


const questions = [
    "What is your name?",
    "What would you rather be doing?",
    "What is your preferred programming language?"
];

const ask = (i=0) => {
    process.stdout.write(`\n\n\n ${questions[i]}`);
    process.stdout.write(` > `);
};

ask();

const answers = [];
//The process.stdin property returns a stream connected to stdin (fd 0)
//This will create a asynchronous stream. When data is entered into the terminal the callback function will be called.
process.stdin.on("data", (data) => {
    answers.push(data.toString().trim());

    if(answers.length < questions.length) {
        ask(answers.length);
    } else {
        process.exit(); //Exit the process when all questions are answered.
    }
});

//Handle the case when process is exited.
process.on("exit", () => {
    const [name, activity, lang] = answers;
    console.log(`
    
    Thankyou for your answers.

    Go ${activity} ${name} you can write ${lang} code later!!

    `);
});