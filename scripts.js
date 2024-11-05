document.addEventListener('DOMContentLoaded', function() {
    let container = document.querySelector('.container');
    let squares = Array.from(container.children);
    let matchedCardsCount = 0; // Счетчик совпадений



    // Функция для перемешивания массива
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Перемешиваем элементы
    shuffle(squares);

    // Добавляем перемешанные элементы обратно в контейнер
    squares.forEach(square => container.appendChild(square));

    let previousElement = null;

    container.addEventListener('click', function(event) {
        let currentElement = event.target;

        if (currentElement.classList.contains("square_closed")) {
            currentElement.classList.remove("square_closed");
            if (previousElement === null) {
                previousElement = currentElement;
            } else if (previousElement.classList.contains(currentElement.classList[2])) {
                // Если классы совпадают, оставляем их открытыми
                previousElement = null; // Сбрасываем предыдущий элемент
                matchedCardsCount += 2; // Увеличиваем счетчик совпадений
                if (matchedCardsCount === 16) { // Если все карточки совпали
                    document.getElementById('restart-button').style.display = 'block'; // Показываем кнопку сброса
                    // document.getElementsByClassName('done').style.display = 'block'; // Показываем кнопку сброса

                    document.querySelector('.confetti').innerHTML = confetti;
                    squares.forEach(square => {
                        square.classList.add('done');
                    });
                }
              
            } else {
                // Если не совпадают, возвращаем оба элемента к закрытому состоянию
                setTimeout(() => {
                    currentElement.classList.add("square_closed");
                    previousElement.classList.add("square_closed");
                    previousElement = null; // Сбрасываем предыдущий элемент
                }, 1000); // Задержка перед закрытием (например, 1 секунда)
            }
        }
    });
});

document.getElementById('restart-button').addEventListener('click', () => {
    location.reload(); // Перезапускаем игру
  });
  