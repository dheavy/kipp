import React, {PropTypes} from 'react';

const CollectionItem = props => {
  return (
    <div className="row">
      <span className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
        <img
          src={props.thumbnail || ''}
          width="40"
          height="30"
          className="img-rounded"
        />
      </span>
      <span
        className="col-xs-offset-2 col-sm-offset-2 col-mf-offset-2
                   col-lg-offset-2 col-xs-8 col-sm-8 col-md-8 col-lg-8">
        {props.name}
      </span>
    </div>
  );
};

CollectionItem.PropTypes = {
  id: PropTypes.number,
  thumbnail: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default CollectionItem;
