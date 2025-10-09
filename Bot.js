const questions = [
    { text: "Какое ваше любимое аниме?"},
    { text: "Как у вас дела?"},
    { text: "Какое у вас хобби?"},
    { text: "Как вас зовут?" },
    { text: "Что вы любите?"}
];

let random = Math.floor(Math.random() * questions.length);

let Question = questions[random].text;

let Answer = prompt(Question);

alert("Вашь ответ: " + Answer);
