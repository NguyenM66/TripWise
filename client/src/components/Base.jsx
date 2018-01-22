import React, { PropTypes } from 'react';
import FaPaperPlane from 'react-icons/lib/fa/paper-plane';
import FontAwesome from 'react-fontawesome';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';


const Base = ({ children }) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <FaPaperPlane />
        <FontAwesome name='rocket' />
        <i className="material-icons md-light">face</i>
        <IndexLink className="logo" to="/">TripWise</IndexLink>
      </div>

    { /* condition statement for deciding which menu should be shown */ }
      {Auth.isUserAuthenticated() ? (
        <div className="top-bar-right">
          <Link to="/logout">Log out</Link>
        </div>
      ) : (
        <div className="top-bar-right">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      )}

    </div>

    { /* child component will be rendered here */ }
    {children}

  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;