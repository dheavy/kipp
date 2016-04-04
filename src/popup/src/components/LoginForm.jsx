import React, {PropTypes} from 'react';

const LoginForm = props => {
  return (
    <div className="row">
      <form>
        <fieldset className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <input type="text" className="form-control" placeholder="username" />
        </fieldset>
        <fieldset className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <input type="password" className="form-control" placeholder="password" />
        </fieldset>

        <button type="submit" className="btn btn-primary mp-btn-login col-xs-12 col-sm-12 col-md-12 col-lg-12">
          Log in
        </button>
        <button type="submit" className="btn btn-primary mp-btn-fb-login col-xs-12 col-sm-12 col-md-12 col-lg-12">
          Log in with FB
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
