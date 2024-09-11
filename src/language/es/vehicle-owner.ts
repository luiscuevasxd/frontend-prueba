export const vehicleOwner = {
  FIELDS: {
    NAME: 'Nombre',
    LASTNAME: 'Apellido',
    AGE: 'Edad',
  },
  VALIDATION_FIELDS: {
    NAME_MIN_CHAR: 'El nombre debe tener al menos 2 caracteres',
    LASTNAME_MIN_CHAR: 'El apellido debe tener al menos 2 caracteres',
    AGE_MIN: 'La edad debe ser mayor o igual a 18',
    AGE_MAX: 'La edad debe ser menor o igual a 120',
  },
  REGISTER: {
    SUCCESS: 'Se ha creado el propietario exitosamente',
  },
  DIALOG_VEHICLE_LIST: {
    BUTTON: 'Crear Propietario',
    TITLE: 'Crear Nuevo Propietario',
  },
};
