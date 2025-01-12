// Анимация для элементов .line
const contentLines = document.querySelectorAll('.line');

// Проверка на первый скролл
let firstScroll = false;

window.addEventListener('scroll', () => {
    // Проверка первого скролла
    if (!firstScroll && window.scrollY > 0) {
        firstScroll = true; // Отметка, что скроллирование произошло
    }

    // Если первый скролл уже произошел, начинаем анимацию
    if (firstScroll) {
        contentLines.forEach((line) => {
            const rect = line.getBoundingClientRect();

            // Если элемент видим, добавляем класс 'visible'
            if (rect.top < window.innerHeight) {
                line.classList.add('visible');
            }
        });
    }
});


// Действие кнопки "Связаться с нами"
const contactButton = document.querySelector('.fixed-button');
if (contactButton) {
    contactButton.style.zIndex = '1000'; // Устанавливаем поверх всего
    contactButton.addEventListener('click', () => {
        alert("Спасибо за интерес! Напишите нам по адресу: ngrenaderova31156@gmail.com или в Telegram: @plovmm");
    });
}

// Прокрутка плавная (если требуется для якорных ссылок)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Удаление таблицы и создание кнопок продуктов
const productsContainer = document.getElementById('product-buttons');
if (productsContainer) {
    const products = [
        { name: "Многофункциональный веб-сайт", link: "sayt.html" },
        { name: "Telegram-бот", link: "tg_bot.html" },
        { name: "Информационный веб-сайт", link: "info.html" },
    ];

    products.forEach((product) => {
        const button = document.createElement('button');
        button.textContent = product.name;
        button.className = 'product-button';
        button.style.fontSize = '1.8em'; // Увеличиваем размер кнопок
        button.style.padding = '20px 40px'; // Увеличиваем отступы внутри кнопок
        button.addEventListener('click', () => {
            window.location.href = product.link;
        });
        productsContainer.appendChild(button);
    });
}


// Анимация появления строк .line при загрузке
document.addEventListener('DOMContentLoaded', () => {
    contentLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = 1;
            line.style.transform = 'translateX(0)';
        }, index * 800); // Увеличена задержка между строками
    });
});



(function () {
    function createCanvas(parent, width, height) {
        const canvas = {};
        canvas.node = document.createElement('canvas');
        canvas.context = canvas.node.getContext('2d');
        canvas.node.width = width || 100;
        canvas.node.height = height || 100;
        parent.appendChild(canvas.node);
        return canvas;
    }

    function init(container, width, height, fillColor) {
        const canvas = createCanvas(container, width, height);
        const ctx = canvas.context;

        // Кастомный метод для рисования круга
        ctx.fillCircle = function (x, y, radius, fillColor) {
            this.fillStyle = fillColor;
            this.beginPath();
            this.arc(x, y, radius, 0, Math.PI * 2, false);
            this.fill();
        };

        // Очистка холста
        ctx.clearTo = function (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(0, 0, width, height);
        };

        ctx.clearTo(fillColor || "#6e6e6e");

        // Флаг для проверки состояния курсора
        canvas.isDrawing = false;

        // Обработка событий мыши
        canvas.node.onmousemove = function (e) {
            const x = e.offsetX;
            const y = e.offsetY;
            const radius = 80; // Радиус
            const fillColor = '#ff1000';
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillCircle(x, y, radius, fillColor);
        };

        // Событие для включения режима стирания при наведении
        canvas.node.onmouseenter = function () {
            canvas.isDrawing = true;
        };

        // Событие для отключения режима стирания при выходе за пределы
        canvas.node.onmouseleave = function () {
            canvas.isDrawing = false;
        };
    }

    // Инициализация
    const container = document.getElementById('canvas');
    init(container, 1000, 150, '#6e6e6e');
})();

