import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';


const Dashboard = (props) => (
  <Card className="container">
    <CardTitle
      title="Dashboard"
      subtitle="You should get access to this page only after authentication."
    />
    <div className="content">
      <ul>
        <li>
          <strong>Name:</strong> {props.secretData.name}
        </li>
        <li>
          <strong>Email:</strong> {props.secretData.email}
        </li>
        <li>
          <strong>Trips:</strong> {props.secretData.trip}
        </li>
      </ul>
    </div>


  </Card>
);

export default Dashboard;