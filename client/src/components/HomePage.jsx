import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';


const HomePage = () => (
  <Card className="container home">
	<CardText>
		<h2 className="card-heading">Welcome to TripWise!</h2>
	  	<h3 className="card-sub">Where you to easily keep track of the expenses and the guests you have on trips you are planning. </h3>
		<h3>Signup or Login to begin tracking your Trips. </h3>
	</CardText>
  </Card>
);

export default HomePage;