import React, {PropTypes} from 'react';

const LoginForm = props => {
  return (
    <div className="row">
      <form>
        <fieldset className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <input type="text" className="form-control" id="username" placeholder="username" />
        </fieldset>
        <fieldset className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <input type="password" className="form-control" id="password" placeholder="password" />
        </fieldset>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            props.loginClickHandler({
              username: document.getElementById('username').value,
              password: document.getElementById('password').value
            })
          }}
          className="btn btn-primary mp-btn-login col-xs-12 col-sm-12 col-md-12 col-lg-12">
          Log in
        </button>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            props.loginFbClickHandler({
              username: document.getElementById('username').value,
              password: document.getElementById('password').value
            })
          }}
          className="btn btn-primary mp-btn-fb-login col-xs-12 col-sm-12 col-md-12 col-lg-12">
          Log in with FB
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
