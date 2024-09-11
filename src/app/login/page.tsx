'use client';
import React from 'react';
import { Login } from '@components';
import { NextPage } from 'next';
import { WithRouterProps, WithRouter } from '@utils';

const LoginPage: NextPage<WithRouterProps> = (props) => {
  return <Login {...props} />;
};

export default WithRouter(LoginPage);
