import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      errors:{},
      username: "",
      useremail: "",
      trips: [],
      userdbkey: ""
    };
    //bind is used to set this.state to function
    //this.iterateTrips = this.iterateTrips.bind(this);
  }

  /**
   * This method will be executed after initial rendering.
   */
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

processForm(event) {

}

changeUser(event) {

}

// iterate through trips and get trip data
// iterateTrips() {
//   console.log("iterating");
//   return(
//     this.state.trips.map((trip, index) => (
//       <Card className = "smallcontainer">
//         <li key={trip._id}>
//           <h1>{trip.trip}</h1>
//           <h2>Expenses</h2>
//           {
//             trip.expenses.map((expense, index) => (
//               <h3>{expense.title}: {expense.cost}</h3>
//             ))
//           }
//           <h2>Guests</h2>
//           {
//             trip.guests.map((guest, index) => (
//               <h3>{guest.name}: {guest.email}</h3>
//             ))
//           }
//         </li>
//       </Card>
//     ))
//   )
// }


  // render component
  render() {
    return (
      <Dashboard 
      onSubmit={this.processForm}
      onChange={this.changeUser}
      errors={this.state.errors}
      username={this.state.username}
      useremail={this.state.useremail}
      trips={this.state.trips}
      //iterate={this.iterateTrips}
      />

    );
  }

}

export default DashboardPage;