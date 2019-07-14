import React from 'react';
import styled from '@emotion/styled';
import { Provider } from 'react-redux';
import Router from './Router';
import store from '../store';

const StyledApp = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

function App() {
  return (
    <StyledApp>
      <Provider store={store}>
        <Router />
      </Provider>
    </StyledApp>
  );
}

export default App;
