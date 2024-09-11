import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components';
import { registerSchema } from './schema';
import { WithRouterProps } from '@utils';
import { IRegisterRequest, IRegisterResponse } from '@api';
import axios, { AxiosResponse } from 'axios';
import { ErrorCommon } from '@types';
import { useLanguage, useNotification } from '@hooks';

export const Register = ({ onNavigate }: WithRouterProps) => {
  const { showNotificationWarning, showNotificationSuccess } = useNotification();
  const handleLanguage = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterRequest>({
    resolver: zodResolver(registerSchema(handleLanguage)),
  });

  const onSubmit: SubmitHandler<IRegisterRequest> = async (data) => {
    const response = await axios.post<
      IRegisterRequest,
      AxiosResponse<IRegisterResponse & ErrorCommon>
    >('/api/auth/register', data);

    if (response.status !== 200 || (response.data.statusCode ?? 0) >= 400) {
      return showNotificationWarning(
        response.data.errorCode
          ? `USER.ERROR_CODE.${response.data.errorCode}`
          : response.data.message
      );
    }

    showNotificationSuccess('USER.REGISTER.SUCCESS');
    localStorage.setItem('token', response.data.token);
    onNavigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>{handleLanguage('USER.REGISTER.TITLE')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="username"
                  placeholder={handleLanguage('USER.FIELDS.USERNAME')}
                  {...register('username')}
                />
                {errors.username && (
                  <p className="text-destructive text-sm">{errors.username.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="email" type="email" placeholder="Email" {...register('email')} />
                {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password"
                  type="password"
                  placeholder={handleLanguage('USER.FIELDS.PASSWORD')}
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">{errors.password.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder={handleLanguage('USER.FIELDS.REPEAT_PASSWORD')}
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
            <CardFooter className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={() => onNavigate('/login')}>
                {handleLanguage('COMMON.BUTTON.LOGIN')}
              </Button>
              <Button type="submit">{handleLanguage('COMMON.BUTTON.REGISTER')}</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
