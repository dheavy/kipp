import ImmutablePropTypes from 'react-immutable-proptypes';
import CollectionItem from './CollectionItem';
import React from 'react';

const CollectionsList = props => {
  return (
    <div className="row collections-list">
      {props.collections.map((c, i) => {
        return (
          <CollectionItem
            key={i}
            id={c.get('id') || -1}
            name={c.get('name')}
            thumbnail={c.get('thumbnail')}
          />
        )
      })}
    </div>
  );
};

CollectionsList.propTypes = {
  collections: ImmutablePropTypes.list.isRequired
};

export default CollectionsList;
