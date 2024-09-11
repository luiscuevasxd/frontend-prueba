'use client';
import { DefaultTheme } from 'styled-components';
import { dark } from './darkTheme';
import { light } from './lightTheme';

const baseTheme = {
  fontSizes: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
  },
};

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  colors: light,
};

export const darkTheme: DefaultTheme = {
  ...baseTheme,
  colors: dark,
};
