import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App2 from './components/app2.jsx';
import { BrowserRouter } from 'react-router-dom';

const httpLink = new HttpLink({
  uri: 'http://ec2-18-219-85-110.us-east-2.compute.amazonaws.com:4000/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App2 />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
