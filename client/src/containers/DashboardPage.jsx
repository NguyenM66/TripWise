import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ExpenseForm from '../components/ExpenseForm.jsx';


class DashboardPage extends React.Component {

  //class contructor
  constructor(props) {
    super(props);

    this.state = {
      errors:{},
      username: "",
      useremail: "",
      trips: [],
      userdbkey: "",
      open: false,
      newTrip: {
        expenses: [],
        guests: [],
        invoices: [],
        token: "",
        trip: ""
      },
      newExpense: {
        title: "",
        cost: ""
      },
      newGuest: {
        name: "",
        email: ""
      },
      //**remove user for test with form only
      user: {
        email: '',
        password: ''
      }
    };

    //bind is used to set this.state to function
    this.iterateTrips = this.iterateTrips.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.processForm = this.processForm.bind(this);

  }

  // this method will be executed after initial rendering.
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      console.log("response: ", xhr.response);

      if (xhr.status === 200) {
        this.setState({
          username: xhr.response.name,
          useremail: xhr.response.email,
          trips: xhr.response.trips,
          userdbkey: xhr.response._id
        });
        console.log("state: ", this.state);
      }
    });
    xhr.send();
  }

//**make procesExspenseForm, processGuestForm, processGuestForm
processForm(event) {
  // prevent default action. in this case, action is the form submission event
  event.preventDefault();

  // create a string for an HTTP body message
  const email = encodeURIComponent(this.state.user.email);
  const password = encodeURIComponent(this.state.user.password);
  const formData = `email=${email}&password=${password}`;

  // create an AJAX request
  const xhr = new XMLHttpRequest();
  xhr.open('post', '/auth/login');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      // success

      // change the component-container state
      this.setState({
        errors: {}
      });

      // save the token
      Auth.authenticateUser(xhr.response.token);


      // change the current URL to /
      this.context.router.replace('/');
    } else {
      // failure

      // change the component state
      const errors = xhr.response.errors ? xhr.response.errors : {};
      errors.summary = xhr.response.message;

      this.setState({
        errors
      });
    }
  });
  xhr.send(formData);
}

handleOpen() {
  this.setState({ open: true });
};

handleClose() {
  this.setState({ open: false });
  console.log(this.context);
};

// iterate through trips and get trip data
iterateTrips() {
  console.log("iterating");
  const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

  //**update ExpenseForm used to test pupulating to dialog
  return(
    this.state.trips.map((trip, index) => (
      <Card className = "smallcontainer">
        <div key={trip._id}>
          <h1>{trip.trip}</h1>
          <h2>Expenses</h2>
          {
            trip.expenses.map((expense, index) => (
              <h3>{expense.title}: {expense.cost}</h3>
            ))
          }
          <h2>Guests</h2>
          {
            trip.guests.map((guest, index) => (
              <h3>{guest.name}: {guest.email}</h3>
            ))
          }
          <div>
            <RaisedButton label={trip.trip} onClick={this.handleOpen} primary/>
            <Dialog
              title="Dialog With Actions"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
            <ExpenseForm
              onSubmit={this.processForm}
              onChange={this.changeUser}
              errors={this.state.errors}
              successMessage={this.state.successMessage}
              user={this.state.user}
            />
              <h2>Expenses</h2>
              {
                trip.expenses.map((expense, index) => (
                  <h3>{expense.title}: {expense.cost}</h3>
                ))
              }
              <h2>Guests</h2>
              {
                trip.guests.map((guest, index) => (
                  <h3>{guest.name}: {guest.email}</h3>
                ))
              }
            </Dialog>
          </div>
        </div>
      </Card>
    ))
  )
}


  // render component
  render() {
    return (
      <Card className="container">
        <CardTitle
          title="Hello"
          subtitle="You should get access to this page only after authentication."
        />
        <div className="content">
              <strong>Name:</strong> {this.state.username}
              <strong>Email:</strong> {this.state.useremail}
              <strong>Trips:</strong> 
              <div className="button-line">
                <RaisedButton type="submit" label="Create New Trip" primary />
              </div>
             {this.state.trips.length ? (
                <div>
                  {this.iterateTrips()}
                </div>
              ) : (
                <h3>No Results to Display</h3>
              )}
        </div>
      </Card>
    )
  }

}

export default DashboardPage;