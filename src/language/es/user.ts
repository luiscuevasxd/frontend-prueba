export const user = {
  ERROR_CODE: {
    USER_NOT_FOUND: 'Usuario no encontrado',
    USER_NAME_EXISTS: 'El usuario ya existe',
  },
  FIELDS: {
    USERNAME: 'Nombre de usuario',
    PASSWORD: 'Contraseña',
    REPEAT_PASSWORD: 'Confirmar contraseña',
  },
  VALIDATION_FIELDS: {
    USERNAME: 'El nombre de usuario es requerido',
    PASSWORD: 'La contraseña es requerida',
    USERNAME_MIN_CHAR: 'El nombre de usuario debe tener al menos 3 caracteres',
    INVALID_EMAIL: 'Dirección de correo electrónico no válida',
    PASSWORD_MIN_CHAR: 'La contraseña debe tener al menos 8 caracteres',
    PASSWORD_NECESSARY_CHAR:
      'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial (@$!%*?&.,#)',
    PASSWORD_REPEAT_MATCH: 'Las contraseñas no coinciden',
  },
  LOGIN: {
    TITLE: 'Inicio de sesión',
    SUCCESS: 'Ha iniciado sesión exitosamente',
  },
  REGISTER: {
    TITLE: 'Crear usuario',
    SUCCESS: 'Ha creado al usuario exitosamente',
  },
};
