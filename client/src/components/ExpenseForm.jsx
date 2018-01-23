import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const ExpenseForm = ({
  onSubmit,
  onChange,
  errors,
  newExpense,
}) => (
  <Card className="xsmallcontainer">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">New Expense</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Title"
          name="title"
          errorText={errors.title}
          onChange={onChange}
          value={newExpense.title}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Cost"
          name="cost"
          errorText={errors.cost}
          onChange={onChange}
          value={newExpense.cost}
        />
      </div>

      <div className="button-line">
        <RaisedButton className='button' type="submit" label="Create New Expense" secondary />
      </div>
    </form>
  </Card>
);

ExpenseForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  errors: PropTypes.object,
  newExpense: PropTypes.object
};

export default ExpenseForm;