import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import getImage from '../utils/get-image';

class Cell extends React.Component {
  state = {
    mediaUrl: {
      url: '',
      isLoading: true,
    },
  };
  async componentDidMount() {
    const mediaUrl = await getImage(this.props.mediaUrl);
    this.setState({ mediaUrl });
  }

  render() {
    return <CellStyled {...this.props} imageUrl={`url(${this.state.mediaUrl.url})`} />;
  }
}

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
      {props.media.map(mediaObj => (
        <Cell key={mediaObj.media.media_url} mediaUrl={mediaObj.media.media_url} />
      ))}
    </InfiniteScroll>
  );
}

Cell.propTypes = {
  mediaUrl: PropTypes.string.isRequired,
};

Grid.propTypes = {
  media: PropTypes.array,
  onScrollEnd: PropTypes.func.isRequired,
  timestamp: PropTypes.string.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

export default Grid;
