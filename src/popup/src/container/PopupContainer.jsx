import ImmutablePropTypes from 'react-immutable-proptypes';
import React, {Component, PropTypes} from 'react';
import LoginForm from '../components/LoginForm';
import {connect} from 'react-redux';

class PopupContainer extends Component {
  static propTypes = {
    user: ImmutablePropTypes.mapContains({
      username: PropTypes.string,
      isLoggedIn: PropTypes.bool.isRequired,
      token: PropTypes.string,
      collections: ImmutablePropTypes.map
    }).isRequired
  };

  render() {
    return (
      <div className="container-fluid">
        {this.props.user.get('isLoggedIn') === true ?
          'HELLO!' :
          <LoginForm />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('user')
  };
}

export default connect(mapStateToProps)(PopupContainer);
