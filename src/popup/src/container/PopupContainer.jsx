import CollectionsList from '../components/CollectionsList';
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
      <main className="container-fluid popup">
        <header className="row">
          <div className="logo">MyPleasure</div>
        </header>
        {
          this.props.user.get('isLoggedIn') === true ?
          <CollectionsList collections={this.props.user.get('collections')} /> :
          <LoginForm
            loginClickHandler={this.loginClickHandler}
            loginFbClickHandler={this.loginFbClickHandler}
          />
        }
      </main>
    );
  }

  loginClickHandler({username, password}) {
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
