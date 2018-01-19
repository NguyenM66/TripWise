import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ExpenseForm from '../components/ExpenseForm.jsx';
import GuestForm from '../components/GuestForm.jsx';


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
        currentTrip: "",
        title: "",
        cost: ""
      },
      newGuest: {
        currentTrip: "",
        name: "",
        email: ""
      },
    };

    //bind is used to set this.state to function
    this.iterateTrips = this.iterateTrips.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.processExpenseForm = this.processExpenseForm.bind(this);
    this.changeExpense = this.changeExpense.bind(this);


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

  handleOpen(tripid) {
    this.setState({ open: tripid });
  };

  handleClose() {
    this.setState({ open: false });
    console.log(this.context);
  };

  //**make procesExspenseForm, processGuestForm, processGuestForm
  //pass trip id as a parameter through bind, tripid is within the scope of this bind
  processExpenseForm(tripid,event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    console.log("tripid:", tripid)
    // create a string for an HTTP body message
    const currentTrip = encodeURIComponent(tripid);
    const title = encodeURIComponent(this.state.newExpense.title);
    const cost = encodeURIComponent(this.state.newExpense.cost);
    const formData = `currentTrip=${currentTrip}&title=${title}&cost=${cost}`;
    console.log("formData", formData);

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/expense', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.responseType = 'json';
    xhr.send(formData);
    //use .bind(this) with function to allow this.state
    xhr.onreadystatechange=function(){
       if (xhr.readyState==4 && xhr.status==200){
          // console.log('xhr.readyState=', xhr.readyState);
          // console.log('xhr.status=', xhr.status);
          // console.log('response=', xhr.response);
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
    }.bind(this)
  }

  //**make procesExspenseForm, processGuestForm, processGuestForm
  //pass trip id as a parameter through bind, tripid is within the scope of this bind
  processGuestForm(tripid,event) {
    // prevent default action. in this case, action is the form submission event
      event.preventDefault();

      console.log("tripid:", tripid)
      // create a string for an HTTP body message
      const currentTrip = encodeURIComponent(tripid);
      const name = encodeURIComponent(this.state.newGuest.name);
      const email = encodeURIComponent(this.state.newGuest.email);
      const formData = `currentTrip=${currentTrip}&name=${name}&email=${email}`;
      console.log("formData", formData);

      // create an AJAX request
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/api/guest', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhr.responseType = 'json';
      xhr.send(formData);
      //use .bind(this) with function to allow this.state
      xhr.onreadystatechange=function(){
         if (xhr.readyState==4 && xhr.status==200){
            // console.log('xhr.readyState=', xhr.readyState);
            // console.log('xhr.status=', xhr.status);
            // console.log('response=', xhr.response);
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
      }.bind(this)
    }

  // Change the expense object.
  // @param {object} event - the JavaScript event object
  changeExpense(event) {
    const field = event.target.name;
    const newExpense = this.state.newExpense;
    newExpense[field] = event.target.value;

    this.setState({
      newExpense
    });
  }

  // Change the guest object.
  // @param {object} event - the JavaScript event object
  changeGuest(event) {
    const field = event.target.name;
    const newGuest = this.state.newGuest;
    newGuest[field] = event.target.value;

    this.setState({
      newGuest
    });
  }


// iterate through trips and get trip data

iterateTrips() {
  console.log("iterating");
    const actions = [
      <FlatButton
        label="Finished"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={false}
        onClick={this.handleClose}
      />,
    ];

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
            <RaisedButton label={trip.trip} onClick={this.handleOpen.bind(this, trip._id)} primary/>
            <Dialog
              title="Dialog With Actions"
              actions={actions}
              modal={true}
              open={this.state.open == trip._id}
              autoScrollBodyContent={true}
            >
            <ExpenseForm
              onSubmit={this.processExpenseForm.bind(this,trip._id)}
              onChange={this.changeExpense}
              errors={this.state.errors}
              successMessage={this.state.successMessage}
              newExpense={this.state.newExpense}
            />
            <GuestForm
              onSubmit={this.processGuestForm.bind(this,trip._id)}
              onChange={this.changeGuest}
              errors={this.state.errors}
              successMessage={this.state.successMessage}
              newGuest={this.state.newGuest}
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