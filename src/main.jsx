import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './css/extraCSS.css'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5050/graphql',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root'))
.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
// createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
// )
