import * as z from 'zod';

export const vehicleSchema = (handleLanguage: (path: string) => string) =>
  z.object({
    vehicleOwnerId: z
      .number()
      .min(1, handleLanguage('VEHICLE.VALIDATION_FIELDS.VEHICLE_OWNER_REQUIRED')),
    typeOperationVehicleId: z
      .number()
      .min(1, handleLanguage('VEHICLE.VALIDATION_FIELDS.TYPE_OPERATION_VEHICLE_REQUIRED')),
    brand: z.string().min(2, handleLanguage('VEHICLE.VALIDATION_FIELDS.BRAND_MIN_CHAR')),
    model: z.string().min(2, handleLanguage('VEHICLE.VALIDATION_FIELDS.MODEL_MIN_CHAR')),
    price: z.number().min(0, handleLanguage('VEHICLE.VALIDATION_FIELDS.PRICE_MIN')),
  });
