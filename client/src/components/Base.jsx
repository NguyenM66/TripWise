import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';


const Base = ({ children }) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <FontAwesome
          className='super-crazy-colors'
          name='paper-plane'
          size='2x'
          style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
        />
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