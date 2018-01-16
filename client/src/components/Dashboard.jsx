import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';


const Dashboard = ({
    onSubmit,
    onChange,
    errors,
    username,
    useremail,
    trips,
    //iterate,
}) => (
  <Card className="container">
        <CardTitle
          title="Hello"
          subtitle="You should get access to this page only after authentication."
        />
        <div className="content">
              <strong>Name:</strong> {username}
              <strong>Email:</strong> {useremail}
              <strong>Trips:</strong> 
              {trips.length ? (
                  trips.map((trip, index) => (
                    <Card className = "smallcontainer">
                      <div key={trip._id}>
                        <h1>{trip.trip}</h1>
                        <h2>Expenses</h2>
                        {
                          trip.expenses.map((expense, index) => (
                            <div><h3 >{expense.title}: {expense.cost}</h3></div>
                          ))
                        }
                        <h2>Guests</h2>
                        {
                          trip.guests.map((guest, index) => (
                            <div><h3 >{guest.name}: {guest.email}</h3></div>
                          ))
                        }
                      </div>
                    </Card>
                  ))
              ):(
                <h3>No Results to Display</h3>
              )}
        </div>
      </Card>
);

Dashboard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  useremail: PropTypes.string.isRequired,
  trips: PropTypes.array.isRequired,
  //iterate: PropTypes.func.isRequired
};

export default Dashboard;