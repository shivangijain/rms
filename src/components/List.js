import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';

const List = (props) => {
	const {lists, type } = props;
	if(lists && lists.length === 0) return <h1>No Categories present for this location</h1>
	return(
		<React.Fragment>
			{lists.map((item, index) => 
				item.image && <Grid item xs={6} sm={4} key={index}>
					<Card onClick={() => type === 'category' && props.handleCategory(item)} key={item.image}>
						<CardActionArea>
							<CardMedia
								component="img"
								alt="Contemplative Reptile"
								height="180"
								image={`/images/${type}/${item.image}`}
								title="Contemplative Reptile"
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="h2" style={{backgroundColor: 'blue', color: 'white'}}>
									{item.name}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			)}
		</React.Fragment>    
	)
}

export default List;