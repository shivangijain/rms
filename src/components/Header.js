import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@material-ui/core';
import NestedMenuItem from "material-ui-nested-menu-item";
import { setLocationToUrl } from '../util';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props) {
  const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [menuPosition, setMenuPosition] = useState(null);
	const history = useHistory();

	const handleClick = (event) => {
		event.preventDefault();
    setMenuPosition({
      top: event.pageY,
      left: event.pageX
    });
    setAnchorEl(event.currentTarget);
  };

	const handleMenu = (location, branch) => {
		let path = branch ? `/${setLocationToUrl(location)}/${setLocationToUrl(branch)}` : `/${setLocationToUrl(location)}`;
		setAnchorEl(null);
    history.push(path.toLowerCase());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to='/' className={classes.title}>Rental Management System</Link>
          </Typography>
          <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            Location
					</Button>
					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
						>
							{props.locations && props.locations.map((location) => {
								return <NestedMenuItem
									label={location.name}
									key={location.dealers_id}
									parentMenuOpen={!!menuPosition}
									onClick={() => handleMenu(location.name)}
								>
									{location.branches && location.branches.map((branch) => {
										return <MenuItem key={branch.name} onClick={() => handleMenu(location.name, branch.name)}>{branch.name}</MenuItem>
									})}
								</NestedMenuItem>
							})}
					</Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
