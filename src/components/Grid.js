import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const StyledGrid = styled.div`
  background-color: red;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

const Cell = styled.div`
  flex: 1 0 25%;
  max-width: 25%;
  justify-content: center;
  display: flex;
  padding: 5px;
  box-sizing: border-box;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 250px;
`;

function Grid(props) {
  return (
    <StyledGrid>
      {props.media.map(url => (
        <Cell key={url}>
          <Image src={url} />
        </Cell>
      ))}
    </StyledGrid>
  );
}
Grid.propTypes = {
  media: PropTypes.array,
};

export default Grid;
