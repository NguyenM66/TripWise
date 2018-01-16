import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
    
    // If I want to use this on DashboardPage I need to figure out how to pass functions
    // return (
    //   <Dashboard 
    //   onSubmit={this.processForm}
    //   onChange={this.changeUser} 
    //   errors={this.state.errors}
    //   handleOpen={this.handleOpen}
    //   handleClose={this.handleClose}
    //   open={this.state.open}
    //   username={this.state.username}
    //   useremail={this.state.useremail}
    //   trips={this.state.trips}
    //   //iterate={this.iterateTrips}
    //   />

    // );

const Dashboard = ({
    onSubmit,
    onChange,
    errors,
    handleOpen,
    handleClose,
    open,
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
              <div className="button-line">
                <RaisedButton type="submit" label="Create New Trip" primary />
              </div>
              {trips.length ? (
                  trips.map((trip, index) => (
                    <Card className = "smallcontainer">
                      <div key={trip._id}>
                        <h1>{trip.trip}</h1>
                        <RaisedButton type="submit" label={trip.trip} primary />
                        <div>
                        <RaisedButton label={trip.trip} onClick={() => handleOpen} />
                        <Dialog
                          title="Dialog With Actions"
                          actions={actions}
                          modal={false}
                          open={open}
                          onRequestClose={() => handleClose}
                        >
                          The actions in this window were passed in as an array of React objects.
                        </Dialog>
                      </div>
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
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  useremail: PropTypes.string.isRequired,
  trips: PropTypes.array.isRequired,
  //iterate: PropTypes.func.isRequired
};

export default Dashboard;