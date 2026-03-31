// Синхронные валидаторы для формы
export const validateName = (value: string) => {
  if (!value || value.trim() === '') {
    return 'Имя обязательно';
  }
  if (value.length < 2) {
    return 'Имя должно содержать минимум 2 символа';
  }
  if (value.length > 50) {
    return 'Имя должно содержать максимум 50 символов';
  }
  // Разрешаем русские и латинские буквы, пробелы и дефис
  if (!/^[a-zA-Zа-яА-Я\s-]+$/.test(value)) {
    return 'Имя может содержать только буквы, пробелы и дефис';
  }
  return true;
};

export const validateLogin = (value: string) => {
  if (!value || value.trim() === '') {
    return 'Логин обязателен';
  }
  if (value.length < 3) {
    return 'Логин должен содержать минимум 3 символа';
  }
  if (value.length > 20) {
    return 'Логин должен содержать максимум 20 символов';
  }
  // Разрешаем буквы (любые), цифры, подчеркивание и точку
  if (!/^[a-zA-Zа-яА-Я0-9_.]+$/.test(value)) {
    return 'Логин может содержать только буквы, цифры, точки и подчеркивание';
  }
  return true;
};

export const validatePassword = (value: string) => {
  if (!value) {
    return 'Пароль обязателен';
  }
  if (value.length < 3) {
    return 'Пароль должен содержать минимум 3 символа';
  }
  if (value.length > 50) {
    return 'Пароль должен содержать максимум 50 символов';
  }
  return true;
};