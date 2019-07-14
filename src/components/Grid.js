import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Cell = props => {
  return props.hasImage ? (
    <CellStyled {...props} />
  ) : (
    <CellWithoutPicture>
      <h3>Could not load image</h3>
    </CellWithoutPicture>
  );
};

const CellStyled = styled.div`
  flex: 1 0 25%;
  height: 250px;
  max-width: 25%;
  justify-content: center;
  display: flex;
  box-sizing: border-box;
  background-color: #ececec;
  border: 1px solid #9c9c9c;
  background-image: ${props => props.imageUrl};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const CellWithoutPicture = styled.div`
  flex: 1 0 25%;
  height: 250px;
  max-width: 25%;
  justify-content: center;
  display: flex;
  box-sizing: border-box;
  border: 1px solid #9c9c9c;
`;

function Grid(props) {
  return (
    <InfiniteScroll
      loadMore={props.onScrollEnd}
      hasMore={props.hasMore}
      threshold={2 * window.innerHeight}
      loader={<h4 key={props.timestamp}>Loading...</h4>}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
      }}
    >
      {props.media.map(url => (
        <Cell key={url} hasImage={!!url} imageUrl={`url(${url})`} />
      ))}
    </InfiniteScroll>
  );
}

Cell.propTypes = {
  hasImage: PropTypes.bool.isRequired,
};

Grid.propTypes = {
  media: PropTypes.array,
  onScrollEnd: PropTypes.func.isRequired,
  timestamp: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

export default Grid;
