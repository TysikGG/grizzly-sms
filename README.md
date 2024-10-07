# Библиотека для работы с grizzly-sms на Node.js

## Функционал
- **✨ Покупка номера.**
- **⚙️ Приём SMS на виртуальный номер.**
- **💥 Изменение и получение статуса номера.**
- **🚀 Парсинг цен на номера и их сортировка.**
#
### 📂 [NPM](https://www.npmjs.com/package/grizzly-sms)
### ❔ [Вопросы](https://github.com/TysikGG/grizzly-sms/issues)
#

## Установка

```sh
npm i grizzly-sms
```

## Инициализация
```js
const { GrizzlyInit } = require("grizzly-sms"); // Подключение библиотеки
const apiKey = process.env.API_KEY || "6efe3831c1abfeb968ddeb6c4c909bd1"; // Ваш API-ключ (можно получить на https://grizzlysms.com/profile/settings) 
const grizzly = new GrizzlyInit(apiKey); // Инициализация библиотеки
```

## Примеры кода

### Запрос баланса
```js
const balance = await grizzly.getBalance();
console.log(balance); // Выведет дробное число, например: 210.05
```

### Запрос цены на определённый номер
```js
const serviceCode = "tg"; // Код сервиса. Можно найти на https://grizzlysms.com/docs
const countryCode = "1"; // Код страны. Можно найти на https://grizzlysms.com/docs

const balance = await grizzly.getInfo({serviceCode: serviceCode, countryCode: countryCode});
console.log(balance) // Выведет объект формата { count: X, cost: Y, retry: 0 }, где X: количество доступных номеров, Y: цена за 1 номер.
```
## Автор: Tysik
