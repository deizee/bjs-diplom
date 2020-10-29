"use strict";

const userForm = new UserForm();

// ============= Вход =============
const loginCheck = (response) => {
    if (response.success) {
        location.reload();
    } else {
        userForm.setLoginErrorMessage(response.error)};
    } 
userForm.loginFormCallback = data => {
    ApiConnector.login(data, loginCheck);
};

// ========== Регистрация ==========
const registerCheck = (response) => {
    if (response.success) {
        location.reload();
    } else {
        userForm.setRegisterErrorMessage(response.error)};
    } 
userForm.registerFormCallback = data => {
    ApiConnector.register(data, registerCheck);
};