import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default (props) => {
  const { result } = props;
  if (!result) return null;
  const classes = useStyles();
  const { error, msg, msgArr } = result;
  //if( !msg ) return null
  let msgDefault = error ? 'Something went wrong!' : 'Success';
  let severity = error ? 'error' : 'success';
  return (
    <div className={classes.root}>
      <Alert severity={severity}>
        <AlertTitle>{msg || msgDefault}</AlertTitle>
        {msgArr !== undefined &&
          Object.keys(msgArr).map((x, i) => <div key={i}>{`${msgArr[x].message}`}</div>)}
      </Alert>
    </div>
  );
};
