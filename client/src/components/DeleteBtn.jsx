import React from "react";
import FontAwesome from 'react-fontawesome';

const DeleteBtn = props => (
	<FontAwesome
		className='delete-btn'
		name='trash'
		size='1x'
	{...props}/>
);

export default DeleteBtn;


