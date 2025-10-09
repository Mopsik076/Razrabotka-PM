const questions = [
    { text: "Какое ваше любимое аниме?", hint: "не смотреть аниме" },
    { text: "Как у вас дела?", hint: "будет хорошо" },
    { text: "Какое у вас хобби?", hint: "лень" },
    { text: "Как вас зовут?", hint: "Безымянный" },
    { text: "Что вы любите?", hint: "себя" }
];

let randomIndex = Math.floor(Math.random() * questions.length);

let selectedQuestion = questions[randomIndex].text;
let hint = questions[randomIndex].hint;

let userAnswer = prompt(selectedQuestion, hint);

alert("Вы сказали: " + userAnswer);
