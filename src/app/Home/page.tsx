'use client';
import React from 'react';
import { Vehicle } from '@components';
import { NextPage } from 'next';
import { WithRouterProps, WithRouter } from '@utils';

const HomePage: NextPage<WithRouterProps> = (props) => {
  return <Vehicle {...props} />;
};

export default WithRouter(HomePage);
