import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/tenant';
import Grid from '../components/Grid';

class GridContainer extends Component {
  async componentDidMount() {
    const { fetchSubjectMedia, subjectId, limit, tenantToken: accessToken } = this.props;

    fetchSubjectMedia({
      subjectId,
      accessToken,
      limit,
    });
  }

  render() {
    const { media } = this.props;

    return (
      <div>
        <Grid media={media} />
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GridContainer);
