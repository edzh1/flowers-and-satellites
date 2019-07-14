import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/tenant';
import Grid from '../components/Grid';

class GridContainer extends Component {
  async componentDidMount() {
    // fetchSubjectMedia;
  }

  render() {
    const { media } = this.props;

    return (
      <div>
        <Grid data={media} />
      </div>
    );
  }
}

const mapStateToProps = ({ user, tenant }) => ({
  tenantId: user.tenant.tenant_id,
  genericToken: user.genericToken,
  media: tenant.activeSubject.media,
});

const mapDispatchToProps = dispatch => {
  return {
    authTenant: (tenantId, genericToken) => dispatch(actions.auth(tenantId, genericToken)),
  };
};

GridContainer.propTypes = {
  authTenant: PropTypes.func.isRequired,
  tenantId: PropTypes.string.isRequired,
  genericToken: PropTypes.string.isRequired,
  media: PropTypes.array.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GridContainer);
