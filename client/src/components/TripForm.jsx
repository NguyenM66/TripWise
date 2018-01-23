import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const TripForm = ({
  onSubmit,
  onChange,
  errors,
  newTrip,
}) => (
  <Card className="xsmallcontainer">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">New Trip</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Trip Name"
          name="trip"
          errorText={errors.trip}
          onChange={onChange}
          value={newTrip.trip}
        />
      </div>

      <div className="button-line">
        <RaisedButton className='button' type="submit" label="Create New Trip" secondary />
      </div>
    </form>
  </Card>
);

TripForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  errors: PropTypes.object,
  newTrip: PropTypes.object
};

export default TripForm;