import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import './App.css';
import Routes from './component/Admin/Routes'



const client = new ApolloClient({
  uri: 'http://localhost:4000/graphQL'
})


function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
}

export default App;
