import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Input, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components';
import { WithRouterProps } from '@utils';
import { ILoginRequest, ILoginResponse } from '@api';
import axios, { AxiosResponse } from 'axios';
import { ErrorCommon } from '@types';
import { useLanguage, useNotification } from '@hooks';

export const Login = ({ onNavigate }: WithRouterProps): React.JSX.Element => {
  const { showNotificationWarning, showNotificationSuccess } = useNotification();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>();
  const handleLanguage = useLanguage();

  const onSubmit: SubmitHandler<ILoginRequest> = async (data) => {
    const response = await axios.post<ILoginRequest, AxiosResponse<ILoginResponse & ErrorCommon>>(
      '/api/auth/login',
      data
    );

    if (response.status !== 200) {
      return showNotificationWarning(
        response.data.errorCode
          ? `USER.ERROR_CODE.${response.data.errorCode}`
          : response.data.message
      );
    }

    showNotificationSuccess('USER.LOGIN.SUCCESS');
    localStorage.setItem('token', response.data.token);
    onNavigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{handleLanguage('USER.LOGIN.TITLE')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="username"
                  placeholder={handleLanguage('USER.FIELDS.USERNAME')}
                  {...register('username', {
                    required: handleLanguage('USER.VALIDATION_FIELDS.USERNAME'),
                  })}
                />
                {errors.username && (
                  <p className="text-destructive text-sm">{errors.username.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password"
                  type="password"
                  placeholder={handleLanguage('USER.FIELDS.PASSWORD')}
                  {...register('password', {
                    required: handleLanguage('USER.VALIDATION_FIELDS.PASSWORD'),
                  })}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">{errors.password.message}</p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => onNavigate('register')}>
            {handleLanguage('COMMON.BUTTON.REGISTER')}
          </Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            {handleLanguage('COMMON.BUTTON.LOGIN')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
