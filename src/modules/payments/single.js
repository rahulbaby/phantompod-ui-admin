import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4),
		minWidth: '80vw',
	},
}));

const Account = ({ row }) => {
	const classes = useStyles();
	if (!row) return null;
	return (
		<div className={classes.root}>
			<Grid container spacing={4}>
				<Grid item lg={3} md={6} xl={3} xs={12}>

				</Grid>
				<Grid item lg={9} md={6} xl={9} xs={12}>
				
				</Grid>
			</Grid>
		</div>
	);
};

export default Account;
