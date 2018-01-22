import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ExpenseForm from '../components/ExpenseForm.jsx';
import GuestForm from '../components/GuestForm.jsx';
import TripForm from '../components/TripForm.jsx';
import DeleteBtn from '../components/DeleteBtn.jsx';



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
        trip: "",
        currentUser: ""
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
      }
    };

    //bind is used to set this.state to function
    this.iterateTrips = this.iterateTrips.bind(this);
    this.handleTripOpen = this.handleTripOpen.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDeleteTrip = this.handleDeleteTrip.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.processExpenseForm = this.processExpenseForm.bind(this);
    this.processGuestForm = this.processGuestForm.bind(this);
    this.processTripForm = this.processTripForm.bind(this);
    this.changeExpense = this.changeExpense.bind(this);
    this.changeGuest = this.changeGuest.bind(this);
    this.changeTrip = this.changeTrip.bind(this);

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
        console.log("userid?", this.state.userdbkey);
      }
    });
    xhr.send();
  }

  handleTripOpen() {
    this.setState({open: this.state.userdbkey});
  };

  handleOpen(tripid) {
    this.setState({ open: tripid });
  };

  handleClose() {
    this.setState({ open: false });
    console.log(this.context);
  };

  handleDeleteTrip(tripid, event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    console.log("tripid, item:", tripid)
    // create a string for an HTTP body message
    const currentTrip = encodeURIComponent(tripid);
    const formData = `currentTrip=${currentTrip}`;
    console.log("formData", formData);

    const xhr = new XMLHttpRequest();
    xhr.open('delete', '/api/delete', true);
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
  };

  handleDelete(tripid, array, index, event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    console.log("tripid, item:", tripid, array, index)
    // create a string for an HTTP body message
    const currentTrip = encodeURIComponent(tripid);
    // replace with item to find
    const currentArray = encodeURIComponent(array);
    const deleteIndex = encodeURIComponent(index);
    const formData = `currentTrip=${currentTrip}&currentArray=${currentArray}&deleteIndex=${deleteIndex}`;
    console.log("formData", formData);

    const xhr = new XMLHttpRequest();
    xhr.open('put', '/api/update', true);
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
  };

  //pass trip id as a parameter through bind, tripid is within the scope of this bind
  processTripForm(userid, event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    console.log("userid:", userid)
    // create a string for an HTTP body message
    const currentUser = encodeURIComponent(userid);
    const trip = encodeURIComponent(this.state.newTrip.trip);
    const formData = `currentUser=${currentUser}&trip=${trip}`;
    console.log("formData", formData);

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/trip', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.responseType = 'json';
    xhr.send(formData);
    //use .bind(this) with function to allow this.state
    xhr.onreadystatechange=function(){
       if (xhr.readyState==4 && xhr.status==200){
          // console.log('xhr.readyState=', xhr.readyState);
          // console.log('xhr.status=', xhr.status);
          // console.log('response=', xhr.response);this.setState({
          this.setState({
            newTrip: {
              expenses: [],
              guests: [],
              invoices: [],
              token: "",
              trip: "",
              currentUser: ""
            },
          })
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
          this.setState({
            newExpense: {
              currentTrip: "",
              title: "",
              cost: ""
            },
          })
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
  };

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
            this.setState({
              newGuest: {
                currentTrip: "",
                name: "",
                email: ""
              }
            })
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
    };

  // Change the trip object.
  // @param {object} event - the JavaScript event object
  changeTrip(event) {
    const field = event.target.name;
    const newTrip = this.state.newTrip;
    newTrip[field] = event.target.value;

    this.setState({
      newTrip
    });
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
    ];

  return(
    this.state.trips.map((trip, index) => (
      <Card className = "smallcontainer">
        <div key={trip._id}>
          <h1>{trip.trip}</h1>
          <DeleteBtn 
            onClick={this.handleDeleteTrip.bind(this, trip._id)} 
          />
          <h2>There are {trip.expenses.length} Expenses</h2>
          <h2>There are {trip.guests.length} Guests</h2>
          <div>
            <RaisedButton label={trip.trip} onClick={this.handleOpen.bind(this, trip._id)} primary/>
            <Dialog
              title={trip.trip}
              actions={actions}
              modal={true}
              open={this.state.open === trip._id}
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
                  <div className = "itemRow">
                    <h3>{expense.title}: {expense.cost}</h3>
                    <DeleteBtn 
                      onClick={this.handleDelete.bind(this, trip._id, "expenses", index)} 
                    />
                  </div>
                ))
              }
              <h2>Guests</h2>
              {
                trip.guests.map((guest, index) => (
                  <div className = "itemRow">
                    <h3>{guest.name}: {guest.email}</h3>
                    <DeleteBtn 
                      onClick={this.handleDelete.bind(this, trip._id, "guests", index)} 
                    />
                  </div>
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
    const actions = [
      <FlatButton
        label="Finished"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <Card className="container">
        <CardTitle
          title={this.state.username}
          subtitle="You should get access to this page only after authentication."
        />
        <div className="content">
              <strong>Name:</strong> {this.state.username}
              <strong>Email:</strong> {this.state.useremail}
              <strong>Trips:</strong> 
              <div>
                <RaisedButton label="Create New Trip" onClick={this.handleTripOpen.bind(this, this.state.userdbkey)} primary/>
                <Dialog
                  title=""
                  actions={actions}
                  modal={true}
                  open={this.state.open === this.state.userdbkey}
                >
                  <TripForm
                    onSubmit={this.processTripForm.bind(this, this.state.userdbkey)}
                    onChange={this.changeTrip}
                    errors={this.state.errors}
                    successMessage={this.state.successMessage}
                    newTrip={this.state.newTrip}
                  />
                </Dialog>
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