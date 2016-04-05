import ImmutablePropTypes from 'react-immutable-proptypes';
import CollectionsList from './CollectionsList';
import React, {PropTypes} from 'react';

const Options = props => {

};

const Header = props => {
  return (
    <Options user={props.user} />
  );
};

const Button = props => {

};

const AuthUserPanel = props => {
  return (
    <Header user={props.user} />
    <CollectionsList collections={props.collections} />
    <Button />
  );
};

Header.propTypes = {
  user: ImmutablePropTypes.mapContains({
    username: PropTypes.string
  });
};

Options.propTypes = {

};

AuthUserPanel.propTypes = {
  user: ImmutablePropTypes.mapContains({
    username: PropTypes.string,
    collections: ImmutablePropTypes.list()
  });
};

export default AuthUserPanel;
