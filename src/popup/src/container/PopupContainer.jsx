import ImmutablePropTypes from 'react-immutable-proptypes';
import React, {Component, PropTypes} from 'react';
import LoginForm from '../components/LoginForm';
import {login, loginFb} from '../thunk';
import {connect} from 'react-redux';

class PopupContainer extends Component {
  static propTypes = {
    user: ImmutablePropTypes.mapContains({
      username: PropTypes.string,
      isLoggedIn: PropTypes.bool.isRequired,
      token: PropTypes.string,
      collections: ImmutablePropTypes.list
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.loginClickHandler = this.loginClickHandler.bind(this);
    this.loginFbClickHandler = this.loginFbClickHandler.bind(this);
  }

  render() {
    return (
      <div className="container-fluid">
        {
          this.props.user.get('isLoggedIn') === true ?
          'HELLO!' :
          <LoginForm
            loginClickHandler={this.loginClickHandler}
            loginFbClickHandler={this.loginFbClickHandler}
          />
        }
      </div>
    );
  }

  loginClickHandler({username, password}) {
    console.log('click handler')
    this.props.dispatch(login({username, password}))
  }

  loginFbClickHandler({username, password}) {
    console.log('click fb handler')
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('user')
  };
}

export default connect(mapStateToProps)(PopupContainer);
