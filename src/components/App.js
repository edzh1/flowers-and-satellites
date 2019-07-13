import React from 'react';
import styled from '@emotion/styled';
import Router from '../router';

const StyledApp = styled.div`
  background-color: turquoise;
  padding: 10px;
`;

function App() {
  return (
    <StyledApp>
      <Router />
    </StyledApp>
  );
}

export default App;
