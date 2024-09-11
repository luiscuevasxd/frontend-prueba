import { z } from 'zod';

export const registerSchema = (handleLanguage: (path: string) => string) =>
  z
    .object({
      username: z.string().min(3, handleLanguage('USER.VALIDATION_FIELDS.USERNAME_MIN_CHAR')),
      email: z.string().email(handleLanguage('USER.VALIDATION_FIELDS.INVALID_EMAIL')),
      password: z
        .string()
        .min(8, handleLanguage('USER.VALIDATION_FIELDS.PASSWORD_MIN_CHAR'))
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,#])[A-Za-z\d@$!%*?&.,#]{8,}$/,
          handleLanguage('USER.VALIDATION_FIELDS.PASSWORD_NECESSARY_CHAR')
        ),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: handleLanguage('USER.VALIDATION_FIELDS.PASSWORD_REPEAT_MATCH'),
      path: ['confirmPassword'],
    });
