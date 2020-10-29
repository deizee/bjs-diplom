"use strict";

// ================= Выход ================
const logBtn = new LogoutButton();
const logoutCheck = (response) => {
    if (response.success) {
        location.reload();
    } 
}
logBtn.action = () => ApiConnector.logout(logoutCheck);


// ===== Получение инфо о пользователе =====
const userInfoCheck = (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
}
ApiConnector.current(userInfoCheck);


// ======== Получение курсов валют ========
const ratesBoard = new RatesBoard();
const ratesCheck = (response) => {
    if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }
}
function getRates() {
    ApiConnector.getStocks(ratesCheck);
    // console.log('Обновлен список валют');
}
getRates();
setInterval(getRates, 60000);


// ======== Операции с деньгами ========
const moneyManager = new MoneyManager();

// Пополнение баланса
const addMoneyCheck = (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, 'Операция выполнена успешно');
    } else {
        moneyManager.setMessage(response.success, 'Что-то пошло не так. Проверьте правильность заполнения полей ввода');
    }
}
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, addMoneyCheck);
}

// Конвертирование валюты
const convertMoneyCheck = (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, 'Операция выполнена успешно');
    } else {
        moneyManager.setMessage(response.success, 'Что-то пошло не так. Проверьте правильность заполнения полей ввода');
    }
}
moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, convertMoneyCheck);
}

// Перевод валюты
const transferMoneyCheck = (response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage(response.success, 'Операция выполнена успешно');
    } else {
        moneyManager.setMessage(response.success, 'Что-то пошло не так. Проверьте правильность заполнения полей ввода');
    }
}
moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, transferMoneyCheck);
}


// ========== Работа с избранными ==========
const favoritesWidget = new FavoritesWidget();

// Формирование начального списака избранных
const getFavoritesCheck = (response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
}
ApiConnector.getFavorites(getFavoritesCheck);

// Добавление пользователя в список избранных
const addUserCheck = (response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        moneyManager.setMessage(response.success, 'Операция выполнена успешно');
    } else {
        moneyManager.setMessage(response.success, 'Что-то пошло не так. Проверьте правильность заполнения полей ввода');
    }
}
favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, addUserCheck);
}


// Удаление пользователя из списка избранных
const removeUserCheck = (response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        moneyManager.setMessage(response.success, 'Операция выполнена успешно');
    } else {
        moneyManager.setMessage(response.success, 'Что-то пошло не так. Проверьте правильность заполнения полей ввода');
    }
}
favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, removeUserCheck);
}