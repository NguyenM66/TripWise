import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

const HomePage = () => (
  <Card className="container home">
	<CardText>
		<h1 className="card-heading welcome">Welcome to TripWise!</h1>
	  	<h2 className="card-sub">Where you can easily keep track of the expenses and the guests you have on trips you are planning. </h2>
	  	<img className="homeimg" src="/images/userHome.png" alt="home"></img>
		<h3>Signup or Login to begin tracking your Trips. </h3>
		<Link className='bottomlink' to={'/signup'}><RaisedButton className='button' type="submit" label="Get Started Now!" secondary /></Link>
	</CardText>
  </Card>
);

export default HomePage;