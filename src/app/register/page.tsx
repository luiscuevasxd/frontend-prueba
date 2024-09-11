'use client';
import React from 'react';
import { Register } from '@components';
import { WithRouterProps, WithRouter } from '@utils';
import { NextPage } from 'next';

const RegisterPage: NextPage<WithRouterProps> = (props) => {
  return <Register {...props} />;
};

export default WithRouter(RegisterPage);
