<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Опрос с картинками и сообщениями</title>
    <style>
        .image-container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1000;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 20px;
            border-radius: 10px;
            display: none;
        }
        
        img {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
<div id="overlay" class="image-container"></div>
<script>
    const questions = [
        { text: "Какое ваше любимое аниме?" },
        { text: "Как у вас дела?" },
        { text: "Какое у вас хобби?" },
        { text: "Как вас зовут?" },
        { text: "Что вы любите?" },
        { text: "Как вас зовут?" },
        { text: "Как вас зовут?" },
        { text: "Как вас зовут?" },
        { text: "Как вас зовут?" },
        { text: "Как вас зовут?" },
        { text: "Как вас зовут?" },
        { text: "Как вас зовут?" },
        { text: "Как вас зовут?" },
        { text: "Как вас зовут?" },
        { text: "Как вас зовут?" },
    ];

    let counter = 0;

    const Horoshiy = [
        "Звучит очень мило!",
        "Прикольно.",
        "Мне нравится!",
        "Ты меня заинтересовал.",
        "Приятно слышать!"
    ];

    const Plohoy = [
        "Отвратительно!",
        "Скучно!",
        "Ты додик что-ли?",
        "Звучишь как мой дед, такой же нудным. ",
        "Теперь понятно почему никто с тобой не дружит."
    ];
        const Tupoy = [
        "Не игнорируй меня!",
        "ЭЙ!",
        "Ты молчишь как тот парень, которого я тогда утопила.",
        "Придурок."
    ];

    function showImage(src, caption) {
        document.getElementById('overlay').innerHTML = `
            <h2 style="margin-bottom: 10px;">${caption}</h2>
            <img src="${src}" alt="Изображение"/>
        `;
        document.getElementById('overlay').style.display = 'block';
        setTimeout(() => {
            document.getElementById('overlay').style.display = 'none';
        }, 3000);
    }

    let Name = prompt("Как вас зовут?", "Казума");

    while(counter >= 0 && counter <= 10) {
        let question = questions[Math.floor(Math.random() * questions.length)].text;
        let answer = prompt(question);
        
        if(answer.trim().toLowerCase() === 'стоп') {
            alert('Вы вышли из опроса.');
            break;
        }
        
        if (!answer.trim()) {
            alert(Tupoy[Math.floor(Math.random() * Tupoy.length)]);
            counter--;
            if (counter < 0) {
            counter = 0; // Минимальное значение счётчика - ноль
            }
        alert(`Симпатия: ${counter}`)
        continue;
        }
        
        let Otvet = Math.random() > 0.4;
        
        let message = Otvet ? Horoshiy[Math.floor(Math.random() * Horoshiy.length)] : Plohoy[Math.floor(Math.random() * Plohoy.length)];

        alert(`${Name}: ${answer}\n\nМегумин: ${message}`);
        

        if(Otvet) {
            counter++;
        } else {
            counter--; 
        }
        
        if(counter < 0) {
            counter = 0;
        }

        alert(`Симпатия: ${counter}`)
        
        if (counter === 3 || counter === 5 || counter === 7 || counter === 9 || counter === 10) {
            switch(counter) {
                case 3:
                    showImage('', 'Картинка1');
                    break;
                case 5:
                    showImage('', 'Картинка2');
                    break;
                case 7:
                    showImage('', 'Картинка3');
                    break;
                case 9:
                    showImage('', 'Картинка4');
                    break;
                case 10:
                    showImage('', 'Картинка5');
                    break;
            }
        }
    }

    alert('Поздравляю, Мегумин вас любит!');
</script>
</body>
</html>
