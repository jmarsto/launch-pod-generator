import React from 'react';
import { Link } from 'react-router';

const CohortTile = props => {
  return(
    <li>
      <Link to={`/cohorts/${props.id}`}>
        {props.name}
      </Link>
    </li>
  )
}

export default CohortTile;
