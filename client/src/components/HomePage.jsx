import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

const style ={
	color: '#4b5250',
	fontFamily: 'Permanent Marker',
	textShadow: '1px 1px rgb(191, 184, 184)',
	fontSize: '70px', 
	paddingTop: '20px'
}

const HomePage = () => (
  <Card className="container home">
  	<CardTitle
  		title='Welcome to TripWise!'
  		titleStyle={style}
  	/>
	<CardText>
	  	<h2 className="card-sub">Where you can easily keep track of trips you are planning. Manage your trip expenses, guests, the total cost of a trip and how much each guest owes. </h2>
	  	<img className="homeimg" src="../js/img/finalhome.png" alt="home"></img>
		<h3>Signup or Login to begin tracking your Trips. </h3>
		<Link className='bottomlink' to={'/signup'}><RaisedButton className='button' type="submit" label="Get Started Now!" secondary /></Link>


	</CardText>
  </Card>
);

export default HomePage;