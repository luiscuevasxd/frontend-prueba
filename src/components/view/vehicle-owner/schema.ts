import * as z from 'zod';

export const formSchema = (handleLanguage: (path: string) => string) =>
  z.object({
    name: z
      .string()
      .min(2, { message: handleLanguage('VEHICLE_OWNER.VALIDATION_FIELDS.NAME_MIN_CHAR') }),
    lastname: z
      .string()
      .min(2, { message: handleLanguage('VEHICLE_OWNER.VALIDATION_FIELDS.LASTNAME_MIN_CHAR') }),
    age: z
      .number()
      .min(18, { message: handleLanguage('VEHICLE_OWNER.VALIDATION_FIELDS.AGE_MIN') })
      .max(120, { message: handleLanguage('VEHICLE_OWNER.VALIDATION_FIELDS.AGE_MAX') }),
  });
