const wsUri = 'wss://echo-ws-service.herokuapp.com';
const textInput = document.querySelector('.text-input');
const sendBtn = document.querySelector('.btn-send');
const geoBtn = document.querySelector('.btn-geo');
const closeBtn = document.querySelector('.btn-close');
const chatBody = document.querySelector('.chat-body');

let websocket = new WebSocket(wsUri);

// Основной функционал бота
sendBtn.addEventListener('click', () => {
    websocket = new WebSocket(wsUri);

    websocket.onopen = function(event) {
        renderMessageElement('Соединение установлено');
    }
    websocket.onmessage = function(event) {
        renderMessageElement(event.data);
    }
    websocket.onerror = function(event) {
        renderMessageElement('Error:', event.data);
    }
    websocket.onclose = function(event) {
        renderMessageElement('Соединение разорвано');
    }

    renderUserMessage();
});

// Отправка сообщения по нaжатию клавиши 'Enter'
textInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        renderUserMessage();
    }
});

// Получение ввода пользователя и вывод на экран ответа
const renderUserMessage = () => {
    const userInput = textInput.value;
    renderMessageElement(userInput, 'user');
    textInput.value = '';
    setTimeout(() => {
        renderChatbotResponse(userInput);
        setScrollPosition();
    }, 700);
}

// Создание элемента сообщения
const renderMessageElement = (text, type) => {
    let className = 'user-message';
    if (type !== 'user') {
        className = 'bot-message';
    }
    const messageElement = document.createElement('div');
    const textNode = document.createTextNode(text);
    messageElement.classList.add(className);
    messageElement.append(textNode);
    chatBody.append(messageElement);
}

// Вывод на экран ответа бота
const renderChatbotResponse = (userInput) => {
    const result = getChatbotResponse(userInput);
    renderMessageElement(result);
}

// Получение ответа бота из набора заготовок или дублирование текста пользователя
const getChatbotResponse = (userInput) => {
    return responseObj[userInput] === undefined ? userInput : responseObj[userInput];
}

// Автопрокрутка окна чата при переполнении
const setScrollPosition = () => {
    if (chatBody.scrollHeight > 0) {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}
// Закрытие соединения
closeBtn.addEventListener('click', () => {
    websocket.close();
    websocket = null;
    setTimeout(() => {
        renderMessageElement('Соединение закрыто.');
        setScrollPosition();     
    }, 700);
});


// Геолокация

// Создание ссылки на карту
const renderMapLinkElement = (link) => {
    const linkElement = document.createElement('a');
    const linkTextNode = document.createTextNode('Ссылка на карту');
    linkElement.append(linkTextNode);
    linkElement.classList.add('bot-message__geo');
    linkElement.target = '_blanc';
    linkElement.href = link;
    chatBody.append(linkElement)
}

// Обработка успешного получения данных о местонахождении пользователя с выводом на экран информации и ссылки на openstreetmap.org
const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    locationData = `Широта: ${latitude}°, долгота: ${latitude}°`;
    renderMessageElement(locationData);

    const mapLink =`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    setTimeout(() => {
        renderMapLinkElement(mapLink);
        setScrollPosition();
    }, 1000);
}

// Вывод на эеран сообщения об ошибке
const error = () => {
    let response = 'Невозможно получить ваше местоположение';
    renderMessageElement(response);
    setScrollPosition();
}

geoBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        response = 'Geolocation не поддерживается вашим браузером';
        renderMessageElement(response);
    } else {
        setTimeout(() => {
            renderMessageElement('Определение местоположения...');
            setScrollPosition();
        }, 700);
        setTimeout(() => {
            navigator.geolocation.getCurrentPosition(success, error);            
            setScrollPosition();
        }, 700);
    }
});

const date = new Date();

const responseObj = {
    привет: 'И тебе привет!',
    день: date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear(),
    // today: new Date().toDateString(),
    время: date.getHours() + ':' + date.getMinutes(),
}