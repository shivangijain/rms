import React from 'react';
import { Breadcrumbs, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { setLocationToUrl } from '../util';

const BreadcrumbsLink = (props) => {
	const {location, branch, category, flag } = props.data;
	
	return(
		<div className="container">
			<Breadcrumbs aria-label="breadcrumb">
				{location && <Link to={`/${setLocationToUrl(location)}`}onClick={() => props.handleLinkClick()} >
					{location}
				</Link>}
				{branch && <Link to={`/${setLocationToUrl(location)}/${setLocationToUrl(branch)}`} onClick={() => props.handleLinkClick()} >
					{branch}
				</Link>}
				{flag && <Typography color="textPrimary">{category.name}</Typography>}
			</Breadcrumbs>
		</div>    
	)
}

export default BreadcrumbsLink;