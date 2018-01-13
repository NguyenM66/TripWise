import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';


const Dashboard = (props) => (
  <Card className="container">
    <CardTitle
      title="Dashboard"
      subtitle="You should get access to this page only after authentication."
    />
    {props.secretData.map(user => (
      <code>
        {JSON.stringify(user)}
      </code>
    ))}

  </Card>
);

// Dashboard.propTypes = {
//   secretData: PropTypes.array.isRequired
// };

export default Dashboard;