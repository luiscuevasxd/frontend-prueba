/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';
import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}graphql`,
});

const authLink = setContext((_: any, { headers }: any) => {
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const clientApollo = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

interface ApolloProviderProps {
  children: ReactNode;
}

export const ApolloProvider: React.FC<ApolloProviderProps> = ({ children }) => {
  return <BaseApolloProvider client={clientApollo}>{children}</BaseApolloProvider>;
};
