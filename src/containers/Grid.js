import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import * as actions from '../actions/tenant';
import Grid from '../components/Grid';

class GridContainer extends Component {
  state = {
    scrollIntervalId: 0,
  };

  async componentDidMount() {
    const { fetchSubjectMedia, subjectId, tenantToken: accessToken } = this.props;

    fetchSubjectMedia({
      subjectId,
      accessToken,
      limit: 20,
    });

    this.startAutoscroll();
  }

  componentDidUpdate(prevProps) {
    if (this.props.hasMore !== prevProps.hasMore && !this.props.hasMore) {
      this.stopAutoscroll();
    }
  }

  startAutoscroll = () => {
    const autoscroll = () => {
      window.scrollBy({ top: window.innerHeight, left: 0, behavior: 'smooth' });
    };

    setTimeout(() => {
      const scrollIntervalId = setInterval(autoscroll, 1500);
      this.setState({ scrollIntervalId });
    }, 2000);
  };

  stopAutoscroll = () => {
    clearInterval(this.state.scrollIntervalId);
  };

  onScrollEnd = () => {
    const { fetchMoreMedia, tenantToken: accessToken, paging } = this.props;
    fetchMoreMedia({ accessToken, url: paging.next });
  };

  render() {
    const { media, hasMore } = this.props;

    return (
      <div>
        <Grid
          media={media}
          hasMore={hasMore}
          timestamp={new Date().toString()}
          onScrollEnd={debounce(this.onScrollEnd, 200)}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ user, tenant }) => ({
  tenantId: user.tenant.tenant_id,
  tenantToken: tenant.accessToken,
  subjectId: tenant.activeSubject.id,
  limit: tenant.activeSubject.limit,
  media: tenant.activeSubject.media,
  paging: tenant.activeSubject.paging,
  hasMore: tenant.activeSubject.hasMore,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchSubjectMedia: ({ subjectId, accessToken, limit }) =>
      dispatch(
        actions.fetchSubjectMedia({
          subjectId,
          accessToken,
          limit,
        }),
      ),
    fetchMoreMedia: ({ accessToken, url }) => dispatch(actions.fetchMoreMedia({ accessToken, url })),
  };
};

GridContainer.propTypes = {
  tenantId: PropTypes.string.isRequired,
  tenantToken: PropTypes.string.isRequired,
  media: PropTypes.array.isRequired,
  subjectId: PropTypes.string.isRequired,
  fetchSubjectMedia: PropTypes.func.isRequired,
  fetchMoreMedia: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
  paging: PropTypes.object.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GridContainer);
