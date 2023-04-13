const ERROR_CODES = {
    // Firebase response codes
    EMAIL_NOT_FOUND: 'Пользователь с таким email не найден',
    INVALID_PASSWORD: 'Введен неверный пароль',
    USER_DISABLED: 'Данный пользователь заблокирован',
    // local codes
    unauthorised: 'Пожалуйста, войдите в учетную запись'
}

export function error(code){
    return ERROR_CODES[code] ? ERROR_CODES[code] : "Неизвестная ошибка" 
}