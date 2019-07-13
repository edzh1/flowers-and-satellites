import React from 'react';
import styled from '@emotion/styled';
import { Provider } from 'react-redux';
import Router from '../router';
import store from '../store';

const StyledApp = styled.div`
  background-color: turquoise;
  padding: 10px;
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
