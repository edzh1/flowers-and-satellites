import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/tenant';
import Grid from '../components/Grid';

class GridContainer extends Component {
  componentDidMount() {
    const { tenantId, genericToken } = this.props;

    this.props.authTenant(tenantId, genericToken);
  }

  render() {
    return (
      <div>
        <Grid />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  tenantId: user.tenant.tenant_id,
  genericToken: user.genericToken,
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GridContainer);
