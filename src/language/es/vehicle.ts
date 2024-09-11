export const vehicle = {
  FIELDS: {
    VEHICLE_OWNER: 'Propietario',
    TYPE_OPERATION_VEHICLE: 'Tipo de operación del vehículo',
    BRAND: 'Marca',
    MODEL: 'Modelo',
    PRICE: 'Precio',
  },
  VALIDATION_FIELDS: {
    VEHICLE_OWNER_REQUIRED: 'El propietario es requerido',
    TYPE_OPERATION_VEHICLE_REQUIRED: 'El tipo de operación del vehículo es requerido',
    BRAND_MIN_CHAR: 'La marca debe tener al menos 2 caracteres',
    MODEL_MIN_CHAR: 'El apellido debe tener al menos 2 caracteres',
    PRICE_MIN: 'El precio debe ser mayor o igual a 0',
  },
  REGISTER: {
    SUCCESS: 'Se ha creado el vehículo exitosamente',
  },
  UPDATE: {
    SUCCESS: 'Se ha actualizado el vehículo exitosamente',
  },
  DIALOG_VEHICLE_LIST: {
    BUTTON: 'Crear vehículo',
    TITLE: 'Crear nuevo vehículo',
  },
};
