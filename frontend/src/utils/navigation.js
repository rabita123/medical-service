import { useHistory, useParams, useLocation } from 'react-router-dom';
import React from 'react';

export const withRouter = (Component) => {
  return (props) => {
    const history = useHistory();
    const params = useParams();
    const location = useLocation();

    return (
      <Component
        {...props}
        history={history}
        params={params}
        location={location}
      />
    );
  };
}; 