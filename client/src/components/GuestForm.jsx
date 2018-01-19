import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const GuestForm = ({
  onSubmit,
  onChange,
  errors,
  newGuest,
}) => (
  <Card className="smallcontainer">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">New Guest</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Name"
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={newGuest.name}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={newGuest.email}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Create New Guest" primary />
      </div>
    </form>
  </Card>
);

GuestForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  errors: PropTypes.object,
  newGuest: PropTypes.object
};

export default GuestForm;